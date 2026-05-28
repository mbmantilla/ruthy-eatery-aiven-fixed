@echo off
REM ============================================
REM RUTHY EATERY - PRODUCTION LAUNCHER
REM ============================================

cd /d "%~dp0"
color 0A
cls

echo.
echo ============================================
echo  RUTHY EATERY - COMPLETE SETUP & RUN
echo ============================================
echo.

REM Check Node.js
echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo ERROR: Node.js not installed!
    echo Download from: https://nodejs.org/ v20.x
    timeout /t 5
    exit /b 1
)

for /f "tokens=*" %%A in ('node --version') do set NODE_VER=%%A
echo Found: %NODE_VER%
echo.

REM Install dependencies
echo Installing npm packages...
call npm install
if %errorlevel% neq 0 (
    color 0C
    echo ERROR: npm install failed!
    timeout /t 5
    exit /b 1
)
echo.

REM Build React
echo Building React application...
call npm run build
if %errorlevel% neq 0 (
    color 0C
    echo ERROR: Build failed!
    timeout /t 5
    exit /b 1
)
echo.

REM Start server
echo ============================================
echo Starting Ruthy Eatery Server
echo ============================================
echo.
echo Server: http://localhost:3001
echo Admin Email: admin@gmail.com
echo Admin Password: admin123
echo.
echo Press Ctrl+C to stop
echo.
timeout /t 2

node server.js

if %errorlevel% neq 0 (
    color 0C
    echo.
    echo ERROR: Server failed to start
    timeout /t 5
)

exit /b %errorlevel%
