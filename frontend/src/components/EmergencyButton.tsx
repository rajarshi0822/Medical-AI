"use client";

export default function EmergencyButton() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/80 backdrop-blur-lg border-t border-red-100 shadow-[0_-4px_20px_rgba(220,38,38,0.1)]">
      <a
        href="tel:112"
        id="emergency-call-button"
        className="flex items-center justify-center gap-3 w-full max-w-2xl mx-auto py-4 px-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-lg rounded-2xl transition-all duration-200 animate-emergency-pulse active:scale-95"
        aria-label="Call emergency services at 112 or 108"
      >
        {/* Phone Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7 flex-shrink-0"
        >
          <path
            fillRule="evenodd"
            d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
            clipRule="evenodd"
          />
        </svg>
        <span className="tracking-wide">
          CALL AMBULANCE{" "}
          <span className="opacity-90">(112 / 108)</span>
        </span>
      </a>
    </div>
  );
}
