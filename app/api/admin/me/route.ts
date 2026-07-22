import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const userId = request.headers.get("x-admin-user-id");
  const role = request.headers.get("x-admin-role");

  if (!userId || !role) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ id: userId, role, name: "Admin", email: "" });
  }

  const { data: user } = await supabase
    .from("admin_users")
    .select("id, name, email, role")
    .eq("id", userId)
    .single();

  return NextResponse.json(user ?? { id: userId, role, name: "Admin", email: "" });
}
