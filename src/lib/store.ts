/**
 * Minimal append-only record store for orders and form submissions.
 *
 * Phase 1 deliberately avoids a custom backend. Two drivers are provided:
 *   - "file"     : newline-delimited JSON under ./data (local + single-host)
 *   - "postgres" : any Postgres URL (Neon, Supabase, RDS) for production
 *
 * Both expose the same interface, so moving from one to the other is an
 * environment change rather than a code change.
 */
import { promises as fs } from "node:fs";
import path from "node:path";

export type Collection = "orders" | "contact" | "corporate" | "feedback";

export type Record_ = {
  id: string;
  createdAt: string;
  [key: string]: unknown;
};

const DATA_DIR = process.env.DATA_DIR ?? path.join(process.cwd(), "data");

function filePath(collection: Collection) {
  return path.join(DATA_DIR, `${collection}.jsonl`);
}

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export function newId(prefix: string): string {
  const stamp = Date.now().toString(36);
  const rand = crypto.randomUUID().split("-")[0];
  return `${prefix}_${stamp}${rand}`;
}

export async function append(
  collection: Collection,
  record: Omit<Record_, "id" | "createdAt"> & { id?: string },
): Promise<Record_> {
  const full: Record_ = {
    id: record.id ?? newId(collection.slice(0, 3)),
    createdAt: new Date().toISOString(),
    ...record,
  };

  if (process.env.DATABASE_URL) {
    await appendPostgres(collection, full);
  } else {
    await ensureDir();
    await fs.appendFile(filePath(collection), JSON.stringify(full) + "\n", "utf8");
  }
  return full;
}

export async function readAll(collection: Collection): Promise<Record_[]> {
  if (process.env.DATABASE_URL) return readAllPostgres(collection);
  try {
    const raw = await fs.readFile(filePath(collection), "utf8");
    return raw
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line) as Record_)
      .reverse(); // newest first
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

export async function findById(
  collection: Collection,
  id: string,
): Promise<Record_ | undefined> {
  const all = await readAll(collection);
  return all.find((r) => r.id === id);
}

/* ------------------------------------------------------------------ *
 * Postgres driver — loaded lazily so `pg` is only required when used. *
 * ------------------------------------------------------------------ */

type PgClient = {
  query: (text: string, values?: unknown[]) => Promise<{ rows: { doc: Record_ }[] }>;
  end: () => Promise<void>;
};

async function withPg<T>(fn: (c: PgClient) => Promise<T>): Promise<T> {
  const { Client } = (await import("pg")) as unknown as {
    Client: new (c: { connectionString: string }) => PgClient & {
      connect: () => Promise<void>;
    };
  };
  const client = new Client({ connectionString: process.env.DATABASE_URL! });
  await client.connect();
  try {
    return await fn(client);
  } finally {
    await client.end();
  }
}

async function ensureTable(client: PgClient, collection: Collection) {
  await client.query(
    `create table if not exists ${tableName(collection)} (
       id text primary key,
       created_at timestamptz not null default now(),
       doc jsonb not null
     )`,
  );
}

function tableName(collection: Collection) {
  // Collection names are a closed union, so this is not user input.
  return `emmanusplus_${collection}`;
}

async function appendPostgres(collection: Collection, record: Record_) {
  await withPg(async (client) => {
    await ensureTable(client, collection);
    await client.query(
      `insert into ${tableName(collection)} (id, created_at, doc)
       values ($1, $2, $3) on conflict (id) do nothing`,
      [record.id, record.createdAt, JSON.stringify(record)],
    );
  });
}

async function readAllPostgres(collection: Collection): Promise<Record_[]> {
  return withPg(async (client) => {
    await ensureTable(client, collection);
    const res = await client.query(
      `select doc from ${tableName(collection)} order by created_at desc limit 5000`,
    );
    return res.rows.map((r) => r.doc);
  });
}
