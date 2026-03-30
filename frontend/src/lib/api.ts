const isProduction = process.env.NODE_ENV === "production";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || (isProduction ? "" : "http://localhost:8000");

export interface TriageResponse {
  severity: string;
  call_emergency: boolean;
  emergency_message: string;
  steps: string[];
  cached: boolean;
}

export async function getTriageResponse(symptom: string): Promise<TriageResponse> {
  const response = await fetch(`${API_BASE_URL}/api/triage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ symptom }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail || `API error: ${response.status}`);
  }

  return response.json();
}
