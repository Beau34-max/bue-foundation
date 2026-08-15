import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

// Parses text dates like "3 August 2026" or "Saturday, 1 August 2026"
function parseDate(text: string): Date | null {
  if (!text?.trim()) return null;
  const cleaned = text
    .replace(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),?\s*/i, "")
    .trim();
  const d = new Date(cleaned);
  return isNaN(d.getTime()) ? null : d;
}

export async function GET(request: NextRequest) {
  // Protect with CRON_SECRET when set (Vercel injects this automatically)
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const deactivated = { events: [] as string[], training: [] as string[] };

  // ── Events ────────────────────────────────────────────────────────────────
  const { data: events } = await supabase
    .from("events")
    .select("id, title, date_label")
    .eq("is_active", true);

  if (events) {
    for (const ev of events) {
      const d = parseDate(ev.date_label);
      if (d && d < today) {
        await supabase.from("events").update({ is_active: false }).eq("id", ev.id);
        deactivated.events.push(ev.title);
      }
    }
  }

  // ── Training programmes ───────────────────────────────────────────────────
  const { data: programmes } = await supabase
    .from("training_programmes")
    .select("id, title, next_start")
    .eq("is_active", true);

  if (programmes) {
    for (const p of programmes) {
      const d = parseDate(p.next_start);
      if (d && d < today) {
        await supabase.from("training_programmes").update({ is_active: false }).eq("id", p.id);
        deactivated.training.push(p.title);
      }
    }
  }

  const total = deactivated.events.length + deactivated.training.length;

  console.log(`[cron] deactivate-past: ${total} items deactivated`, deactivated);

  return NextResponse.json({
    success: true,
    ran_at: new Date().toISOString(),
    deactivated,
  });
}
