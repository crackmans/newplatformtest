#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

function parseArgs(argv) {
  const out = {};
  for (const arg of argv) {
    if (!arg.startsWith('--')) continue;
    const [k, v = 'true'] = arg.slice(2).split('=');
    out[k] = v;
  }
  return out;
}

function walk(dir, ignoredNames = new Set(), files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoredNames.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, ignoredNames, files);
    } else {
      files.push(full);
    }
  }
  return files;
}

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
  return JSON.parse(raw);
}

function isKebabOrSnake(name) {
  return /^[a-z0-9]+([_-][a-z0-9]+)*$/.test(name);
}

function classifyRole(relPath, hints = {}) {
  const parts = relPath.split('/').map((x) => x.toLowerCase());
  for (const [role, tokens] of Object.entries(hints)) {
    if (tokens.some((token) => parts.includes(String(token).toLowerCase()))) {
      return role;
    }
  }
  return null;
}

function rolePathError(role, base, preset) {
  const checks = preset.rolePathChecks || {};
  if (role === 'screen') {
    const tokens = (checks.screenNameTokens || ['screen']).map((x) => String(x).toLowerCase());
    const hasToken = tokens.some((token) => base.includes(token));
    if (hasToken && !base.endsWith('screen')) {
      return 'screen-like files should end with `screen` when the filename includes the screen token.';
    }
  }
  if (role === 'hook') {
    const prefix = String(checks.hookNamePrefix || 'use').toLowerCase();
    if (!base.toLowerCase().startsWith(prefix)) {
      return `hook files should start with \`${prefix}\`.`;
    }
  }
  return null;
}

function extractImportSpecifiers(content) {
  const out = [];
  const regex = /(?:import\s+[^'"\n]+\s+from\s+|import\s*\(\s*|require\(\s*)['"]([^'"]+)['"]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    out.push(match[1]);
  }
  return out;
}

function startsWithAny(rel, prefixes) {
  return prefixes.some((prefix) => rel === prefix || rel.startsWith(`${prefix}/`));
}

function evaluateBoundaryRules(rel, content, imports, boundaryRules = []) {
  const errors = [];

  for (const rule of boundaryRules) {
    const appliesTo = Array.isArray(rule.appliesTo) ? rule.appliesTo : [];
    if (!startsWithAny(rel, appliesTo)) continue;

    const patterns = Array.isArray(rule.disallowImportPatterns) ? rule.disallowImportPatterns : [];
    for (const specifier of imports) {
      for (const pattern of patterns) {
        if (specifier.includes(pattern)) {
          errors.push(`${rule.name || 'boundary-rule'}: disallowed import '${specifier}' matched '${pattern}'. ${rule.message || ''}`.trim());
        }
      }
    }

    const contentPatterns = Array.isArray(rule.disallowContentPatterns) ? rule.disallowContentPatterns : [];
    for (const rawPattern of contentPatterns) {
      const re = new RegExp(rawPattern, 'm');
      if (re.test(content)) {
        errors.push(`${rule.name || 'boundary-rule'}: disallowed content pattern '${rawPattern}' found. ${rule.message || ''}`.trim());
      }
    }
  }

  return errors;
}

function main() {
  const root = process.cwd();
  const args = parseArgs(process.argv.slice(2));
  const presetPath = path.resolve(root, args.preset || '.agents/skills/verify-conventions/scripts/presets/hybrid-react-electron-rn.json');

  if (!fs.existsSync(presetPath)) {
    console.error(`[ERROR] Preset not found: ${presetPath}`);
    process.exit(1);
  }

  const preset = readJson(presetPath);

  const sourceRoots = (preset.sourceRoots || [])
    .map((p) => path.join(root, p))
    .filter((p) => fs.existsSync(p));

  if (sourceRoots.length === 0) {
    console.error('[ERROR] No configured source roots exist. Update the preset to match the repository.');
    process.exit(1);
  }

  const ignoredNames = new Set(preset.ignoreDirs || []);
  const allowedExt = new Set(preset.allowedExtensions || ['.ts', '.tsx', '.js', '.jsx']);
  const disallowRel = preset.disallowRelativeImportPattern ? new RegExp(preset.disallowRelativeImportPattern) : null;
  const roleChecksEnabled = Boolean(preset.rolePathChecks?.enabled);

  let errors = 0;
  let checked = 0;

  for (const srcRoot of sourceRoots) {
    for (const file of walk(srcRoot, ignoredNames)) {
      const ext = path.extname(file);
      if (!allowedExt.has(ext)) continue;

      checked += 1;
      const rel = path.relative(root, file).replaceAll('\\', '/');
      const base = path.basename(file, ext);

      if (!(preset.naming?.allowIndex && base === 'index') && !isKebabOrSnake(base)) {
        console.error(`[ERROR] ${rel}: file name must be kebab-case or snake_case.`);
        errors += 1;
      }

      const content = fs.readFileSync(file, 'utf8');

      if (disallowRel && disallowRel.test(content)) {
        console.error(`[ERROR] ${rel}: disallowed deep relative import pattern detected.`);
        errors += 1;
      }

      if (roleChecksEnabled) {
        const role = classifyRole(rel, preset.pathHints || {});
        if (role) {
          const maybeError = rolePathError(role, base.toLowerCase(), preset);
          if (maybeError) {
            console.error(`[ERROR] ${rel}: ${maybeError}`);
            errors += 1;
          }
        }
      }

      const imports = extractImportSpecifiers(content);
      const boundaryErrors = evaluateBoundaryRules(rel, content, imports, preset.boundaryRules || []);
      for (const boundaryError of boundaryErrors) {
        console.error(`[ERROR] ${rel}: ${boundaryError}`);
        errors += 1;
      }
    }
  }

  if (errors > 0) {
    console.error(`\n[RESULT] FAILED: ${errors} issue(s) found across ${checked} checked file(s).`);
    process.exit(1);
  }

  console.log(`[RESULT] PASSED: ${checked} file(s) checked, no convention violations found.`);
}

main();
