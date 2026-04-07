#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const SUPPORTED_TYPES = new Set([
  'screen',
  'component',
  'hook',
  'service',
  'utility',
  'type',
  'electron-main',
  'electron-preload'
]);

const RUNTIME_ALIASES = {
  auto: 'auto',
  web: 'web',
  renderer: 'desktop-renderer',
  'desktop-renderer': 'desktop-renderer',
  mobile: 'mobile',
  rn: 'mobile',
  shared: 'shared',
  desktop: 'desktop-renderer',
  'desktop-main': 'desktop-main',
  main: 'desktop-main',
  'desktop-preload': 'desktop-preload',
  preload: 'desktop-preload'
};

function parseArgs(argv) {
  const out = {};
  for (const arg of argv) {
    if (!arg.startsWith('--')) continue;
    const [k, v = 'true'] = arg.slice(2).split('=');
    out[k] = v;
  }
  return out;
}

function pascalToKebab(input) {
  return input
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .toLowerCase();
}

function normalizeRuntime(input) {
  const key = String(input || 'auto').toLowerCase();
  return RUNTIME_ALIASES[key] || key;
}

function detectTypeScript(root, override) {
  if (override === 'true') return true;
  if (override === 'false') return false;
  return fs.existsSync(path.join(root, 'tsconfig.json'));
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
  return JSON.parse(raw);
}

function parseFields(raw) {
  if (!raw) return [];
  return raw
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean)
    .map((pair) => {
      const [name, type = 'string'] = pair.split(':');
      return { name: name.trim(), type: type.trim() || 'string' };
    });
}

function domScreenTemplate(name) {
  return `import React from 'react';

export default function ${name}Screen() {
  return <div>${name} Screen</div>;
}
`;
}

function rnScreenTemplate(name) {
  return `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ${name}Screen() {
  return (
    <View style={styles.container}>
      <Text>${name} Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
`;
}

function domComponentTemplate(name, isTs) {
  if (isTs) {
    return `import React from 'react';

type ${name}Props = {
  label?: string;
};

const ${name}: React.FC<${name}Props> = ({ label = '${name}' }) => {
  return <div>{label}</div>;
};

export default ${name};
`;
  }

  return `import React from 'react';

const ${name} = ({ label = '${name}' }) => {
  return <div>{label}</div>;
};

export default ${name};
`;
}

function rnComponentTemplate(name, isTs) {
  if (isTs) {
    return `import React from 'react';
import { View, Text } from 'react-native';

type ${name}Props = {
  label?: string;
};

const ${name}: React.FC<${name}Props> = ({ label = '${name}' }) => {
  return (
    <View>
      <Text>{label}</Text>
    </View>
  );
};

export default ${name};
`;
  }

  return `import React from 'react';
import { View, Text } from 'react-native';

const ${name} = ({ label = '${name}' }) => {
  return (
    <View>
      <Text>{label}</Text>
    </View>
  );
};

export default ${name};
`;
}

function electronMainTemplate(isTs) {
  if (isTs) {
    return `import { app, BrowserWindow } from 'electron';
import path from 'node:path';

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
    },
  });

  const rendererUrl = process.env.ELECTRON_RENDERER_URL;
  if (rendererUrl) {
    mainWindow.loadURL(rendererUrl);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }
}

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
`;
  }

  return `const { app, BrowserWindow } = require('electron');
const path = require('node:path');

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
    },
  });

  const rendererUrl = process.env.ELECTRON_RENDERER_URL;
  if (rendererUrl) {
    mainWindow.loadURL(rendererUrl);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }
}

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
`;
}

function electronPreloadTemplate(isTs) {
  if (isTs) {
    return `import { contextBridge, ipcRenderer } from 'electron';

const desktopApi = {
  send(channel: string, payload?: unknown) {
    ipcRenderer.send(channel, payload);
  },
  on(channel: string, listener: (payload: unknown) => void) {
    const wrapped = (_event: unknown, payload: unknown) => listener(payload);
    ipcRenderer.on(channel, wrapped as never);
    return () => ipcRenderer.removeListener(channel, wrapped as never);
  },
};

contextBridge.exposeInMainWorld('desktopApi', desktopApi);
`;
  }

  return `const { contextBridge, ipcRenderer } = require('electron');

const desktopApi = {
  send(channel, payload) {
    ipcRenderer.send(channel, payload);
  },
  on(channel, listener) {
    const wrapped = (_event, payload) => listener(payload);
    ipcRenderer.on(channel, wrapped);
    return () => ipcRenderer.removeListener(channel, wrapped);
  },
};

contextBridge.exposeInMainWorld('desktopApi', desktopApi);
`;
}

