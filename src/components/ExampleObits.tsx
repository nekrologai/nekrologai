"use client";

const EXAMPLES = [
  {
    name: "Prokrastynator Nieposkromiony",
    cause: "Przeciążenie egzystencjalne",
    lastWords: "Od jutra na pewno.",
    excerpt:
      "Odszedł otoczony stosami nieotwartych maili i piętnastu zakładkami z 'przeczytam później'. Ostatnie godziny poświęcił na heroiczne unikanie wszystkiego co ważne. Żywił się zimną pizzą i słodką nadzieją, że jutro będzie inaczej.",
    votes: 312,
  },
  {
    name: "Scrollujący w Nieskończoność",
    cause: "5 godzin reelsów bez mrugania",
    lastWords: "Jeszcze jeden odcinek…",
    excerpt:
      "Algorytm zabrał go w niebyt o godzinie 2:47 w nocy. Kciuk jego pozostał napięty na zawsze, gotowy do dalszego przewijania. Zostawił po sobie niespłacone subskrypcje i 847 nieobejrzanych filmów.",
    votes: 287,
  },
  {
    name: "Wieczny Student",
    cause: "Sesja zimowa (przedłużona)",
    lastWords: "Zdążę zdać.",
    excerpt:
      "Odszedł nie zdąwszy oddać ostatniej pracy zaliczeniowej. Dziekan potwierdził, że i tak by nie zaliczył. W chwili śmierci miał otwarte cztery notatniki, osiem kaw i zero wiedzy na egzamin.",
    votes: 241,
  },
];

export default function ExampleObits() {
  return (
    <section
      className="py-16 px-4"
      style={{ background: "rgba(15,11,7,0.8)", borderTop: "1px solid rgba(201,168,76,0.08)" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p
            className="text-sm tracking-[0.3em] uppercase mb-3"
            style={{ color: "rgba(201,168,76,0.5)", fontFamily: "Courier Prime, monospace" }}
          >
            — przykładowe nekrologi —
          </p>
          <h2
            className="text-3xl font-bold"
            style={{ fontFamily: "Playfair Display, serif", color: "rgba(240,230,208,0.7)" }}
          >
            Upamiętnienia naszych czytelników
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {EXAMPLES.map((ex, i) => (
            <div
              key={i}
              className="relative overflow-hidden"
              style={{
                background: "#f5ead5",
                border: "2px solid #1a1208",
                boxShadow: "4px 4px 0 rgba(0,0,0,0.5), inset 0 0 0 4px #f5ead5, inset 0 0 0 5px #1a1208",
              }}
            >
              {/* Aged paper overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at top right, rgba(180,140,80,0.15) 0%, transparent 60%)",
                }}
              />

              <div className="p-5 relative z-10">
                {/* Date */}
                <div
                  className="text-xs mb-3 text-center tracking-widest"
                  style={{ color: "#5a4020", fontFamily: "Courier Prime, monospace" }}
                >
                  NEKROLOG · {new Date().toLocaleDateString("pl-PL")}
                </div>

                <div
                  style={{
                    borderTop: "2px double #1a1208",
                    borderBottom: "2px double #1a1208",
                    padding: "4px 0",
                    marginBottom: "12px",
                  }}
                >
                  <h3
                    className="text-lg font-black text-center leading-tight"
                    style={{ fontFamily: "Playfair Display, serif", color: "#1a1208" }}
                  >
                    {ex.name.toUpperCase()}
                  </h3>
                </div>

                <p
                  className="text-sm leading-relaxed mb-4 italic text-justify"
                  style={{ fontFamily: "Crimson Text, serif", color: "#1a1208" }}
                >
                  {ex.excerpt}
                </p>

                <div
                  className="text-xs mb-1 font-bold uppercase tracking-wide"
                  style={{ fontFamily: "Courier Prime, monospace", color: "#3d2010" }}
                >
                  Przyczyna zgonu:
                </div>
                <p
                  className="text-sm mb-3"
                  style={{ fontFamily: "Crimson Text, serif", color: "#1a1208" }}
                >
                  {ex.cause}
                </p>

                <div
                  className="text-xs mb-1 font-bold uppercase tracking-wide"
                  style={{ fontFamily: "Courier Prime, monospace", color: "#3d2010" }}
                >
                  Ostatnie słowa:
                </div>
                <p
                  className="text-sm italic"
                  style={{ fontFamily: "Crimson Text, serif", color: "#1a1208" }}
                >
                  „{ex.lastWords}"
                </p>

                <div
                  className="flex items-center justify-between mt-4 pt-3"
                  style={{ borderTop: "1px solid rgba(26,18,8,0.2)" }}
                >
                  <span
                    className="text-xs"
                    style={{ color: "#5a4020", fontFamily: "Courier Prime, monospace" }}
                  >
                    nekrolog.ai
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "#5a4020", fontFamily: "Courier Prime, monospace" }}
                  >
                    🕯️ {ex.votes} żałobników
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
