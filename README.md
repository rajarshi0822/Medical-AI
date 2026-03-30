<div align="center">
  <h1>🚨 AI Emergency Triage & First-Aid Assistant 🚨</h1>
  <p><strong>Lightning-fast, AI-driven emergency response guidance for critical moments.</strong></p>
  
  [![Next.js 15](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
  [![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Google Gemini AI](https://img.shields.io/badge/Gemini_AI_2.0-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://aistudio.google.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
</div>

<br />

> **⚠️ CRITICAL DISCLAIMER:** This application is an **informational tool only** and is **NOT a substitute for professional medical care**. Always call your local emergency number (112, 108, 911, 999) for medical emergencies. The developers accept no liability for actions taken based on information provided by this application.

<br />

## 🌟 Overview

When every second counts, the **AI Emergency Triage App** provides instant, easily digestible step-by-step stabilization instructions. Designed with a mobile-first philosophy, it leverages edge-cached responses for common emergencies (zero AI latency) and smoothly falls back to Google's Gemini 2.0 Flash for handling complex or uniquely described situations.

This isn't just another AI wrapper—it's an optimized, high-performance tool built specifically for high-stress scenarios where clarity and speed are paramount.

## ✨ Key Features

- **⚡ Instantaneous Response Time**: Top 18 common emergencies are pre-cached and load in milliseconds.
- **🚨 Intelligent AI Triage**: Automatically evaluates symptom severity and categorizes as `CRITICAL`, `MODERATE`, or `LOW`.
- **📋 Actionable Protocols**: Generates 3-5 perfectly concise, easily scannable steps based on recognized first-aid protocols.
- **🎤 Hands-Free Voice Input**: Fully integrated Web Speech API allows users to simply speak their emergency instead of typing.
- **📱 Mobile-First Realibility**: High-contrast, large-touch-target UI designed specifically for panicked, on-the-go scenarios.
- **📞 One-Tap Emergency Access**: Persistent, floating emergency call button always visible to quickly dispatch local authorities.

## 🏗️ Architecture Stack

| Layer | Technology Choice | Rationale |
| :--- | :--- | :--- |
| **Frontend** | Next.js 15 (App Router), React, TypeScript | Lightning-fast rendering, strict type-safety, and robust component model. |
| **Styling** | Tailwind CSS v4 | Rapid UI development, responsive design, and scalable styling utilities. |
| **Backend** | Python, FastAPI | High-performance async processing, perfect for rapid API development. |
| **AI Engine** | Google Gemini 2.0 Flash | Incredible inference speed and nuanced medical context comprehension. |
| **Integrations** | Web Speech API | Native browser support for voice-to-text without external dependencies. |

## 🚀 Getting Started

Follow these steps to run the application locally.

### Prerequisites
- **Node.js**: v18.0 or higher
- **Python**: v3.8 or higher
- **Gemini API Key**: Grab one for free from [Google AI Studio](https://aistudio.google.com/apikey).

### 🛠️ One-Click Global Startup (Windows)
For the fastest setup, simply run our powershell script in the root directory:
```powershell
.\start.ps1
```

### 👨‍💻 Manual Setup

#### 1. Setup the Backend (FastAPI)
```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate | Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env

# Don't forget to add your GEMINI_API_KEY inside the .env file!

python -m uvicorn main:app --reload --port 8000
```

#### 2. Setup the Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## 📁 Directory Structure

```text
Medical-AI/
├── frontend/                # Next.js 15 Frontend Application
│   ├── src/app/             # App Router pages and layouts
│   ├── src/components/      # Reusable UI pieces (SymptomInput, TriageResult, etc.)
│   ├── src/lib/             # API client and utility functions
│   └── src/types/           # TypeScript definitions
├── backend/                 # FastAPI Python Server
│   ├── main.py              # Application entrypoint & routing
│   ├── triage.py            # AI prompting logic
│   ├── cache.py             # Pre-computed responses for instant loading
│   └── models.py            # Pydantic data validation schemas
├── start.ps1                # Windows Startup Script
└── README.md                # Project Documentation
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/Medical-AI/issues). 

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.

---
<div align="center">
  <p>Built with ❤️ for a safer world.</p>
</div>
