import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

const ALLOWED_TYPES = [
  "career_application",
  "scholarship_application",
  "enterprise_application",
  "event_registration",
  "training_registration",
  "programme_application",
  "volunteer_application",
  "contact_message",
  "event_attendance",
  "grant_received",
  "beneficiary_supported",
  "asset",
];

export async function POST(request: NextRequest) {
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ error: "Database not configured" }, { status: 500 });

  try {
    const body = await request.json();
    const { type, name, email, phone, data } = body as {
      type: string; name: string; email?: string; phone?: string; data?: Record<string, unknown>;
    };

    if (!type || !ALLOWED_TYPES.includes(type)) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }
    if (!name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const { data: row, error } = await supabase
      .from("submissions")
      .insert({
        type,
        name: name.trim(),
        email: email?.trim() || null,
        phone: phone?.trim() || null,
        data: { ...data, manually_added: true },
      })
      .select("id, created_at, type, name, email, phone, data")
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(row);
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ error: "Database not configured" }, { status: 500 });

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const limit = Math.min(Number(searchParams.get("limit") ?? "100"), 500);

  let query = supabase
    .from("submissions")
    .select("id, created_at, type, name, email, phone, data")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (type && ALLOWED_TYPES.includes(type)) {
    query = query.eq("type", type);
  } else if (!type) {
    query = query.in("type", ALLOWED_TYPES);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data ?? []);
}
