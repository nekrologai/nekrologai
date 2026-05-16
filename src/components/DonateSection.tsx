"use client";

import { useState } from "react";

const QUICK_AMOUNTS = [
  { value: 3.14, label: "3,14 zł", note: "π złotych — bo życie jest irracjonalne" },
  { value: 6.66, label: "6,66 zł", note: "Symboliczna ofiara dla zaświatów" },
  { value: 13.37, label: "13,37 zł", note: "LEET — dla tych co rozumieją" },
  { value: 33, label: "33 zł", note: "Wieczór stypy w internecie" },
  { value: 69.69, label: "69,69 zł", note: "hehe" },
  { value: 420, label: "420 zł", note: "Krypta premium z klimatyzacją" },
];

const SLIDER_DESCRIPTIONS: [number, string][] = [
  [2, "Znicz z marketu (kopci, ale świeci)"],
  [10, "Skromna wiązanka od dalekich znajomych"],
  [30, "Przyzwoity wieniec z szarfą"],
  [60, "Marmurowa tabliczka z imieniem"],
  [100, "Grobowiec z podświetleniem LED"],
  [300, "Mausoleum w stylu napoleońskim"],
  [1000, "Krypta w Metaversum + orkiestra dęta"],
];

const RECENT_DONORS = [
  { nick: "Anonim", amount: 3.83, note: "Na waciki dla ducha" },
  { nick: "Doomscroller z Wrocławia", amount: 2.13, note: "Wszystko co zostało po kebabie" },
  { nick: "Student Wieczny", amount: 13.37, note: "Z ostatniej stypendii" },
  { nick: "Procrastinator Premium", amount: 21.37, note: "Obiecał wpłacić miesiąc temu" },
  { nick: "Anonim", amount: 6.66, note: "Niech serwer żyje" },
];

function getSliderDesc(value: number): string {
  for (let i = SLIDER_DESCRIPTIONS.length - 1; i >= 0; i--) {
    if (value >= SLIDER_DESCRIPTIONS[i][0]) return SLIDER_DESCRIPTIONS[i][1];
  }
  return SLIDER_DESCRIPTIONS[0][1];
}

