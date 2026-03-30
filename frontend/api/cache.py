"""Pre-cached emergency responses for common life-threatening conditions.

These provide instant responses (no AI latency) for the most common emergencies.
Based on globally recognized first-aid protocols (Red Cross, WHO, AHA).
"""
from __future__ import annotations
from typing import Optional

CACHED_RESPONSES = {
    "heart attack": {
        "severity": "CRITICAL",
        "call_emergency": True,
        "emergency_message": "🚨 CALL EMERGENCY SERVICES IMMEDIATELY",
        "steps": [
            "Call 112/108 immediately.",
            "Have the person sit upright and stay calm.",
            "Loosen any tight clothing around chest.",
            "Give one aspirin (325mg) if not allergic.",
            "Monitor breathing; begin CPR if they stop."
        ],
        "cached": True
    },
    "chest pain": {
        "severity": "CRITICAL",
        "call_emergency": True,
        "emergency_message": "🚨 CALL EMERGENCY SERVICES IMMEDIATELY",
        "steps": [
            "Call 112/108 immediately.",
            "Sit the person down in a comfortable position.",
            "Loosen tight clothing around neck and chest.",
            "Give aspirin if available and not allergic.",
            "Monitor breathing until help arrives."
        ],
        "cached": True
    },
    "severe bleeding": {
        "severity": "CRITICAL",
        "call_emergency": True,
        "emergency_message": "🚨 CALL EMERGENCY SERVICES IMMEDIATELY",
        "steps": [
            "Call 112/108 immediately.",
            "Apply firm, direct pressure with clean cloth.",
            "Do NOT remove the cloth; add more layers.",
            "Elevate the injured area above heart level.",
            "Keep the person warm; watch for shock signs."
        ],
        "cached": True
    },
    "choking": {
        "severity": "CRITICAL",
        "call_emergency": True,
        "emergency_message": "🚨 CALL EMERGENCY SERVICES IMMEDIATELY",
        "steps": [
            "Call 112/108 if the person cannot cough/speak.",
            "Stand behind them; wrap arms around waist.",
            "Make a fist above the navel, below ribs.",
            "Thrust inward and upward sharply 5 times.",
            "Repeat until object is expelled or help arrives."
        ],
        "cached": True
    },
    "burn": {
        "severity": "MODERATE",
        "call_emergency": True,
        "emergency_message": "🚨 CALL EMERGENCY SERVICES FOR SEVERE BURNS",
        "steps": [
            "Cool the burn under cool running water 10-20 min.",
            "Do NOT apply ice, butter, or toothpaste.",
            "Remove jewelry/clothing near burn (if not stuck).",
            "Cover loosely with sterile, non-stick bandage.",
            "Take over-the-counter pain relief if needed."
        ],
        "cached": True
    },
    "seizure": {
        "severity": "CRITICAL",
        "call_emergency": True,
        "emergency_message": "🚨 CALL EMERGENCY SERVICES IMMEDIATELY",
        "steps": [
            "Call 112/108 immediately.",
            "Clear the area of hard or sharp objects.",
            "Do NOT restrain them or put anything in mouth.",
            "Gently roll them to their side (recovery position).",
            "Time the seizure; stay until fully alert."
        ],
        "cached": True
    },
    "stroke": {
        "severity": "CRITICAL",
        "call_emergency": True,
        "emergency_message": "🚨 CALL EMERGENCY SERVICES IMMEDIATELY",
        "steps": [
            "Call 112/108 immediately — time is critical.",
            "Use FAST: Face drooping, Arm weakness, Speech.",
            "Note the time symptoms first appeared.",
            "Do NOT give food, water, or medication.",
            "Keep them comfortable; do not let them sleep."
        ],
        "cached": True
    },
    "allergic reaction": {
        "severity": "CRITICAL",
        "call_emergency": True,
        "emergency_message": "🚨 CALL EMERGENCY SERVICES IMMEDIATELY",
        "steps": [
            "Call 112/108 immediately.",
            "Use EpiPen on outer thigh if available.",
            "Help the person lie down with legs elevated.",
            "Loosen tight clothing; monitor breathing.",
            "Be ready to perform CPR if they stop breathing."
        ],
        "cached": True
    },
    "anaphylaxis": {
        "severity": "CRITICAL",
        "call_emergency": True,
        "emergency_message": "🚨 CALL EMERGENCY SERVICES IMMEDIATELY",
        "steps": [
            "Call 112/108 immediately.",
            "Inject EpiPen into outer thigh through clothing.",
            "Lay person flat; elevate legs if possible.",
            "If breathing is difficult, let them sit up.",
            "Second EpiPen after 5 min if no improvement."
        ],
        "cached": True
    },
    "drowning": {
        "severity": "CRITICAL",
        "call_emergency": True,
        "emergency_message": "🚨 CALL EMERGENCY SERVICES IMMEDIATELY",
        "steps": [
            "Call 112/108 immediately.",
            "Remove the person from water safely.",
            "Check for breathing; begin CPR if not breathing.",
            "Do NOT try to drain water from lungs.",
            "Keep them warm with blankets until help arrives."
        ],
        "cached": True
    },
    "poisoning": {
        "severity": "CRITICAL",
        "call_emergency": True,
        "emergency_message": "🚨 CALL EMERGENCY SERVICES IMMEDIATELY",
        "steps": [
            "Call 112/108 or Poison Control immediately.",
            "Do NOT induce vomiting unless told to.",
            "Identify the substance if safely possible.",
            "If on skin, remove clothing and rinse 20 min.",
            "Save the container/label for medical responders."
        ],
        "cached": True
    },
    "fracture": {
        "severity": "MODERATE",
        "call_emergency": True,
        "emergency_message": "🚨 SEEK MEDICAL HELP IMMEDIATELY",
        "steps": [
            "Call 112/108 for severe or open fractures.",
            "Do NOT move the injured limb.",
            "Immobilize with a splint or padding.",
            "Apply ice wrapped in cloth to reduce swelling.",
            "Watch for shock: pale skin, rapid breathing."
        ],
        "cached": True
    },
    "snake bite": {
        "severity": "CRITICAL",
        "call_emergency": True,
        "emergency_message": "🚨 CALL EMERGENCY SERVICES IMMEDIATELY",
        "steps": [
            "Call 112/108 immediately.",
            "Keep the person still and calm.",
            "Remove rings/watches near the bite site.",
            "Do NOT suck venom, cut, or apply tourniquet.",
            "Keep bite area below heart level."
        ],
        "cached": True
    },
    "electric shock": {
        "severity": "CRITICAL",
        "call_emergency": True,
        "emergency_message": "🚨 CALL EMERGENCY SERVICES IMMEDIATELY",
        "steps": [
            "Call 112/108 immediately.",
            "Do NOT touch person if still near power source.",
            "Turn off power source or use dry, non-metallic object.",
            "Check breathing; begin CPR if needed.",
            "Cover burns with sterile bandage."
        ],
        "cached": True
    },
    "unconscious": {
        "severity": "CRITICAL",
        "call_emergency": True,
        "emergency_message": "🚨 CALL EMERGENCY SERVICES IMMEDIATELY",
        "steps": [
            "Call 112/108 immediately.",
            "Check if the person is breathing.",
            "If breathing, place in recovery position (on side).",
            "If not breathing, begin CPR immediately.",
            "Do NOT give food or water."
        ],
        "cached": True
    },
    "asthma attack": {
        "severity": "CRITICAL",
        "call_emergency": True,
        "emergency_message": "🚨 CALL EMERGENCY SERVICES IF INHALER DOESN'T HELP",
        "steps": [
            "Help them sit upright; do NOT lay them down.",
            "Help them use their rescue inhaler (blue one).",
            "Give 4 puffs, one at a time, with 4 breaths each.",
            "Wait 4 minutes; repeat if no improvement.",
            "Call 112/108 if breathing worsens or no inhaler."
        ],
        "cached": True
    },
    "diabetic emergency": {
        "severity": "CRITICAL",
        "call_emergency": True,
        "emergency_message": "🚨 CALL EMERGENCY SERVICES IMMEDIATELY",
        "steps": [
            "Call 112/108 if person is unconscious.",
            "If conscious, give sugary drink or glucose tablet.",
            "Do NOT give insulin.",
            "Help them sit or lie down comfortably.",
            "Monitor until help arrives or they recover."
        ],
        "cached": True
    },
    "heat stroke": {
        "severity": "CRITICAL",
        "call_emergency": True,
        "emergency_message": "🚨 CALL EMERGENCY SERVICES IMMEDIATELY",
        "steps": [
            "Call 112/108 immediately.",
            "Move them to shade or air-conditioned area.",
            "Cool rapidly: ice packs on neck, armpits, groin.",
            "Fan them and mist with cool water.",
            "Do NOT give fluids if unconscious."
        ],
        "cached": True
    }
}


