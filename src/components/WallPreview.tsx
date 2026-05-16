"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Entry {
  id: number;
  nick: string;
  text: string;
  votes: number;
  created_at: string;
}

export default function WallPreview() {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    fetch("/api/wall")
      .then((r) => r.json())
      .then((d) => setEntries(d.entries?.slice(0, 4) || []));
  }, []);

  return (
    <section className="py-20 px-4" style={{ borderTop: "1px solid rgba(201,168,76,0.1)" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-sm tracking-[0.3em] uppercase mb-3"
            style={{ color: "rgba(201,168,76,0.6)", fontFamily: "Courier Prime, monospace" }}
          >
            — GALERIA POŚMIERTNA —
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "Playfair Display, serif", color: "#f0e6d0" }}
          >
            Wall of the Dead
          </h2>
          <div className="divider-obituary max-w-xs mx-auto mt-4" />
          <p
            className="mt-4 italic"
            style={{ color: "rgba(240,230,208,0.55)", fontFamily: "Crimson Text, serif" }}
          >
            Nekrologi wybrane przez potomnych. Tylko najlepsze zostają upamiędtnione.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {entries.map((entry, i) => (
            <div
              key={entry.id}
              className="p-6 relative overflow-hidden"
              style={{
                background: "rgba(26, 18, 8, 0.6)",
                border: "1px solid rgba(201, 168, 76, 0.15)",
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {/* Corner cross */}
              <div
                className="absolute top-3 right-4 text-2xl opacity-20 select-none"
                style={{ color: "#c9a84c" }}
              >
                ✝
              </div>

              <div className="flex items-start gap-3 mb-3">
                <div
                  className="text-xs px-2 py-1 shrink-0 mt-1"
                  style={{
                    background: "rgba(201,168,76,0.1)",
                    border: "1px solid rgba(201,168,76,0.3)",
                    color: "#c9a84c",
                    fontFamily: "Courier Prime, monospace",
                  }}
                >
                  #{i + 1}
                </div>
                <div>
                  <div
                    className="font-bold text-sm"
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

              <p
                className="text-sm leading-relaxed mb-4 italic"
                style={{ color: "rgba(240,230,208,0.75)", fontFamily: "Crimson Text, serif" }}
              >
                "{entry.text.length > 180 ? entry.text.slice(0, 180) + "…" : entry.text}"
              </p>

              <div className="flex items-center justify-between">
                <VoteButton entryId={entry.id} initialVotes={entry.votes} />
                <span
                  className="text-xs"
                  style={{ color: "rgba(240,230,208,0.3)", fontFamily: "Courier Prime, monospace" }}
                >
                  Niech spoczywa w pokoju
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/wall"
            className="btn-obituary inline-block py-3 px-8 text-sm"
          >
            ✝ Zobacz wszystkie nekrologi ✝
          </Link>
        </div>
      </div>
    </section>
  );
}

function VoteButton({ entryId, initialVotes }: { entryId: number; initialVotes: number }) {
  const [votes, setVotes] = useState(initialVotes);
  const [voted, setVoted] = useState(false);

  const vote = () => {
    if (voted) return;
    setVotes((v) => v + 1);
    setVoted(true);
  };

  return (
    <button
      onClick={vote}
      className="flex items-center gap-2 text-sm transition-all"
      style={{
        color: voted ? "#c9a84c" : "rgba(240,230,208,0.4)",
        fontFamily: "Courier Prime, monospace",
        cursor: voted ? "default" : "pointer",
      }}
    >
      <span>{voted ? "✝" : "🕯️"}</span>
      <span>{votes} Z GŁĘBOKIM ŻALEM</span>
    </button>
  );
}
