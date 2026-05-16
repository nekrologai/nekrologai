import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function POST(req: NextRequest) {
  try {
    const { text, nick } = await req.json();
    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ ok: true, note: "demo" });
    }

    await supabase.from("wall_of_dead").insert({
      text,
      nick: nick || "Anonim",
      votes: 0,
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Błąd zapisu" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const supabase = getSupabase();
    if (!supabase) {
      // Return demo data
      return NextResponse.json({ entries: DEMO_ENTRIES });
    }

    const { data, error } = await supabase
      .from("wall_of_dead")
      .select("*")
      .order("votes", { ascending: false })
      .limit(20);

    if (error) throw error;
    return NextResponse.json({ entries: data });
  } catch {
    return NextResponse.json({ entries: DEMO_ENTRIES });
  }
}

const DEMO_ENTRIES = [
  {
    id: 1,
    nick: "Wieczny Prokrastynator",
    text: "Odszedł otoczony stosami nieotwartych maili i niedokończonych projektów. Ostatnie słowa brzmiały: 'Od jutra zaczynam nowe życie.' Zapamiętany zostanie jako człowiek, który zawsze miał plan.",
    votes: 247,
    created_at: "2024-01-15",
  },
  {
    id: 2,
    nick: "Anonim",
    text: "Przyczyna zgonu: Pięć godzin reelsów bez mrugania. Lekarz stwierdził, że scroll był szybszy niż jego refleks życiowy.",
    votes: 183,
    created_at: "2024-01-14",
  },
  {
    id: 3,
    nick: "Grzesiek z Krakówa",
    text: "Ostatnia wieczerza złożona z kebaba o podejrzanym pochodzeniu okazała się jego ostatnim wielkim wyborem. Zapamiętany jako człowiek z wizją — nawet jeśli dotyczyła wyłącznie menu.",
    votes: 156,
    created_at: "2024-01-13",
  },
  {
    id: 4,
    nick: "Student Wieczny",
    text: "Odszedł w trakcie sesji, nie zdąwszy oddać ostatniego kolokwium. Dziekan potwierdził, że i tak by nie zdał. RIP.",
    votes: 142,
    created_at: "2024-01-12",
  },
];
