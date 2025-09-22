import { DashboardData } from './types';
import { dashboardMock } from './mock-data';
import { createClient, getJson } from '@/lib/http';

// Swap this provider when real APIs are available
let useMock = true;
export function setUseMock(value: boolean) {
  useMock = value;
}

// Example configuration for real API later
export interface ApiConfig {
  baseUrl: string;
  headers?: Record<string, string>;
}

let config: ApiConfig | null = null;
let http = null as ReturnType<typeof createClient> | null;
export function configureDashboardApi(c: ApiConfig) {
  config = c;
  http = createClient(c.baseUrl, c.headers);
}

// Server-side auto configuration from env for SSR pages
const envBase = process.env.NEXT_PUBLIC_API_BASE_URL;
const envToken = process.env.NEXT_PUBLIC_API_TOKEN;
if (envBase) {
  config = { baseUrl: envBase, headers: envToken ? { Authorization: `Bearer ${envToken}` } : undefined };
  http = createClient(config.baseUrl, config.headers);
  useMock = false;
}

export async function getDashboardData(): Promise<DashboardData> {
  if (useMock || !config) {
    // Simulate small network latency
    await new Promise((r) => setTimeout(r, 80));
    return dashboardMock;
  }

  // Real API example (kept here for easy swap-in)
  // return await getJson<DashboardData>(http!, '/dashboard');

  return dashboardMock;
}
