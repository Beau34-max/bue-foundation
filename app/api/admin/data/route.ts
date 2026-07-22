import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ error: "Database not configured" }, { status: 500 });

  const { type, data } = await request.json();
  if (!type || !data) return NextResponse.json({ error: "Missing type or data" }, { status: 400 });

  const { error } = await supabase.from("submissions").insert({ type, data });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}

export async function GET(request: NextRequest) {
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json([]);

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const limit = Number(searchParams.get("limit") ?? "5");

  let query = supabase.from("submissions").select("*").order("created_at", { ascending: false }).limit(limit);
  if (type) query = query.eq("type", type);

  const { data } = await query;
  return NextResponse.json(data ?? []);
}
