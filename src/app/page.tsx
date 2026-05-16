"use client";

import { useState } from "react";
import GeneratorForm from "@/components/GeneratorForm";
import ObitResult from "@/components/ObitResult";
import WallPreview from "@/components/WallPreview";
import DonateSection from "@/components/DonateSection";
import Footer from "@/components/Footer";
import ExampleObits from "@/components/ExampleObits";

export default function HomePage() {
  const [result, setResult] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    name?: string;
    activity: string;
    food: string;
    mood: string;
    style: string;
    length: string;
  } | null>(null);

  const scrollToForm = () => {
    document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen">
      {/* ==================== HERO ==================== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-20">
        {/* Background vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, #1c1610 0%, #0a0806 70%)",
          }}
        />

        {/* Decorative corners */}
        <div className="absolute top-8 left-8 text-obituary-gold opacity-30 text-4xl font-serif select-none">
          ✝
        </div>
        <div className="absolute top-8 right-8 text-obituary-gold opacity-30 text-4xl font-serif select-none">
          ✝
        </div>
        <div className="absolute bottom-8 left-8 text-obituary-gold opacity-30 text-4xl font-serif select-none">
          ✝
        </div>
        <div className="absolute bottom-8 right-8 text-obituary-gold opacity-30 text-4xl font-serif select-none">
          ✝
        </div>

        {/* Top rule */}
        <div className="relative z-10 w-full max-w-3xl mb-8 text-center">
          <div
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "rgba(201,168,76,0.6)", fontFamily: "Courier Prime, monospace" }}
          >
            NEKROLOG.AI — WYDANIE CODZIENNE
          </div>
          <div className="divider-obituary" />
        </div>

        {/* Main headline */}
        <div className="relative z-10 text-center max-w-4xl animate-fade-in-up">
          <p
            className="text-lg mb-4 italic animate-flicker"
            style={{ color: "rgba(240,230,208,0.6)", fontFamily: "Crimson Text, serif" }}
          >
            Z głębokim żalem zawiadamiamy…
          </p>

          <h1
            className="text-5xl md:text-7xl font-black mb-6 leading-tight"
            style={{
              fontFamily: "Playfair Display, serif",
              color: "#f0e6d0",
              textShadow: "0 0 40px rgba(201,168,76,0.2)",
            }}
          >
            Twój dzisiejszy dzień
            <br />
            <span style={{ color: "#c9a84c" }}>opisany jak ostatnia</span>
            <br />
            strona Twojego życia
          </h1>

          <div className="divider-obituary max-w-md mx-auto" />

          <p
            className="text-xl md:text-2xl italic mt-6 mb-10"
            style={{ color: "rgba(240,230,208,0.75)", fontFamily: "Crimson Text, serif" }}
          >
            Opisz swój dzień w 3 zdaniach.
            <br />
            AI napisze Twój nekrolog — patetyczny, uroczysty i kompletnie absurdalny.
          </p>

          <button
            onClick={scrollToForm}
            className="btn-primary text-lg px-10 py-4 rounded-none inline-block"
            style={{ fontSize: "1.1rem", letterSpacing: "0.15em" }}
          >
            ✝ WYGENERUJ SWÓJ NEKROLOG ✝
          </button>

          <p
            className="mt-4 text-sm"
            style={{ color: "rgba(240,230,208,0.35)", fontFamily: "Courier Prime, monospace" }}
          >
            bezpłatny · absurdalny · idealny na story
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div
            className="text-2xl opacity-30 select-none"
            style={{ color: "#c9a84c" }}
          >
            ↓
          </div>
        </div>
      </section>

      {/* ==================== EXAMPLE OBITS ==================== */}
      <ExampleObits />

      {/* ==================== GENERATOR FORM ==================== */}
      <section id="generator" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-sm tracking-[0.3em] uppercase mb-3"
              style={{ color: "rgba(201,168,76,0.6)", fontFamily: "Courier Prime, monospace" }}
            >
              — REDAKTOR NACZELNY ZAŚWIATÓW —
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "Playfair Display, serif", color: "#f0e6d0" }}
            >
              Napisz swój nekrolog
            </h2>
            <div className="divider-obituary max-w-xs mx-auto" />
            <p
              className="mt-4 text-lg italic"
              style={{ color: "rgba(240,230,208,0.6)", fontFamily: "Crimson Text, serif" }}
            >
              Uzupełnij formularz. Resztą zajmie się wieczność.
            </p>
          </div>

          <GeneratorForm
            onResult={(text, data) => {
              setResult(text);
              setFormData(data);
              setTimeout(() => {
                document.getElementById("result")?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
          />
        </div>
      </section>

      {/* ==================== RESULT ==================== */}
      {result && formData && (
        <section id="result" className="py-10 px-4">
          <ObitResult
            text={result}
            name={formData.name}
            onReset={() => {
              setResult(null);
              setFormData(null);
              scrollToForm();
            }}
          />
        </section>
      )}

      {/* ==================== WALL OF THE DEAD ==================== */}
      <WallPreview />

      {/* ==================== DONATE ==================== */}
      <DonateSection />

      {/* ==================== FOOTER ==================== */}
      <Footer />
    </main>
  );
}
