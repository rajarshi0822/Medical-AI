"use client";

import { useState, useCallback } from "react";
import VoiceInput from "./VoiceInput";

interface SymptomInputProps {
  onSubmit: (symptom: string) => void;
  isLoading: boolean;
}

export default function SymptomInput({ onSubmit, isLoading }: SymptomInputProps) {
  const [symptom, setSymptom] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (symptom.trim() && !isLoading) {
        onSubmit(symptom.trim());
      }
    },
    [symptom, isLoading, onSubmit]
  );

  const handleVoiceTranscript = useCallback((text: string) => {
    setSymptom(text);
    // Auto-submit on voice input for speed
    if (text.trim()) {
      onSubmit(text.trim());
    }
  }, [onSubmit]);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto animate-fade-in-up">
      <label
        htmlFor="symptom-input"
        className="block text-center text-xl md:text-2xl font-semibold text-gray-800 mb-4"
      >
        What is the emergency or symptom?
      </label>
      <p className="text-center text-gray-500 text-sm mb-6">
        Describe the situation clearly — e.g., &quot;chest pain and difficulty breathing&quot;
      </p>

      <div className="flex gap-3 items-stretch">
        <div className="flex-1 relative">
          <textarea
            id="symptom-input"
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            placeholder="Type or speak the emergency..."
            disabled={isLoading}
            rows={3}
            className="w-full px-5 py-4 text-lg bg-white border-2 border-gray-200 rounded-2xl resize-none
                       placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100
                       transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                       shadow-sm hover:shadow-md"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
        </div>

        {/* Voice Input */}
        <VoiceInput onTranscript={handleVoiceTranscript} disabled={isLoading} />
      </div>

      <button
        type="submit"
        id="submit-symptom"
        disabled={!symptom.trim() || isLoading}
        className="mt-4 w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 
                   hover:from-blue-700 hover:to-blue-800 text-white font-bold text-lg 
                   rounded-2xl transition-all duration-200 disabled:opacity-40 
                   disabled:cursor-not-allowed active:scale-[0.98] shadow-lg 
                   shadow-blue-200 hover:shadow-blue-300 cursor-pointer"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Analyzing...
          </span>
        ) : (
          "Get First Aid Instructions"
        )}
      </button>
    </form>
  );
}
