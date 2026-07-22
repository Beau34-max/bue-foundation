import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET() {
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json([]);
  const { data } = await supabase.from("jobs").select("*").eq("is_active", true).order("created_at");
  return NextResponse.json(data ?? []);
}