function template(kind, name, fields, isTs, runtime) {
  if (kind === 'screen') {
    return runtime === 'mobile' ? rnScreenTemplate(name) : domScreenTemplate(name);
  }

  if (kind === 'component') {
    return runtime === 'mobile' ? rnComponentTemplate(name, isTs) : domComponentTemplate(name, isTs);
  }

  if (kind === 'hook') {
    const hookName = name.startsWith('Use') ? name : `Use${name}`;
    return `import { useMemo } from 'react';

export function use${hookName.replace(/^Use/, '')}() {
  return useMemo(() => ({ ready: true }), []);
}
`;
  }

  if (kind === 'service') {
    return `export async function ${name.charAt(0).toLowerCase() + name.slice(1)}Service() {
  return { ok: true };
}
`;
  }

  if (kind === 'utility') {
    return `export function ${name.charAt(0).toLowerCase() + name.slice(1)}() {
  return true;
}
`;
  }

  if (kind === 'type') {
    if (isTs) {
      const body = fields.length
        ? fields.map((f) => `  ${f.name}: ${f.type};`).join('\n')
        : '  id: string;';
      return `export interface ${name} {\n${body}\n}\n`;
    }
    return `/** @typedef {Object} ${name} */\n`;
  }

  if (kind === 'electron-main') {
    return electronMainTemplate(isTs);
  }

  if (kind === 'electron-preload') {
    return electronPreloadTemplate(isTs);
  }

  throw new Error(`Unsupported type: ${kind}`);
}

function normalizeCandidate(candidate) {
  if (typeof candidate === 'string') {
    return { path: candidate, runtime: 'shared' };
  }
  return {
    path: candidate.path,
    runtime: normalizeRuntime(candidate.runtime || 'shared')
  };
}

function pickTarget(root, preset, kind, runtime, explicitDir) {
  if (explicitDir) {
    return { path: explicitDir, runtime: runtime === 'auto' ? 'shared' : runtime };
  }

  const candidatesRaw = preset.targetCandidates?.[kind];
  if (!Array.isArray(candidatesRaw) || candidatesRaw.length === 0) {
    throw new Error(`Missing targetCandidates for type: ${kind}`);
  }

  const candidates = candidatesRaw.map(normalizeCandidate);
  const filtered = runtime === 'auto'
    ? candidates
    : candidates.filter((c) => c.runtime === runtime);

  if (filtered.length === 0) {
    throw new Error(`No targetCandidates for type '${kind}' and runtime '${runtime}'.`);
  }

  for (const candidate of filtered) {
    if (fs.existsSync(path.join(root, candidate.path))) {
      return candidate;
    }
  }

  return filtered[0];
}

function validateRuntime(kind, runtime) {
  const invalidForScreenComponent = new Set(['shared', 'desktop-main', 'desktop-preload']);

  if ((kind === 'screen' || kind === 'component') && invalidForScreenComponent.has(runtime)) {
    throw new Error(`Type '${kind}' cannot use runtime '${runtime}'. Use web, desktop-renderer, or mobile.`);
  }

  if (kind === 'electron-main' && runtime !== 'desktop-main') {
    throw new Error(`Type 'electron-main' requires runtime 'desktop-main'.`);
  }

  if (kind === 'electron-preload' && runtime !== 'desktop-preload') {
    throw new Error(`Type 'electron-preload' requires runtime 'desktop-preload'.`);
  }
}

function ensureExplicitUiRuntime(kind, runtimeArg) {
  if (kind !== 'screen' && kind !== 'component') return;
  if (!runtimeArg) {
    throw new Error(`Type '${kind}' requires an explicit --runtime=<web|desktop-renderer|mobile> to avoid cross-platform misplacement.`);
  }
  if (normalizeRuntime(runtimeArg) === 'auto') {
    throw new Error(`Type '${kind}' does not allow --runtime=auto. Use --runtime=<web|desktop-renderer|mobile>.`);
  }
}

