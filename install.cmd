@echo off
setlocal
set "NPM=C:\Program Files\nodejs\npm.cmd"
if not exist "%NPM%" (
  echo Node.js / npm was not found at %NPM%.
  echo Install Node.js LTS from https://nodejs.org/ and reopen this terminal.
  exit /b 1
)
"%NPM%" install --offline=false --no-audit --no-fund
