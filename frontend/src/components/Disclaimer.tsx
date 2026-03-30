"use client";

export default function Disclaimer() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 pb-28">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5"
            >
              <path
                fillRule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.499-2.599 4.499H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h4 className="font-bold text-gray-800 text-sm mb-2">
                ⚕️ MEDICAL DISCLAIMER
              </h4>
              <p className="text-gray-600 text-xs leading-relaxed">
                This application is an <strong>informational tool only</strong> and is{" "}
                <strong>NOT a substitute for professional medical care</strong>. The
                first-aid instructions provided are based on general, globally
                recognized protocols and may not be appropriate for every situation.
                Always call your local emergency number (112, 108, 911, 999) for
                medical emergencies. The developers and operators of this application
                accept no liability for actions taken based on the information
                provided. <strong>When in doubt, always call emergency services.</strong>
              </p>
              <p className="text-gray-400 text-xs mt-3">
                © {new Date().getFullYear()} Emergency First Aid & Triage Assistant.
                For informational purposes only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
