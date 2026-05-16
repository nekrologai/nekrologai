"use client";

import { useRef, useState } from "react";

interface Props {
  text: string;
  name?: string;
  onReset: () => void;
}

const TODAY = new Date().toLocaleDateString("pl-PL", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function ObitResult({ text, name, onReset }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [addToWall, setAddToWall] = useState(false);
  const [wallNick, setWallNick] = useState("");
  const [wallSaved, setWallSaved] = useState(false);

  const downloadImage = async () => {
    setDownloading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      if (!cardRef.current) return;
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#f5ead5",
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `nekrolog-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (e) {
      console.error(e);
    } finally {
      setDownloading(false);
    }
  };

  const shareText = `💀 Mój nekrolog (wygenerowany przez AI):\n\n${text}\n\n— nekrolog.ai #NekrologChallenge`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: "Mój nekrolog", text: shareText });
    } else {
      navigator.clipboard.writeText(shareText);
      alert("Skopiowano do schowka!");
    }
  };

  const handleAddToWall = async () => {
    try {
      await fetch("/api/wall", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, nick: wallNick || "Anonim" }),
      });
      setWallSaved(true);
    } catch {
      setWallSaved(true); // optimistic
    }
  };

  // Parse the obituary text into sections
  const sections = parseObituary(text);

  return (
    <div className="max-w-2xl mx-auto animate-fade-in-up">
      <div className="text-center mb-8">
        <p
          className="text-sm tracking-widest uppercase"
          style={{ color: "rgba(201,168,76,0.6)", fontFamily: "Courier Prime, monospace" }}
        >
          — OBITUARIUM —
        </p>
        <h2
          className="text-3xl font-bold mt-2"
          style={{ fontFamily: "Playfair Display, serif", color: "#f0e6d0" }}
        >
          Twój nekrolog jest gotowy
        </h2>
      </div>

      {/* THE OBITUARY CARD */}
      <div
        ref={cardRef}
        className="obituary-card obituary-border p-8 md:p-10 mb-8"
        style={{ minHeight: "400px" }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div
            className="text-xs tracking-[0.4em] uppercase mb-2"
            style={{ color: "#6b5030", fontFamily: "Courier Prime, monospace" }}
          >
            NEKROLOG ✦ {TODAY}
          </div>
          <div
            style={{
              borderTop: "3px double #1a1208",
              borderBottom: "3px double #1a1208",
              padding: "6px 0",
              margin: "8px 0",
            }}
          >
            <h2
              className="text-3xl md:text-4xl font-black"
              style={{ fontFamily: "Playfair Display, serif", color: "#1a1208" }}
            >
              {name ? name.toUpperCase() : "NIEZNANY WOJOWNIK"}
            </h2>
          </div>
          <div
            className="text-sm italic mt-1"
            style={{ color: "#5a4020", fontFamily: "Crimson Text, serif" }}
          >
            ✝ Odszedł/Odeszła tego pamiętnego dnia ✝
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid #1a1208",
            marginBottom: "1.5rem",
            opacity: 0.3,
          }}
        />

        {/* Main text */}
        <div
          className="text-base leading-relaxed"
          style={{
            fontFamily: "Crimson Text, serif",
            color: "#1a1208",
            fontSize: "1.05rem",
          }}
        >
          {sections.map((section, i) => (
            <div key={i} className="mb-4">
              {section.heading && (
                <p
                  className="font-bold uppercase text-xs tracking-widest mb-1"
                  style={{ color: "#3d2010", fontFamily: "Courier Prime, monospace" }}
                >
                  {section.heading}
                </p>
              )}
              <p className="text-justify">{section.text}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            borderTop: "1px solid #1a1208",
            marginTop: "1.5rem",
            paddingTop: "0.75rem",
            opacity: 0.5,
          }}
        />
        <div
          className="text-center text-xs mt-3"
          style={{ color: "#5a4020", fontFamily: "Courier Prime, monospace" }}
        >
          nekrolog.ai · #NekrologChallenge
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <button
          onClick={downloadImage}
          disabled={downloading}
          className="btn-obituary py-3 px-4 text-sm text-center"
        >
          {downloading ? "⏳" : "📥"} Pobierz obraz
        </button>
        <button
          onClick={handleShare}
          className="btn-obituary py-3 px-4 text-sm text-center"
        >
          📤 Udostępnij
        </button>
        <button
          onClick={() => setAddToWall((v) => !v)}
          className="btn-obituary py-3 px-4 text-sm text-center"
        >
          💀 Wall of Dead
        </button>
        <button
          onClick={onReset}
          className="btn-obituary py-3 px-4 text-sm text-center"
        >
          🔄 Nowy nekrolog
        </button>
      </div>

      {/* Wall opt-in */}
      {addToWall && !wallSaved && (
        <div
          className="p-6 mb-6 animate-fade-in-up"
          style={{
            background: "rgba(26,18,8,0.7)",
            border: "1px solid rgba(201,168,76,0.3)",
          }}
        >
          <p
            className="text-sm mb-3 italic"
            style={{ color: "rgba(240,230,208,0.7)", fontFamily: "Crimson Text, serif" }}
          >
            Twój nekrolog zostanie wystawiony na Ścianie Wiecznej Pamięci — widoczny
            dla wszystkich. Możesz podpisać się nickiem lub pozostać anonimem.
          </p>
          <input
            type="text"
            value={wallNick}
            onChange={(e) => setWallNick(e.target.value)}
            placeholder="Twój nick (lub zostaw puste = Anonim)"
            className="obituary-input w-full px-4 py-2 mb-3 rounded-none text-sm"
          />
          <button
            onClick={handleAddToWall}
            className="btn-primary w-full py-3 text-sm tracking-widest uppercase"
          >
            ✝ Wyślij na ścianę
          </button>
        </div>
      )}

      {wallSaved && (
        <p
          className="text-center italic mb-6 animate-fade-in-up"
          style={{ color: "#c9a84c", fontFamily: "Crimson Text, serif" }}
        >
          ✝ Nekrolog wystawiony na Ścianie Wiecznej Pamięci. Niech pamięć o Tobie
          trwa wiecznie.
        </p>
      )}

      {/* Share challenge */}
      <div
        className="p-5 text-center"
        style={{
          border: "1px dashed rgba(201,168,76,0.3)",
          background: "rgba(201,168,76,0.03)",
        }}
      >
        <p
          className="text-sm mb-1"
          style={{ color: "rgba(240,230,208,0.5)", fontFamily: "Crimson Text, serif" }}
        >
          Wyślij znajomemu i zrób mu nekrolog — bo na to zasługuje.
        </p>
        <p
          className="font-bold text-base"
          style={{ color: "#c9a84c", fontFamily: "Playfair Display, serif" }}
        >
          #NekrologChallenge
        </p>
      </div>
    </div>
  );
}

// Simple parser — tries to detect bold headings like "PRZYCZYNA ZGONU:" or "OSTATNIE SŁOWA:"
function parseObituary(text: string) {
  const lines = text.split("\n").filter((l) => l.trim());
  const sections: { heading?: string; text: string }[] = [];

  for (const line of lines) {
    const headingMatch = line.match(/^\*?\*?([A-ZŁŚŻŹĆĄĘ ]+:)\*?\*?\s*(.*)/);
    if (headingMatch) {
      sections.push({ heading: headingMatch[1], text: headingMatch[2] });
    } else {
      if (sections.length && !sections[sections.length - 1].heading) {
        sections[sections.length - 1].text += " " + line;
      } else {
        sections.push({ text: line });
      }
    }
  }

  return sections;
}
