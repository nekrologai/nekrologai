import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="py-12 px-4 text-center"
      style={{
        borderTop: "1px solid rgba(201,168,76,0.15)",
        background: "#0a0806",
      }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Logo */}
        <div
          className="text-3xl font-black mb-2"
          style={{ fontFamily: "Playfair Display, serif", color: "rgba(240,230,208,0.4)" }}
        >
          NEKROLOG.AI
        </div>
        <p
          className="text-sm italic mb-6"
          style={{ color: "rgba(240,230,208,0.25)", fontFamily: "Crimson Text, serif" }}
        >
          „Twój dzisiejszy dzień, opisany jak ostatnia strona Twojego życia."
        </p>

        <div className="divider-obituary max-w-xs mx-auto mb-6" />

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
          {[
            { href: "/regulamin", label: "Regulamin" },
            { href: "/polityka-prywatnosci", label: "Polityka prywatności" },
            { href: "/wall", label: "Wall of the Dead" },
            { href: "/donate", label: "Fundusz Życia Po Śmierci" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{ color: "rgba(201,168,76,0.5)", fontFamily: "Courier Prime, monospace" }}
              className="hover:text-obituary-gold transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Disclaimer */}
        <div
          className="p-4 mb-6 text-sm leading-relaxed"
          style={{
            border: "1px solid rgba(201,168,76,0.1)",
            color: "rgba(240,230,208,0.35)",
            fontFamily: "Crimson Text, serif",
            fontStyle: "italic",
          }}
        >
          <strong style={{ color: "rgba(240,230,208,0.5)", fontStyle: "normal" }}>
            Disclaimer:{" "}
          </strong>
          To jest żart. Nekrolog.AI to projekt satyryczny służący wyłącznie celom
          rozrywkowym. Generowane treści są fikcyjne i nie mają żadnego związku z
          rzeczywistymi osobami ani prawdziwymi nekrologami. Zabrania się używania serwisu
          do tworzenia treści dotyczących rzeczywistych osób zmarłych. Żyj długo i
          szczęśliwie.
        </div>

        <p
          className="text-xs"
          style={{ color: "rgba(240,230,208,0.2)", fontFamily: "Courier Prime, monospace" }}
        >
          © {new Date().getFullYear()} Nekrolog.AI · Wszystkie prawa zastrzeżone przez
          zaświaty
        </p>
      </div>
    </footer>
  );
}