function main() {
  const root = process.cwd();
  const args = parseArgs(process.argv.slice(2));
  const kind = args.type;
  const rawName = args.name;

  if (!kind || !rawName) {
    console.error('[ERROR] Usage: node scaffold.mjs --type=<screen|component|hook|service|utility|type|electron-main|electron-preload> --name=<Name> [--runtime=auto|web|desktop-renderer|mobile|shared|desktop-main|desktop-preload] [--fields=a:string,b:number] [--preset=path] [--typescript=auto|true|false] [--dir=relative/path] [--dry-run=true] [--force=true]');
    process.exit(1);
  }

  if (!SUPPORTED_TYPES.has(kind)) {
    console.error(`[ERROR] Unsupported type: ${kind}`);
    process.exit(1);
  }

  try {
    ensureExplicitUiRuntime(kind, args.runtime);
  } catch (error) {
    console.error(`[ERROR] ${error.message}`);
    process.exit(1);
  }

  const presetPath = path.resolve(root, args.preset || '.agents/skills/scaffold-code/scripts/presets/hybrid-react-electron-rn.json');
  if (!fs.existsSync(presetPath)) {
    console.error(`[ERROR] Preset not found: ${presetPath}`);
    process.exit(1);
  }

  const preset = readJson(presetPath);
  const isTs = detectTypeScript(root, args.typescript || 'auto');

  const requestedRuntime = normalizeRuntime(args.runtime || 'auto');
  let runtime = requestedRuntime;
  if (runtime === 'auto' && preset.defaultRuntimeByType?.[kind]) {
    runtime = normalizeRuntime(preset.defaultRuntimeByType[kind]);
  }

  if (kind === 'electron-main') runtime = 'desktop-main';
  if (kind === 'electron-preload') runtime = 'desktop-preload';

  let target;
  try {
    target = pickTarget(root, preset, kind, runtime, args.dir);
  } catch (error) {
    console.error(`[ERROR] ${error.message}`);
    process.exit(1);
  }

  const effectiveRuntime = runtime === 'auto' ? target.runtime : runtime;

  try {
    validateRuntime(kind, effectiveRuntime);
  } catch (error) {
    console.error(`[ERROR] ${error.message}`);
    process.exit(1);
  }

  const ext = ['screen', 'component'].includes(kind)
    ? (isTs ? preset.defaultExt.tsx : preset.defaultExt.jsx)
    : (isTs ? preset.defaultExt.typescript : preset.defaultExt.javascript);

  const normalized = rawName.replace(/[^A-Za-z0-9]/g, '');
  if (!normalized) {
    console.error('[ERROR] Name must contain at least one alphanumeric character.');
    process.exit(1);
  }

  const fileStem = pascalToKebab(normalized);
  const outDir = path.join(root, target.path);
  const outFile = path.join(outDir, `${fileStem}${ext}`);

  if (fs.existsSync(outFile) && args.force !== 'true') {
    console.error(`[ERROR] File already exists: ${outFile}. Re-run with --force=true to overwrite.`);
    process.exit(1);
  }

  const fields = parseFields(args.fields);
  const content = template(kind, normalized, fields, isTs, effectiveRuntime);

  if (args['dry-run'] === 'true') {
    console.log(JSON.stringify({
      target: path.relative(root, outFile).replaceAll('\\', '/'),
      type: kind,
      runtime: effectiveRuntime,
      typeScript: isTs,
      bytes: Buffer.byteLength(content, 'utf8')
    }, null, 2));
    return;
  }

  ensureDir(outDir);
  fs.writeFileSync(outFile, content, 'utf8');

  console.log(`[SUCCESS] Created ${path.relative(root, outFile).replaceAll('\\', '/')}`);
  console.log(`[INFO] Runtime: ${effectiveRuntime}`);
  console.log(`[INFO] TypeScript mode: ${isTs ? 'enabled' : 'disabled'}`);
}

main();
