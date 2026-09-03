import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { readAll, type Collection } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COLLECTIONS: Collection[] = ["orders", "contact", "corporate", "feedback"];

/**
 * CSV export of stored records, for opening directly in Excel.
 * Feedback and enquiries are managed manually in Phase 1, so a clean export
 * is the deliverable rather than a dashboard.
 */
export async function GET(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Not authorised." }, { status: 401 });
  }

  const requested = new URL(request.url).searchParams.get("collection") ?? "";
  if (!COLLECTIONS.includes(requested as Collection)) {
    return NextResponse.json({ error: "Unknown collection." }, { status: 400 });
  }
  const collection = requested as Collection;

  const rows = await readAll(collection);
  const csv = toCsv(rows);
  const date = new Date().toISOString().slice(0, 10);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="emmanusplus-${collection}-${date}.csv"`,
      "Cache-Control": "private, no-store",
    },
  });
}

function toCsv(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return "No records\n";

  // Union of keys across all rows, so a later field never silently drops out.
  const headers = [...new Set(rows.flatMap((r) => Object.keys(r)))];
  const escape = (value: unknown) => {
    if (value === null || value === undefined) return "";
    const str = typeof value === "object" ? JSON.stringify(value) : String(value);
    // Prefix formula-triggering characters so Excel treats them as text.
    const safe = /^[=+\-@\t\r]/.test(str) ? `'${str}` : str;
    return `"${safe.replace(/"/g, '""')}"`;
  };

  // BOM so Excel opens UTF-8 (and the ™ symbol) correctly.
  return (
    "﻿" +
    [headers.join(","), ...rows.map((r) => headers.map((h) => escape(r[h])).join(","))].join(
      "\r\n",
    ) +
    "\r\n"
  );
}
