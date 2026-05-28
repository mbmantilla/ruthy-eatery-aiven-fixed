@echo off
cd /d "%~dp0"
echo Starting Ruthy Eatery Server...
echo.
echo Server will run on http://localhost:3001
echo.
timeout /t 2
node server.js
pause