# Keywords that map to cached responses
KEYWORD_MAP = {
    # Heart attack
    "heart attack": "heart attack",
    "cardiac arrest": "heart attack",
    "myocardial": "heart attack",
    # Chest pain
    "chest pain": "chest pain",
    "chest tightness": "chest pain",
    "chest pressure": "chest pain",
    # Bleeding
    "severe bleeding": "severe bleeding",
    "heavy bleeding": "severe bleeding",
    "hemorrhage": "severe bleeding",
    "blood loss": "severe bleeding",
    "bleeding heavily": "severe bleeding",
    "won't stop bleeding": "severe bleeding",
    # Choking
    "choking": "choking",
    "can't breathe food": "choking",
    "something stuck in throat": "choking",
    "airway blocked": "choking",
    # Burns
    "burn": "burn",
    "burned": "burn",
    "scalded": "burn",
    "scald": "burn",
    "chemical burn": "burn",
    # Seizure
    "seizure": "seizure",
    "convulsion": "seizure",
    "fitting": "seizure",
    "epilepsy attack": "seizure",
    # Stroke
    "stroke": "stroke",
    "face drooping": "stroke",
    "slurred speech": "stroke",
    "sudden numbness": "stroke",
    # Allergic reaction
    "allergic reaction": "allergic reaction",
    "allergy severe": "allergic reaction",
    "swelling throat": "allergic reaction",
    "hives all over": "allergic reaction",
    # Anaphylaxis
    "anaphylaxis": "anaphylaxis",
    "anaphylactic": "anaphylaxis",
    "epipen": "anaphylaxis",
    # Drowning
    "drowning": "drowning",
    "drowned": "drowning",
    "pulled from water": "drowning",
    "near drowning": "drowning",
    # Poisoning
    "poisoning": "poisoning",
    "poisoned": "poisoning",
    "ingested poison": "poisoning",
    "swallowed chemicals": "poisoning",
    "overdose": "poisoning",
    # Fracture
    "fracture": "fracture",
    "broken bone": "fracture",
    "broken arm": "fracture",
    "broken leg": "fracture",
    # Snake bite
    "snake bite": "snake bite",
    "snakebite": "snake bite",
    "bitten by snake": "snake bite",
    # Electric shock
    "electric shock": "electric shock",
    "electrocuted": "electric shock",
    "electrocution": "electric shock",
    "electrical burn": "electric shock",
    # Unconscious
    "unconscious": "unconscious",
    "passed out": "unconscious",
    "fainted": "unconscious",
    "not responding": "unconscious",
    "unresponsive": "unconscious",
    "loss of consciousness": "unconscious",
    # Asthma
    "asthma attack": "asthma attack",
    "asthma": "asthma attack",
    "can't breathe": "asthma attack",
    "breathing difficulty": "asthma attack",
    "wheezing": "asthma attack",
    "shortness of breath": "asthma attack",
    # Diabetic
    "diabetic emergency": "diabetic emergency",
    "low blood sugar": "diabetic emergency",
    "hypoglycemia": "diabetic emergency",
    "diabetic shock": "diabetic emergency",
    # Heat stroke
    "heat stroke": "heat stroke",
    "heatstroke": "heat stroke",
    "heat exhaustion": "heat stroke",
    "overheated": "heat stroke",
    "sunstroke": "heat stroke",
}


def get_cached_response(symptom: str) -> Optional[dict]:
    """Check if the symptom matches a pre-cached emergency response.
    
    Uses keyword matching — checks if any known keyword appears in the input.
    Returns the cached response dict if found, None otherwise.
    """
    symptom_lower = symptom.lower().strip()
    
    # Direct match first
    if symptom_lower in CACHED_RESPONSES:
        return CACHED_RESPONSES[symptom_lower]
    
    # Keyword match — check if any keyword appears in the symptom text
    for keyword, cache_key in KEYWORD_MAP.items():
        if keyword in symptom_lower:
            return CACHED_RESPONSES[cache_key]
    
    return None
