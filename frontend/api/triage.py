"""AI Triage logic using NVIDIA NIM API (gemma-3n-e4b-it) with hardcoded medical system prompt."""
from __future__ import annotations
import json
import os
from openai import AsyncOpenAI
from cache import get_cached_response

# NVIDIA NIM API configuration
NVIDIA_BASE_URL = "https://integrate.api.nvidia.com/v1"
MODEL_NAME = "google/gemma-3-4b-it"

# Hardcoded system prompt — the core of the triage AI
SYSTEM_PROMPT = """You are an Emergency First Aid Triage Assistant. Your primary directive is harm reduction and stabilization.

Rules:
1. If the input indicates a potentially life-threatening condition (e.g., chest pain, severe bleeding, loss of consciousness, stroke symptoms, difficulty breathing, poisoning, severe allergic reaction), your very first line MUST be '🚨 CALL EMERGENCY SERVICES IMMEDIATELY.'
2. Provide a maximum of 5 short, actionable first-aid steps to stabilize the patient while waiting for help.
3. Base all physiological advice on standard, globally recognized first-aid protocols (Red Cross, WHO, AHA guidelines).
4. Never attempt to diagnose; only provide immediate physical response actions.
5. Keep sentences under 15 words. Use bullet points.
6. You MUST respond ONLY in this exact JSON format, with no other text:
{"severity": "CRITICAL or MODERATE or LOW", "call_emergency": true or false, "steps": ["step1", "step2", "step3", "step4", "step5"]}

Severity guide:
- CRITICAL: Life-threatening, requires immediate emergency services (chest pain, severe bleeding, unconsciousness, stroke, choking, anaphylaxis, poisoning, drowning)
- MODERATE: Needs medical attention but not immediately life-threatening (minor fractures, moderate burns, sprains, minor allergic reactions)
- LOW: Can be managed with basic first aid (minor cuts, bruises, mild headaches, minor burns)
"""

# Global async client instance
_client: AsyncOpenAI = None


def configure_nvidia():
    """Configure the NVIDIA NIM API client."""
    global _client
    api_key = os.getenv("NVIDIA_API_KEY")
    if not api_key:
        raise ValueError(
            "NVIDIA_API_KEY environment variable is not set. "
            "Please set it in your .env file."
        )
    _client = AsyncOpenAI(
        base_url=NVIDIA_BASE_URL,
        api_key=api_key,
        timeout=30.0,  # 30 second timeout
    )


async def get_triage_response(symptom: str) -> dict:
    """Get triage response — tries cache first, then falls back to AI.
    
    Args:
        symptom: The user's description of symptoms/emergency.
        
    Returns:
        Dict with severity, call_emergency, emergency_message, steps, cached.
    """
    # Step 1: Check cache for instant response
    cached = get_cached_response(symptom)
    if cached:
        return cached
    
    # Step 2: Fall back to NVIDIA NIM API (gemma-3n-e4b-it)
    try:
        if _client is None:
            raise ValueError("NVIDIA API client not configured")
        
        completion = await _client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": f"Emergency situation: {symptom}"}
            ],
            temperature=0.1,  # Low temperature for consistent, safe responses
            max_tokens=500,
        )
        
        response_text = completion.choices[0].message.content.strip()
        print(f"AI Response: {response_text}")
        
        # Clean up if wrapped in code blocks
        if response_text.startswith("```"):
            response_text = response_text.split("\n", 1)[1]
            response_text = response_text.rsplit("```", 1)[0].strip()
        
        parsed = json.loads(response_text)
        
        # Build the response
        severity = parsed.get("severity", "MODERATE").upper()
        call_emergency = parsed.get("call_emergency", True)
        steps = parsed.get("steps", ["Seek medical attention immediately."])
        
        # Ensure max 5 steps
        steps = steps[:5]
        
        emergency_message = ""
        if call_emergency:
            emergency_message = "🚨 CALL EMERGENCY SERVICES IMMEDIATELY"
        
        return {
            "severity": severity,
            "call_emergency": call_emergency,
            "emergency_message": emergency_message,
            "steps": steps,
            "cached": False
        }
        
    except json.JSONDecodeError:
        # If AI response isn't valid JSON, return a safe fallback
        return {
            "severity": "CRITICAL",
            "call_emergency": True,
            "emergency_message": "🚨 CALL EMERGENCY SERVICES IMMEDIATELY",
            "steps": [
                "Call 112/108 immediately.",
                "Stay calm and keep the patient comfortable.",
                "Do not move the patient unless in danger.",
                "Monitor breathing and consciousness.",
                "Wait for professional medical help."
            ],
            "cached": False
        }
    except Exception as e:
        # Network/API errors — still provide helpful fallback
        print(f"AI API Error: {e}")
        return {
            "severity": "CRITICAL",
            "call_emergency": True,
            "emergency_message": "🚨 CALL EMERGENCY SERVICES IMMEDIATELY",
            "steps": [
                "Call 112/108 immediately.",
                "AI service unavailable — call for help now.",
                "Keep the patient calm and still.",
                "Monitor breathing and pulse.",
                "Do not give food or water if unconscious."
            ],
            "cached": False
        }
