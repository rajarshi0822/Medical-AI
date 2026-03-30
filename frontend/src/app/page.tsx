"use client";

import { useState, useCallback } from "react";
import EmergencyButton from "@/components/EmergencyButton";
import SymptomInput from "@/components/SymptomInput";
import TriageResult from "@/components/TriageResult";
import Disclaimer from "@/components/Disclaimer";
import { getTriageResponse, TriageResponse } from "@/lib/api";

export default function Home() {
  const [result, setResult] = useState<TriageResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (symptom: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await getTriageResponse(symptom);
      setResult(response);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to get response. Please call emergency services directly."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-lg shadow-red-200">
              <span className="text-white text-xl">🏥</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                Emergency First Aid
              </h1>
              <p className="text-xs text-gray-500 font-medium">
                AI-Powered Triage Assistant
              </p>
            </div>
          </div>

          {/* Quick Emergency Badge */}
          <a
            href="tel:112"
            className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-sm rounded-full transition-colors duration-200 border border-red-200"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
            </span>
            112
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 py-8 md:py-12">
        {/* Hero Section — shown only when no result */}
        {!result && !error && (
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 text-sm font-semibold rounded-full mb-6 border border-red-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              AI-Powered Emergency Response
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
              Instant First Aid
              <br />
              <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                When Every Second Counts
              </span>
            </h2>
            <p className="text-gray-500 text-lg max-w-lg mx-auto">
              Describe the emergency below. Get immediate, life-saving
              first-aid instructions powered by AI.
            </p>
          </div>
        )}

        {/* Input Section */}
        <div className="w-full max-w-2xl mx-auto mb-8">
          {result && (
            <button
              onClick={handleReset}
              id="new-assessment-button"
              className="flex items-center gap-2 mb-6 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z" clipRule="evenodd" />
              </svg>
              New Assessment
            </button>
          )}
          <SymptomInput onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="w-full max-w-2xl mx-auto animate-fade-in-up">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
              </div>
              <p className="text-gray-700 font-semibold text-lg">
                Analyzing emergency...
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Generating first-aid instructions
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="w-full max-w-2xl mx-auto animate-fade-in-up">
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-center">
              <div className="text-3xl mb-3">⚠️</div>
              <p className="text-red-800 font-bold text-lg mb-2">
                Unable to process request
              </p>
              <p className="text-red-600 text-sm mb-4">{error}</p>
              <a
                href="tel:112"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors duration-200"
              >
                📞 Call 112 / 108 for Emergency
              </a>
            </div>
          </div>
        )}

        {/* Results */}
        {result && !isLoading && <TriageResult result={result} />}

        {/* Common Emergencies Quick Access */}
        {!result && !isLoading && !error && (
          <div className="w-full max-w-2xl mx-auto mt-8 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <p className="text-center text-sm text-gray-400 mb-4 font-medium">
              Common emergencies — tap for instant response
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { emoji: "💔", label: "Heart Attack" },
                { emoji: "🩸", label: "Severe Bleeding" },
                { emoji: "😮‍💨", label: "Choking" },
                { emoji: "🔥", label: "Burns" },
                { emoji: "⚡", label: "Electric Shock" },
                { emoji: "🐍", label: "Snake Bite" },
                { emoji: "🧠", label: "Stroke" },
                { emoji: "💊", label: "Poisoning" },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleSubmit(item.label.toLowerCase())}
                  className="flex items-center gap-2 px-4 py-3 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-xl text-sm font-medium text-gray-700 transition-all duration-200 hover:shadow-sm active:scale-95 cursor-pointer"
                >
                  <span className="text-lg">{item.emoji}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Disclaimer Footer */}
      <Disclaimer />

      {/* Sticky Emergency Button */}
      <EmergencyButton />
    </div>
  );
}
