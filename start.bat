@echo off
REM Pear Media - Quick Start Script for Windows

echo.
echo ===================================================
echo ◆ Pear Media - Text & Image Generation Platform ◆
echo ===================================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

REM Check if .env exists
if not exist ".env" (
    echo WARNING: .env file not found!
    echo Please copy .env.example to .env and add your API keys
    echo.
    echo Learn how to get API keys in DEPLOYMENT.md
    pause
)

REM Start the server
echo Starting Pear Media server...
echo Open your browser to: http://localhost:3000
echo.
echo Press CTRL+C to stop the server
echo.

call npm start
