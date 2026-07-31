import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET() {
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json([]);
  const { data } = await supabase
    .from("volunteer_roles")
    .select("*")
    .order("is_active", { ascending: false })
    .order("created_at", { ascending: true });
  return NextResponse.json(data ?? []);
}
