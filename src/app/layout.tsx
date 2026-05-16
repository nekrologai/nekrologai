import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nekrolog.AI — Twój dzisiejszy dzień, opisany jak ostatnia strona życia",
  description:
    "Opisz swój dzień w 3 zdaniach. Sztuczna inteligencja napisze Twój nekrolog — patetyczny, uroczysty i kompletnie absurdalny.",
  keywords: ["nekrolog", "AI", "humor", "generator", "satyryczny", "mem"],
  openGraph: {
    title: "Nekrolog.AI",
    description: "Opisz swój dzień. AI napisze Twój nekrolog.",
    type: "website",
    locale: "pl_PL",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>
        {/* Sticky disclaimer bar */}
        <div className="disclaimer-bar sticky top-0 z-50 py-1.5 px-4 text-center">
          ✝ &nbsp;Strona w pełni humorystyczna i satyryczna. Nekrologi mają
          charakter rozrywkowy i nie służą znieważaniu pamięci
          rzeczywistych zmarłych.&nbsp; ✝
        </div>
        {children}
      </body>
    </html>
  );
}
