"""Pydantic models for the triage API."""
from pydantic import BaseModel, Field
from typing import List


class TriageRequest(BaseModel):
    """Request model for the triage endpoint."""
    symptom: str = Field(
        ...,
        min_length=2,
        max_length=1000,
        description="Description of the emergency symptom or situation",
        examples=["chest pain and difficulty breathing", "severe burn on arm"]
    )


class TriageResponse(BaseModel):
    """Response model for the triage endpoint."""
    severity: str = Field(
        ...,
        description="Severity level: CRITICAL, MODERATE, or LOW"
    )
    call_emergency: bool = Field(
        ...,
        description="Whether to call emergency services"
    )
    emergency_message: str = Field(
        default="",
        description="Emergency message if applicable"
    )
    steps: List[str] = Field(
        ...,
        description="First aid action steps",
        max_length=5
    )
    cached: bool = Field(
        default=False,
        description="Whether this response was from cache"
    )
