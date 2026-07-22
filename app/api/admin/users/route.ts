import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  if (request.headers.get("x-admin-role") !== "super_admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const supabase = getSupabase();
  if (!supabase) return NextResponse.json([]);

  const { data } = await supabase
    .from("admin_users")
    .select("id, name, email, role, invite_accepted, created_at")
    .order("created_at");

  return NextResponse.json(data ?? []);
}
