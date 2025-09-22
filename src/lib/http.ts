export type HttpClient = (path: string, init?: RequestInit) => Promise<Response>;

export function createClient(baseUrl: string, headers?: Record<string, string>): HttpClient {
  return async function http(path: string, init?: RequestInit) {
    const res = await fetch(`${baseUrl}${path}`, {
      ...init,
      headers: {
        ...(headers ?? {}),
        ...(init?.headers ?? {}),
      },
      cache: 'no-cache',
    });
    if (!res.ok) {
      let body: string | undefined;
      try {
        body = await res.text();
      } catch {}
      throw new Error(body || `Request failed: ${res.status}`);
    }
    return res;
  };
}

export async function getJson<T>(client: HttpClient, path: string, init?: RequestInit): Promise<T> {
  const res = await client(path, init);
  return (await res.json()) as T;
}
