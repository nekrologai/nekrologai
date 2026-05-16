"use client";

import { useState } from "react";

const STYLES = [
  { value: "patetyczny", label: "🎭 Patetyczny" },
  { value: "sebix", label: "😤 Sebix" },
  { value: "korpo", label: "💼 Korpo" },
  { value: "poetycki", label: "🌹 Poetycki" },
  { value: "brainrot", label: "🧠 TikTok Brainrot" },
  { value: "wujek", label: "🍺 Polski Wujek" },
  { value: "filozoficzny", label: "🤔 Filozoficzny" },
  { value: "gracz", label: "🎮 Gracz" },
  { value: "student", label: "📚 Student po sesji" },
  { value: "klasyczny", label: "📰 Klasyczny prasowy" },
];

const LENGTHS = [
  { value: "krotki", label: "Krótki" },
  { value: "standardowy", label: "Standardowy" },
  { value: "patetyczny", label: "Bardzo patetyczny" },
];

interface FormData {
  name?: string;
  activity: string;
  food: string;
  mood: string;
  style: string;
  length: string;
}

interface Props {
  onResult: (text: string, data: FormData) => void;
  friendMode?: boolean;
}

const LOADING_MESSAGES = [
  "Zbieranie ostatnich wspomnień…",
  "Kontaktowanie rodziny i znajomych…",
  "Redagowanie epitafium…",
  "Konsultacja z redaktorem naczelnym zaświatów…",
  "Dobór odpowiedniej czcionki żałobnej…",
  "Obliczanie głębi tragedii…",
  "Finalizowanie nekrologu…",
];

export default function GeneratorForm({ onResult, friendMode = false }: Props) {
  const [form, setForm] = useState<FormData>({
    name: "",
    activity: "",
    food: "",
    mood: "",
    style: "klasyczny",
    length: "standardowy",
  });
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.activity || !form.food || !form.mood) {
      setError("Wypełnij wszystkie trzy pola — wieczność na Cię czeka.");
      return;
    }
    setError(null);
    setLoading(true);

    // Cycle through loading messages
    let msgIdx = 0;
    const msgInterval = setInterval(() => {
      msgIdx = (msgIdx + 1) % LOADING_MESSAGES.length;
      setLoadingMsg(msgIdx);
    }, 900);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Błąd generowania");
      onResult(data.text, form);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Coś poszło nie tak");
    } finally {
      clearInterval(msgInterval);
      setLoading(false);
    }
  };

  return (
    <div
      className="rounded-none p-8 md:p-10"
      style={{
        background: "rgba(26, 18, 8, 0.6)",
        border: "1px solid rgba(201, 168, 76, 0.2)",
      }}
    >
      {/* Name field (optional) */}
      <div className="mb-6">
        <label
          className="block text-sm mb-2 tracking-widest uppercase"
          style={{ color: "rgba(201,168,76,0.7)", fontFamily: "Courier Prime, monospace" }}
        >
          {friendMode ? "Imię i wiek znajomego (opcjonalnie)" : "Twoje imię (opcjonalnie)"}
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder={friendMode ? "np. Kacper, 28 lat" : "np. Marek"}
          className="obituary-input w-full px-4 py-3 rounded-none"
        />
      </div>

      {/* Activity */}
      <div className="mb-6">
        <label
          className="block text-sm mb-2 tracking-widest uppercase"
          style={{ color: "rgba(201,168,76,0.7)", fontFamily: "Courier Prime, monospace" }}
        >
          {friendMode ? "Co znajomy dziś robił?" : "Co dziś robiłeś?"}
        </label>
        <textarea
          name="activity"
          value={form.activity}
          onChange={handleChange}
          rows={3}
          placeholder="Przewijałem TikToka i ignorowałem wszystkie obowiązki dorosłego człowieka…"
          className="obituary-input w-full px-4 py-3 rounded-none"
        />
      </div>

      {/* Food */}
      <div className="mb-6">
        <label
          className="block text-sm mb-2 tracking-widest uppercase"
          style={{ color: "rgba(201,168,76,0.7)", fontFamily: "Courier Prime, monospace" }}
        >
          {friendMode ? "Ostatnia wieczerza znajomego?" : "Twoja ostatnia wieczerza?"}
        </label>
        <input
          type="text"
          name="food"
          value={form.food}
          onChange={handleChange}
          placeholder="Zimna pizza i energetyk o smaku dzieciństwa…"
          className="obituary-input w-full px-4 py-3 rounded-none"
        />
      </div>

      {/* Mood */}
      <div className="mb-8">
        <label
          className="block text-sm mb-2 tracking-widest uppercase"
          style={{ color: "rgba(201,168,76,0.7)", fontFamily: "Courier Prime, monospace" }}
        >
          {friendMode ? "Dominujący stan ducha znajomego?" : "Dominujący stan ducha?"}
        </label>
        <input
          type="text"
          name="mood"
          value={form.mood}
          onChange={handleChange}
          placeholder="Zmęczony życiem, ale stabilnie. Egzystencjalny spokój prokrastynatora."
          className="obituary-input w-full px-4 py-3 rounded-none"
        />
      </div>

      {/* Style + Length */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <label
            className="block text-sm mb-2 tracking-widest uppercase"
            style={{ color: "rgba(201,168,76,0.7)", fontFamily: "Courier Prime, monospace" }}
          >
            Styl
          </label>
          <select
            name="style"
            value={form.style}
            onChange={handleChange}
            className="obituary-input w-full px-4 py-3 rounded-none"
          >
            {STYLES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            className="block text-sm mb-2 tracking-widest uppercase"
            style={{ color: "rgba(201,168,76,0.7)", fontFamily: "Courier Prime, monospace" }}
          >
            Długość
          </label>
          <select
            name="length"
            value={form.length}
            onChange={handleChange}
            className="obituary-input w-full px-4 py-3 rounded-none"
          >
            {LENGTHS.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p
          className="mb-4 text-sm text-center italic"
          style={{ color: "#c9a84c" }}
        >
          ✝ {error}
        </p>
      )}

      {/* Loading */}
      {loading ? (
        <div className="text-center py-6">
          <div
            className="text-5xl mb-4 animate-pulse select-none"
            style={{ color: "#c9a84c" }}
          >
            ✝
          </div>
          <p
            className="text-lg italic cursor-blink"
            style={{ color: "rgba(240,230,208,0.7)", fontFamily: "Crimson Text, serif" }}
          >
            {LOADING_MESSAGES[loadingMsg]}
          </p>
        </div>
      ) : (
        <button
          onClick={handleSubmit}
          className="btn-primary w-full py-4 text-lg tracking-widest uppercase rounded-none"
        >
          ✝ Napisz mój nekrolog ✝
        </button>
      )}
    </div>
  );
}
