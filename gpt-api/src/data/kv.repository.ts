import { KvStore } from "../types.ts";

export class KvDenoStore implements KvStore {
  constructor(private readonly table: string) {}

  async get<T>(...keys: string[]): Promise<T | null> {
    const kv = await Deno.openKv(this.table);

    const data = await kv.get<T>(keys);
    kv.close();
    return data.value;
  }

  async set<T>(value: T, ...key: string[]): Promise<void> {
    const kv = await Deno.openKv(this.table);
    await kv.set(key, value);
    kv.close();
  }
}
