@echo off
setlocal

set "APP_DIR=%~dp0"
set "PS_SCRIPT=%APP_DIR%Run-Floating-Calculator.ps1"
set "APP_EXE=%APP_DIR%release\CAT On-Screen Calculator 2026 1.0.0.exe"

if exist "%APP_EXE%" (
  start "" "%APP_EXE%"
  exit /b 0
)

powershell -NoProfile -ExecutionPolicy Bypass -File "%PS_SCRIPT%"

endlocal
