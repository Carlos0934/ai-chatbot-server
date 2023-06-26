export abstract class HttpService {
  constructor(private readonly apiUrl: string) {}

  protected async fetch<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${this.apiUrl}${path}`, init);
    if (!res.ok) {
      throw new Error(`Failed to fetch ${path}`);
    }

    const data = await res.json();
    return data;
  }
}
