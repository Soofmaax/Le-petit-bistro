import { z } from 'zod';

export const ApiConfigSchema = z.object({
  baseUrl: z.string().url().optional(),
  timeoutMs: z.number().int().positive().optional()
});

export type ApiConfig = z.infer<typeof ApiConfigSchema>;

const defaultConfig: Required<Pick<ApiConfig, 'baseUrl' | 'timeoutMs'>> = {
  baseUrl: (import.meta.env.VITE_API_BASE_URL as string) || '',
  timeoutMs: 8000
};

export class ApiClient {
  private readonly baseUrl: string;
  private readonly timeoutMs: number;

  constructor(cfg?: ApiConfig) {
    this.baseUrl = (cfg?.baseUrl ?? defaultConfig.baseUrl).replace(/\/+$/, '');
    this.timeoutMs = cfg?.timeoutMs ?? defaultConfig.timeoutMs;
  }

  private withTimeout<T>(p: Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const t = setTimeout(() => reject(new Error('timeout')), this.timeoutMs);
      p.then((v) => {
        clearTimeout(t);
        resolve(v);
      }).catch((e) => {
        clearTimeout(t);
        reject(e);
      });
    });
  }

  async get<T>(path: string, schema?: z.ZodType<T>): Promise<T> {
    const url = this.baseUrl ? `${this.baseUrl}${path}` : path;
    const req = fetch(url, { credentials: 'same-origin' }).then(async (r) => {
      if (!r.ok) throw new Error(`http_${r.status}`);
      const json = await r.json();
      return schema ? schema.parse(json) : (json as T);
    });
    return this.withTimeout(req);
  }

  async post<T, B extends object>(path: string, body: B, schema?: z.ZodType<T>): Promise<T> {
    const url = this.baseUrl ? `${this.baseUrl}${path}` : path;
    const req = fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(async (r) => {
      if (!r.ok) throw new Error(`http_${r.status}`);
      const json = await r.json();
      return schema ? schema.parse(json) : (json as T);
    });
    return this.withTimeout(req);
  }
}