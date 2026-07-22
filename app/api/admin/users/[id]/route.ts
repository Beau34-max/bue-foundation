import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (request.headers.get("x-admin-role") !== "super_admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const currentUserId = request.headers.get("x-admin-user-id");

  if (id === currentUserId) {
    return NextResponse.json({ error: "You cannot remove your own account" }, { status: 400 });
  }

  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ error: "Database not configured" }, { status: 500 });

  await supabase.from("admin_users").delete().eq("id", id);
  return NextResponse.json({ ok: true });
}
