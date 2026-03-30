# Start both servers (frontend + backend) for the Emergency First Aid & Triage app.
# Usage: Right-click -> Run with PowerShell, or run `.\start.ps1` in terminal.

Write-Host ""
Write-Host "============================================" -ForegroundColor Red
Write-Host "  Emergency First Aid & Triage Application" -ForegroundColor Red
Write-Host "============================================" -ForegroundColor Red
Write-Host ""

# Check for .env file
if (-not (Test-Path "frontend\.env")) {
    Write-Host "[!] No .env file found in frontend\" -ForegroundColor Yellow
    Write-Host "    Copy frontend\.env.example to frontend\.env and add your GEMINI_API_KEY" -ForegroundColor Yellow
    Write-Host "    Get a free key at: https://aistudio.google.com/apikey" -ForegroundColor Yellow
    Write-Host ""
}

# Start Backend (FastAPI) in a new terminal
Write-Host "[*] Starting Backend (FastAPI) on port 8000..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; pip install -r requirements.txt; cd api; python -m uvicorn index:app --reload --port 8000"

# Wait for backend to start
Start-Sleep -Seconds 3

# Start Frontend (Next.js) in a new terminal
Write-Host "[*] Starting Frontend (Next.js) on port 3000..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm run dev"

Write-Host ""
Write-Host "[OK] Both servers are starting!" -ForegroundColor Green
Write-Host ""
Write-Host "  Frontend:  http://localhost:3000" -ForegroundColor White
Write-Host "  Backend:   http://localhost:8000" -ForegroundColor White
Write-Host "  API Docs:  http://localhost:8000/docs" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to exit this launcher..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
