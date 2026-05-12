$ErrorActionPreference = "Stop"

$AppDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ExePath = Join-Path $AppDir "release\CAT On-Screen Calculator 2026 1.0.0.exe"
$NodeModulesPath = Join-Path $AppDir "node_modules"

Set-Location $AppDir

Write-Host ""
Write-Host "CAT On-Screen Calculator 2026 - Floating App Launcher"
Write-Host "----------------------------------------------------"

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js/npm is not installed or not available in PATH."
    Write-Host "Install Node.js LTS from https://nodejs.org, then run this launcher again."
    Read-Host "Press Enter to exit"
    exit 1
}

if (-not (Test-Path $NodeModulesPath)) {
    Write-Host "Packages are missing. Installing dependencies..."
    npm install
}

if (-not (Test-Path $ExePath)) {
    Write-Host "Floating app .exe not found. Building it now..."
    npm run dist
}

if (-not (Test-Path $ExePath)) {
    Write-Host "Build finished, but the app .exe was not found:"
    Write-Host $ExePath
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Opening floating calculator..."
Start-Process -FilePath $ExePath

