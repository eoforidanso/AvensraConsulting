/**
 * Order-level revocation list for signed access links.
 *
 * When a real DRM provider is live, revocation happens in that provider.
 * This list covers the fallback delivery path and refunded orders, and is
 * checked on every protected download.
 */
import { promises as fs } from "node:fs";
import path from "node:path";

const FILE = path.join(process.env.DATA_DIR ?? path.join(process.cwd(), "data"), "revoked.json");

async function read(): Promise<string[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8")) as string[];
  } catch {
    return [];
  }
}

export async function revoke(orderId: string): Promise<void> {
  const list = await read();
  if (!list.includes(orderId)) {
    list.push(orderId);
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    await fs.writeFile(FILE, JSON.stringify(list, null, 2), "utf8");
  }
}

export async function isRevoked(orderId: string): Promise<boolean> {
  return (await read()).includes(orderId);
}
