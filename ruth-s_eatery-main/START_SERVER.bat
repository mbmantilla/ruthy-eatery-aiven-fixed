@echo off
REM Ruthy Eatery - Startup Script
REM This script starts the Node.js server on port 3001

color 0A
cls

echo.
echo ========================================
echo  RUTHY EATERY SERVER STARTUP
echo ========================================
echo.
echo Checking Node.js installation...

REM Check if Node is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    timeout /t 5
    exit /b 1
)

node --version
echo.
echo Starting server on http://localhost:3001
echo Press Ctrl+C to stop the server
echo.
timeout /t 2

REM Start the server
cd /d "%~dp0"
node server.js

REM If server crashes, keep window open
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo ERROR: Server failed to start!
    echo Check the error message above
    pause
    exit /b 1
)
