@echo off
title Emergency First Aid - Launcher
color 0C

echo.
echo ============================================
echo   Emergency First Aid ^& Triage Application
echo ============================================
echo.

:: Start Backend
echo [*] Starting Backend (FastAPI) on port 8000...
start "BACKEND - FastAPI :8000" cmd /k "cd /d "%~dp0\frontend" && pip install -r requirements.txt && cd api && python -m uvicorn index:app --reload --port 8000"

:: Wait 3 seconds for backend to start
timeout /t 3 /nobreak >nul

:: Start Frontend
echo [*] Starting Frontend (Next.js) on port 3000...
start "FRONTEND - Next.js :3000" cmd /k "cd /d "%~dp0\frontend" && npm run dev"

:: Wait 3 seconds then open browser
timeout /t 3 /nobreak >nul

echo.
echo [*] Opening browser...
start http://localhost:3000

echo.
echo ============================================
echo   Both servers are running!
echo.
echo   Frontend:  http://localhost:3000
echo   Backend:   http://localhost:8000
echo   API Docs:  http://localhost:8000/docs
echo ============================================
echo.
echo Close this window anytime. Servers run independently.
timeout /t 5 /nobreak >nul
exit
