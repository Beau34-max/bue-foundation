import { NextRequest, NextResponse } from "next/server";

async function computeHmac(secret: string, data: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw", enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false, ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, "0")).join("");
}

// Cookie format: userId.role.hmac
// UUIDs use hyphens only; roles use underscores only — dots are safe separators
function parseToken(token: string): { userId: string; role: string; mac: string } | null {
  const lastDot = token.lastIndexOf(".");
  if (lastDot < 0) return null;
  const mac = token.slice(lastDot + 1);
  const rest = token.slice(0, lastDot);
  const secondLastDot = rest.lastIndexOf(".");
  if (secondLastDot < 0) return null;
  const role = rest.slice(secondLastDot + 1);
  const userId = rest.slice(0, secondLastDot);
  if (!userId || !role || !mac) return null;
  return { userId, role, mac };
}

const PUBLIC = new Set(["/admin/login", "/admin/setup", "/admin/accept-invite"]);
const PUBLIC_API = new Set(["/api/admin/login", "/api/admin/setup", "/api/admin/accept-invite"]);

function isPublic(pathname: string): boolean {
  for (const p of PUBLIC) if (pathname === p || pathname.startsWith(p + "/")) return true;
  for (const p of PUBLIC_API) if (pathname === p || pathname.startsWith(p + "/")) return true;
  return false;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isPublic(pathname) && (pathname.startsWith("/admin") || pathname.startsWith("/api/admin"))) {
    const token = request.cookies.get("admin_token")?.value;
    const secret = process.env.ADMIN_SECRET ?? "buef-fallback-secret";

    let userId: string | null = null;
    let role: string | null = null;

    if (token) {
      const parsed = parseToken(token);
      if (parsed) {
        const expected = await computeHmac(secret, `${parsed.userId}.${parsed.role}`);
        if (expected === parsed.mac) {
          userId = parsed.userId;
          role = parsed.role;
        }
      }
    }

    if (!userId || !role) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Forward role and userId to API route handlers via request headers
    const headers = new Headers(request.headers);
    headers.set("x-admin-role", role);
    headers.set("x-admin-user-id", userId);
    return NextResponse.next({ request: { headers } });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
