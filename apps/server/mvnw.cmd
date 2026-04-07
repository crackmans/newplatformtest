@ECHO OFF
SETLOCAL
SET "BASEDIR=%~dp0"
IF "%BASEDIR:~-1%"=="\" SET "BASEDIR=%BASEDIR:~0,-1%"
SET "WRAPPER_DIR=%BASEDIR%\.mvn\wrapper"
SET "WRAPPER_JAR=%WRAPPER_DIR%\maven-wrapper.jar"
SET "WRAPPER_URL=https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.3.2/maven-wrapper-3.3.2.jar"
SET "MAVEN_USER_HOME=%BASEDIR%\.mvn\repository"

IF NOT EXIST "%WRAPPER_JAR%" (
  IF NOT EXIST "%WRAPPER_DIR%" mkdir "%WRAPPER_DIR%"
  powershell -NoProfile -ExecutionPolicy Bypass -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object Net.WebClient).DownloadFile('%WRAPPER_URL%', '%WRAPPER_JAR%')"
  IF ERRORLEVEL 1 (
    ECHO Failed to download maven-wrapper.jar
    EXIT /B 1
  )
)

java -Dmaven.user.home="%MAVEN_USER_HOME%" -Dmaven.multiModuleProjectDirectory="%BASEDIR%" -cp "%WRAPPER_JAR%" org.apache.maven.wrapper.MavenWrapperMain %*
EXIT /B %ERRORLEVEL%
