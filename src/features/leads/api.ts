import type { LeadsResponse, Lead } from './types';
import { leadsMock } from './mock-data';
import { createClient, getJson } from '@/lib/http';

let useMock = true;
export function setUseLeadsMock(value: boolean) { useMock = value; }

export interface LeadsApiConfig {
  baseUrl: string;
  headers?: Record<string, string>;
}
let config: LeadsApiConfig | null = null;
let http = null as ReturnType<typeof createClient> | null;
export function configureLeadsApi(c: LeadsApiConfig) { config = c; http = createClient(c.baseUrl, c.headers); }

const envBase = process.env.NEXT_PUBLIC_API_BASE_URL;
const envToken = process.env.NEXT_PUBLIC_API_TOKEN;
if (envBase) {
  config = { baseUrl: envBase, headers: envToken ? { Authorization: `Bearer ${envToken}` } : undefined };
  http = createClient(config.baseUrl, config.headers);
  useMock = false;
}

export async function getLeads(page = 1, pageSize = 10, q = ''): Promise<LeadsResponse> {
  if (useMock || !config) {
    await new Promise((r) => setTimeout(r, 60));
    const normalized = q.trim().toLowerCase();
    const all: Lead[] = leadsMock.items.filter(l =>
      !normalized ||
      l.name.toLowerCase().includes(normalized) ||
      l.email.toLowerCase().includes(normalized) ||
      l.mobile.includes(normalized) ||
      l.counsellor.toLowerCase().includes(normalized)
    );
    const total = all.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const start = (page - 1) * pageSize;
    const items = all.slice(start, start + pageSize);
    return { items, total, page, pageSize, totalPages, q };
  }
  // Real API example
  // return await getJson<LeadsResponse>(http!, `/leads?page=${page}&pageSize=${pageSize}&q=${encodeURIComponent(q)}`);
  return { ...leadsMock, page, pageSize, totalPages: Math.max(1, Math.ceil(leadsMock.total / pageSize)), q };
}
