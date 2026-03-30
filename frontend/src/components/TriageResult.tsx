"use client";

interface TriageResultProps {
  result: {
    severity: string;
    call_emergency: boolean;
    emergency_message: string;
    steps: string[];
    cached: boolean;
  };
}

export default function TriageResult({ result }: TriageResultProps) {
  const severityConfig = {
    CRITICAL: {
      bannerClass: "severity-critical",
      icon: "🚨",
      label: "CRITICAL — CALL FOR HELP IMMEDIATELY",
      borderClass: "border-red-200",
      bgClass: "bg-red-50",
      stepDotClass: "bg-red-500",
      stepTextClass: "text-red-900",
    },
    MODERATE: {
      bannerClass: "severity-moderate",
      icon: "⚠️",
      label: "MODERATE — SEEK MEDICAL ATTENTION",
      borderClass: "border-amber-200",
      bgClass: "bg-amber-50",
      stepDotClass: "bg-amber-500",
      stepTextClass: "text-amber-900",
    },
    LOW: {
      bannerClass: "severity-low",
      icon: "✅",
      label: "LOW — MANAGEABLE WITH FIRST AID",
      borderClass: "border-emerald-200",
      bgClass: "bg-emerald-50",
      stepDotClass: "bg-emerald-500",
      stepTextClass: "text-emerald-900",
    },
  };

  const severity = result.severity.toUpperCase() as keyof typeof severityConfig;
  const config = severityConfig[severity] || severityConfig.MODERATE;

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in-up">
      {/* Severity Banner */}
      <div
        className={`${config.bannerClass} rounded-2xl p-6 text-center shadow-lg mb-6`}
        role="alert"
        aria-live="assertive"
      >
        <div className="text-4xl mb-2">{config.icon}</div>
        <h2 className="text-2xl md:text-3xl font-black tracking-tight">
          {config.label}
        </h2>
        {result.emergency_message && (
          <p className="mt-3 text-lg font-semibold opacity-95">
            {result.emergency_message}
          </p>
        )}
      </div>

      {/* Emergency Call Prompt for Critical */}
      {result.call_emergency && (
        <a
          href="tel:112"
          className="flex items-center justify-center gap-3 w-full py-4 mb-6 bg-red-600 hover:bg-red-700 text-white font-bold text-xl rounded-2xl transition-all duration-200 animate-emergency-pulse"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
            <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
          </svg>
          📞 TAP TO CALL 112 / 108 NOW
        </a>
      )}

      {/* First Aid Steps */}
      <div className={`${config.bgClass} ${config.borderClass} border-2 rounded-2xl p-6 shadow-sm`}>
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
          </svg>
          Immediate First Aid Steps
        </h3>
        <ol className="space-y-4">
          {result.steps.map((step, index) => (
            <li
              key={index}
              className="flex items-start gap-4 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span
                className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full ${config.stepDotClass} text-white font-bold text-sm shadow-md`}
              >
                {index + 1}
              </span>
              <p className={`${config.stepTextClass} text-lg font-medium leading-relaxed pt-0.5`}>
                {step}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* Cached indicator */}
      {result.cached && (
        <p className="text-center text-xs text-gray-400 mt-4">
          ⚡ Instant response from verified first-aid protocols
        </p>
      )}
    </div>
  );
}
