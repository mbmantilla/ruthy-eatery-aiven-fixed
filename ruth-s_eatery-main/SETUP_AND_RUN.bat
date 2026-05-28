@echo off
REM Ruthy Eatery - Complete Setup & Startup
REM This script installs, builds, and runs the full application

setlocal enabledelayedexpansion
color 0A
cls

echo.
echo ========================================
echo  RUTHY EATERY - COMPLETE SETUP
echo ========================================
echo.

REM Check if Node is installed
echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo ERROR: Node.js is not installed!
    echo Download from: https://nodejs.org/
    timeout /t 5
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo Found: %NODE_VERSION%
echo.

REM Install dependencies
echo ========================================
echo Installing npm dependencies...
echo ========================================
call npm install
if %errorlevel% neq 0 (
    color 0C
    echo ERROR: npm install failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Building React application...
echo ========================================
call npm run build
if %errorlevel% neq 0 (
    color 0C
    echo ERROR: npm build failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Starting server on http://localhost:3001
echo ========================================
echo.
echo Waiting 2 seconds before starting...
timeout /t 2 /nobreak
echo.

node server.js

REM If we get here, server crashed
color 0C
echo.
echo ERROR: Server crashed!
pause
exit /b 1