export default function DonateSection() {
  const [amount, setAmount] = useState(33);
  const [custom, setCustom] = useState("");
  const [donating, setDonating] = useState(false);
  const [done, setDone] = useState(false);

  const finalAmount = custom ? parseFloat(custom) : amount;

  const handleDonate = async () => {
    if (!finalAmount || finalAmount < 1) return;
    setDonating(true);
    // Simulate / redirect to payment
    setTimeout(() => {
      setDone(true);
      setDonating(false);
    }, 1500);
  };

  return (
    <section
      className="py-20 px-4"
      style={{ borderTop: "1px solid rgba(201,168,76,0.1)", background: "rgba(10,8,6,0.8)" }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-sm tracking-[0.3em] uppercase mb-3"
            style={{ color: "rgba(201,168,76,0.6)", fontFamily: "Courier Prime, monospace" }}
          >
            — TESTAMENT CYFROWY —
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "Playfair Display, serif", color: "#f0e6d0" }}
          >
            Fundusz Życia Po Śmierci
          </h2>
          <div className="divider-obituary max-w-xs mx-auto" />
        </div>

        {/* Patetyczny wstęp */}
        <div
          className="p-8 mb-10 text-center relative"
          style={{
            border: "2px solid rgba(201,168,76,0.2)",
            background: "rgba(26,18,8,0.5)",
            fontFamily: "Crimson Text, serif",
          }}
        >
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 text-3xl opacity-20 select-none"
            style={{ color: "#c9a84c" }}
          >
            ✝
          </div>
          <p
            className="text-xl italic leading-relaxed mt-6"
            style={{ color: "rgba(240,230,208,0.8)" }}
          >
            Z głębokim żalem zawiadamiamy, że Nekrolog.AI może wkrótce odejść z powodu
            braku funduszy na serwery i tokeny AI…
          </p>
          <p
            className="text-base mt-4 leading-relaxed"
            style={{ color: "rgba(240,230,208,0.55)" }}
          >
            Każda złotówka oddala nieuchronny koniec hostingu. Każda wpłata to kolejny dzień
            życia dla tego absurdalnego projektu. Serwer dziękuje. Redakcja nekrologa
            dziękuje. Duch internetu dziękuje.
          </p>
        </div>

        {/* Donation widget */}
        {done ? (
          <div
            className="p-8 text-center animate-fade-in-up"
            style={{ border: "1px solid rgba(201,168,76,0.4)", background: "rgba(26,18,8,0.7)" }}
          >
            <div className="text-5xl mb-4">✝</div>
            <h3
              className="text-2xl font-bold mb-3"
              style={{ fontFamily: "Playfair Display, serif", color: "#c9a84c" }}
            >
              Ofiara przyjęta przez zaświaty
            </h3>
            <p
              className="italic"
              style={{ color: "rgba(240,230,208,0.7)", fontFamily: "Crimson Text, serif" }}
            >
              Twój wkład w {finalAmount.toFixed(2)} zł zostanie uwieczniony na Ścianie Wiecznej Pamięci.
              Serwer przeżyje kolejny dzień. Nekrolog.AI dziękuje z głębi cyfrowych zaświatów.
            </p>
          </div>
        ) : (
          <div
            className="p-8"
            style={{ border: "1px solid rgba(201,168,76,0.2)", background: "rgba(26,18,8,0.5)" }}
          >
            {/* Quick amounts */}
            <p
              className="text-xs tracking-widest uppercase mb-4"
              style={{ color: "rgba(201,168,76,0.6)", fontFamily: "Courier Prime, monospace" }}
            >
              Szybka ofiara
            </p>
            <div className="grid grid-cols-3 gap-2 mb-8">
              {QUICK_AMOUNTS.map((qa) => (
                <button
                  key={qa.value}
                  onClick={() => { setAmount(qa.value); setCustom(""); }}
                  title={qa.note}
                  className="py-2 px-3 text-sm transition-all"
                  style={{
                    border: `1px solid ${amount === qa.value && !custom ? "#c9a84c" : "rgba(201,168,76,0.2)"}`,
                    background: amount === qa.value && !custom ? "rgba(201,168,76,0.15)" : "transparent",
                    color: amount === qa.value && !custom ? "#c9a84c" : "rgba(240,230,208,0.6)",
                    fontFamily: "Crimson Text, serif",
                    cursor: "pointer",
                  }}
                >
                  {qa.label}
                </button>
              ))}
            </div>

            {/* Slider */}
            <p
              className="text-xs tracking-widest uppercase mb-3"
              style={{ color: "rgba(201,168,76,0.6)", fontFamily: "Courier Prime, monospace" }}
            >
              Lub dostosuj kwotę
            </p>
            <input
              type="range"
              min={2}
              max={1000}
              value={custom ? 33 : amount}
              onChange={(e) => { setAmount(Number(e.target.value)); setCustom(""); }}
              className="w-full mb-2"
            />
            <div className="flex justify-between items-center mb-4">
              <span
                className="text-2xl font-bold"
                style={{ color: "#c9a84c", fontFamily: "Playfair Display, serif" }}
              >
                {custom ? `${parseFloat(custom).toFixed(2)} zł` : `${amount} zł`}
              </span>
              <span
                className="text-sm italic text-right max-w-[60%]"
                style={{ color: "rgba(240,230,208,0.5)", fontFamily: "Crimson Text, serif" }}
              >
                {getSliderDesc(custom ? parseFloat(custom) : amount)}
              </span>
            </div>

            {/* Custom amount */}
            <input
              type="number"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="Własna kwota (co do grosza, np. 3.83)"
              className="obituary-input w-full px-4 py-3 mb-6 rounded-none text-sm"
              step="0.01"
              min="1"
            />

            <button
              onClick={handleDonate}
              disabled={donating}
              className="btn-primary w-full py-4 text-lg tracking-wider uppercase rounded-none"
            >
              {donating ? "⏳ Przetwarzanie ostatniej woli…" : `✝ Wpłać ${finalAmount.toFixed(2)} zł ✝`}
            </button>

            <p
              className="text-xs text-center mt-3 italic"
              style={{ color: "rgba(240,230,208,0.3)", fontFamily: "Crimson Text, serif" }}
            >
              Bezpieczna płatność. Twoje dane chronione jak tajemnica konfesjonału.
            </p>
          </div>
        )}

        {/* Recent donors */}
        <div className="mt-10">
          <p
            className="text-xs tracking-widest uppercase mb-4 text-center"
            style={{ color: "rgba(201,168,76,0.5)", fontFamily: "Courier Prime, monospace" }}
          >
            — Ostatnie pożegnania —
          </p>
          <div className="space-y-2">
            {RECENT_DONORS.map((d, i) => (
              <div
                key={i}
                className="flex justify-between items-center py-2 px-4 text-sm"
                style={{ borderBottom: "1px solid rgba(201,168,76,0.05)" }}
              >
                <span style={{ color: "rgba(240,230,208,0.6)", fontFamily: "Crimson Text, serif" }}>
                  <span style={{ color: "#c9a84c" }}>+{d.amount.toFixed(2)} zł</span> od{" "}
                  <em>{d.nick}</em>
                </span>
                <span
                  className="text-xs italic"
                  style={{ color: "rgba(240,230,208,0.3)", fontFamily: "Crimson Text, serif" }}
                >
                  {d.note}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
