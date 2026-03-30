"""FastAPI backend for the Emergency First Aid & Triage application."""
import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from models import TriageRequest, TriageResponse
from triage import get_triage_response, configure_nvidia

# Load environment variables
load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan — configure AI on startup."""
    try:
        configure_nvidia()
        print("[OK] NVIDIA NIM API (gemma-3n-e4b-it) configured successfully")
    except ValueError as e:
        print(f"[WARNING]  Warning: {e}")
        print("   Cached responses will still work, but AI fallback is disabled.")
    yield


app = FastAPI(
    title="Emergency First Aid & Triage API",
    description="AI-powered emergency triage and first aid instruction system (powered by gemma-3n-e4b-it)",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS — allow the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Health check endpoint."""
    return {
        "status": "online",
        "service": "Emergency First Aid & Triage API",
        "model": "google/gemma-3n-e4b-it",
        "version": "1.0.0"
    }


@app.post("/api/triage", response_model=TriageResponse)
async def triage(request: TriageRequest):
    """Process an emergency symptom and return triage assessment.
    
    This endpoint:
    1. Checks pre-cached responses for common emergencies (instant)
    2. Falls back to AI (gemma-3n-e4b-it via NVIDIA NIM) for complex/unknown situations
    3. Returns a safe fallback if AI is unavailable
    """
    try:
        result = await get_triage_response(request.symptom)
        return TriageResponse(**result)
    except Exception as e:
        print(f"Triage error: {e}")
        raise HTTPException(
            status_code=500,
            detail="Failed to process triage request. Please call emergency services directly."
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("index:app", host="0.0.0.0", port=8000, reload=True)
