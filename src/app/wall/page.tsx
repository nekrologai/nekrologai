"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

type SortMode = "votes" | "newest" | "saddest";

interface Entry {
  id: number;
  nick: string;
  text: string;
  votes: number;
  created_at: string;
}

export default function WallPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [sort, setSort] = useState<SortMode>("votes");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/wall")
      .then((r) => r.json())
      .then((d) => {
        setEntries(d.entries || []);
        setLoading(false);
      });
  }, []);

  const sorted = [...entries].sort((a, b) => {
    if (sort === "votes") return b.votes - a.votes;
    if (sort === "newest")
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    return b.text.length - a.text.length; // "saddest" = longest
  });

  return (
    <main>
      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <p
          className="text-sm tracking-[0.3em] uppercase mb-4"
          style={{ color: "rgba(201,168,76,0.6)", fontFamily: "Courier Prime, monospace" }}
        >
          — GALERIA POŚMIERTNA —
        </p>
        <h1
          className="text-5xl md:text-6xl font-black mb-4"
          style={{ fontFamily: "Playfair Display, serif", color: "#f0e6d0" }}
        >
          Wall of the Dead
        </h1>
        <div className="divider-obituary max-w-xs mx-auto mb-6" />
        <p
          className="text-xl italic"
          style={{ color: "rgba(240,230,208,0.6)", fontFamily: "Crimson Text, serif" }}
        >
          Nekrologi, które przetrwały wieczność. Lub przynajmniej kilka dni.
        </p>
      </section>

      {/* Sort tabs */}
      <div className="flex justify-center gap-4 mb-10 px-4">
        {(
          [
            ["votes", "Najbardziej żałowane"],
            ["newest", "Najnowsze odejścia"],
            ["saddest", "Najbardziej patetyczne"],
          ] as [SortMode, string][]
        ).map(([mode, label]) => (
          <button
            key={mode}
            onClick={() => setSort(mode)}
            className="py-2 px-4 text-sm transition-all"
            style={{
              border: `1px solid ${sort === mode ? "#c9a84c" : "rgba(201,168,76,0.2)"}`,
              background: sort === mode ? "rgba(201,168,76,0.1)" : "transparent",
              color: sort === mode ? "#c9a84c" : "rgba(240,230,208,0.5)",
              fontFamily: "Courier Prime, monospace",
              cursor: "pointer",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Entries */}
      <div className="max-w-4xl mx-auto px-4 pb-20">
        {loading ? (
          <div className="text-center py-20">
            <div
              className="text-5xl animate-pulse mb-4 select-none"
              style={{ color: "#c9a84c" }}
            >
              ✝
            </div>
            <p
              className="italic"
              style={{ color: "rgba(240,230,208,0.5)", fontFamily: "Crimson Text, serif" }}
            >
              Ładowanie ściany wiecznej pamięci…
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sorted.map((entry, i) => (
              <div
                key={entry.id}
                className="p-6"
                style={{
                  background: "rgba(26,18,8,0.6)",
                  border: "1px solid rgba(201,168,76,0.15)",
                }}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs px-2 py-1"
                      style={{
                        background: "rgba(201,168,76,0.08)",
                        border: "1px solid rgba(201,168,76,0.2)",
                        color: "#c9a84c",
                        fontFamily: "Courier Prime, monospace",
                      }}
                    >
                      #{i + 1}
                    </span>
                    <div>
                      <div
                        className="font-bold"
                        style={{ color: "#c9a84c", fontFamily: "Playfair Display, serif" }}
                      >
                        {entry.nick}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: "rgba(240,230,208,0.3)", fontFamily: "Courier Prime, monospace" }}
                      >
                        {new Date(entry.created_at).toLocaleDateString("pl-PL")}
                      </div>
                    </div>
                  </div>
                  <div
                    className="text-right text-xs"
                    style={{ color: "rgba(201,168,76,0.6)", fontFamily: "Courier Prime, monospace" }}
                  >
                    🕯️ {entry.votes} żałobników
                  </div>
                </div>
                <p
                  className="leading-relaxed italic"
                  style={{ color: "rgba(240,230,208,0.75)", fontFamily: "Crimson Text, serif" }}
                >
                  {entry.text}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/#generator" className="btn-obituary inline-block py-3 px-8 text-sm">
            ✝ Dołącz do ściany ✝
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
