import { API_BASE_URL } from "./base";

export interface DatabaseHealth {
  configured: boolean;
  status: string;
  message?: string;
  database?: string;
  error?: string;
}

export interface AIServiceHealth {
  provider: string;
  model: string;
  configured: boolean;
  status: string;
}

export interface HealthResponse {
  status: string;
  app: string;
  version: string;
  database: DatabaseHealth;
  ai_service: AIServiceHealth;
}

export interface HealthCheckResult {
  data: HealthResponse | null;
  latencyMs: number;
  error: string | null;
}

export async function checkBackendHealth(): Promise<HealthCheckResult> {
  const start = performance.now();
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    const latencyMs = Math.round(performance.now() - start);

    if (!response.ok) {
      return {
        data: null,
        latencyMs,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const data: HealthResponse = await response.json();
    return { data, latencyMs, error: null };
  } catch (err: unknown) {
    const latencyMs = Math.round(performance.now() - start);
    const errorMessage =
      err instanceof Error ? err.message : 'Network request failed';
    return { data: null, latencyMs, error: errorMessage };
  }
}
