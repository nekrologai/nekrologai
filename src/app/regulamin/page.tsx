import Footer from "@/components/Footer";

export default function RegulaminPage() {
  return (
    <main>
      <article className="max-w-2xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <p
            className="text-sm tracking-widest uppercase mb-3"
            style={{ color: "rgba(201,168,76,0.6)", fontFamily: "Courier Prime, monospace" }}
          >
            — PISMO PROCESOWE ZAŚWIATÓW —
          </p>
          <h1
            className="text-4xl font-black"
            style={{ fontFamily: "Playfair Display, serif", color: "#f0e6d0" }}
          >
            Regulamin Nekrolog.AI
          </h1>
          <div className="divider-obituary max-w-xs mx-auto mt-4" />
          <p
            className="mt-4 italic"
            style={{ color: "rgba(240,230,208,0.5)", fontFamily: "Crimson Text, serif" }}
          >
            Dokument sporządzony z należytą powagą przez Kancelarię Nekrologów AI.
          </p>
        </div>

        <div
          className="space-y-8 leading-relaxed"
          style={{ color: "rgba(240,230,208,0.75)", fontFamily: "Crimson Text, serif", fontSize: "1.1rem" }}
        >
          <section>
            <h2
              className="text-xl font-bold mb-3"
              style={{ fontFamily: "Playfair Display, serif", color: "#c9a84c" }}
            >
              §1. Charakter serwisu
            </h2>
            <p>
              Nekrolog.AI jest serwisem wyłącznie satyrycznym i humorystycznym. Wszelkie
              generowane treści mają charakter rozrywkowy i nie stanowią prawdziwych
              nekrologów, ogłoszeń pośmiertnych ani żadnych dokumentów mających związek z
              rzeczywistymi zdarzeniami. Użytkownik rozumie i akceptuje absurdalną naturę
              serwisu.
            </p>
          </section>

          <section>
            <h2
              className="text-xl font-bold mb-3"
              style={{ fontFamily: "Playfair Display, serif", color: "#c9a84c" }}
            >
              §2. Zakazy (lista ostatnich grzechów)
            </h2>
            <p>Zabrania się używania serwisu do:</p>
            <ul className="list-none mt-3 space-y-2 pl-4">
              {[
                "Tworzenia treści dotyczących rzeczywistych osób zmarłych",
                "Generowania treści znieważających osoby żyjące",
                "Wykorzystywania danych osobowych innych osób bez ich zgody",
                "Generowania treści nawołujących do nienawiści",
                "Jakichkolwiek działań niezgodnych z prawem Rzeczypospolitej Polskiej",
              ].map((item, i) => (
                <li key={i} style={{ color: "rgba(240,230,208,0.7)" }}>
                  <span style={{ color: "#8b1a1a", marginRight: "8px" }}>✝</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2
              className="text-xl font-bold mb-3"
              style={{ fontFamily: "Playfair Display, serif", color: "#c9a84c" }}
            >
              §3. Wall of the Dead
            </h2>
            <p>
              Publikacja na Ścianie Wiecznej Pamięci jest dobrowolna i wymaga wyraźnego
              działania użytkownika. Nekrolog.AI zastrzega sobie prawo do moderowania i
              usuwania treści naruszających niniejszy regulamin lub dobre obyczaje.
            </p>
          </section>

          <section>
            <h2
              className="text-xl font-bold mb-3"
              style={{ fontFamily: "Playfair Display, serif", color: "#c9a84c" }}
            >
              §4. Dane i prywatność
            </h2>
            <p>
              Dane wpisywane w formularz nie są przechowywane bez wyraźnej zgody
              użytkownika. Jedynym wyjątkiem jest treść przesłana dobrowolnie na Wall of
              the Dead. Szczegóły w Polityce Prywatności.
            </p>
          </section>

          <section>
            <h2
              className="text-xl font-bold mb-3"
              style={{ fontFamily: "Playfair Display, serif", color: "#c9a84c" }}
            >
              §5. Postanowienia końcowe
            </h2>
            <p>
              Korzystanie z serwisu oznacza akceptację niniejszego regulaminu. Nekrolog.AI
              zastrzega sobie prawo do zmiany regulaminu w każdej chwili — tak jak
              nieprzewidywalne jest życie i śmierć. W sprawach nieuregulowanych stosuje
              się prawo polskie.
            </p>
          </section>

          <div
            className="text-center py-6 mt-8"
            style={{ borderTop: "1px solid rgba(201,168,76,0.1)" }}
          >
            <p
              className="italic"
              style={{ color: "rgba(240,230,208,0.35)", fontFamily: "Crimson Text, serif" }}
            >
              Sporządzono w roku Pańskim {new Date().getFullYear()}.
              <br />
              Podpisano: Redakcja Nekrolog.AI i jej patron — Wieczna Ironia.
            </p>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
