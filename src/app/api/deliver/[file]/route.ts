import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { verifyAccessToken } from "@/lib/access-token";
import { isRevoked } from "@/lib/revocations";
import { getProductBySku } from "@/content/products";
import { append } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Protected file delivery.
 *
 * Serves product files from a directory OUTSIDE /public, so nothing is
 * reachable without a valid, unexpired, unrevoked token minted after payment.
 * Used for the lightly-protected product and as the pre-DRM fallback; once a
 * DRM provider is live, that provider serves its own protected files instead.
 */
const PROTECTED_DIR =
  process.env.PROTECTED_DIR ?? path.join(process.cwd(), "protected");

export async function GET(
  request: Request,
  context: { params: Promise<{ file: string }> },
) {
  const { file } = await context.params;
  const token = new URL(request.url).searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Access token required." }, { status: 401 });
  }

  const result = verifyAccessToken(token);
  if (!result.ok) {
    const status = result.reason === "expired" ? 410 : 403;
    return NextResponse.json(
      {
        error:
          result.reason === "expired"
            ? "This access link has expired. Contact support to have it reissued."
            : "This access link is not valid.",
      },
      { status },
    );
  }

  const { claims } = result;

  if (await isRevoked(claims.orderId)) {
    return NextResponse.json(
      { error: "Access for this order has been withdrawn." },
      { status: 403 },
    );
  }

  // The token names the SKU it was issued for; a token for one product can
  // never be used to pull a file belonging to another.
  const product = getProductBySku(claims.sku);
  const asset = product?.assets.find((a) => a.file === file);
  if (!product || !asset) {
    return NextResponse.json({ error: "File not found." }, { status: 404 });
  }

  // `asset.file` comes from the closed product catalogue, never the request.
  // basename() is belt-and-braces so no catalogue edit can ever introduce a
  // path segment that escapes the protected directory.
  const resolved = path.join(
    /* turbopackIgnore: true */ PROTECTED_DIR,
    path.basename(asset.file),
  );

  let data: Buffer;
  try {
    data = await fs.readFile(resolved);
  } catch {
    console.error(`[deliver] missing protected file: ${resolved}`);
    return NextResponse.json(
      { error: "This file is not available. Please contact support." },
      { status: 404 },
    );
  }

  // Download audit trail — supports redistribution investigations.
  await append("orders", {
    id: `download_${claims.orderId}_${Date.now()}`,
    type: "download",
    orderId: claims.orderId,
    email: claims.email,
    sku: claims.sku,
    file: asset.file,
  });

  return new NextResponse(new Uint8Array(data), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${sanitiseFilename(
        `${product.name} - ${asset.label}.pdf`,
      )}"`,
      "Content-Length": String(data.byteLength),
      "Cache-Control": "private, no-store, max-age=0",
      "X-Robots-Tag": "noindex, nofollow",
      // Purchaser identity travels with the file for traceability.
      "X-Licensed-To": claims.email,
      "X-Order-Reference": claims.orderId,
    },
  });
}

function sanitiseFilename(name: string): string {
  return name.replace(/[^\w\s.\-()]/g, "").slice(0, 120);
}
