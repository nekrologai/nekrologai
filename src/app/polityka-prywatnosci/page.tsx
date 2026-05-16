import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <main>
      <article className="max-w-2xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1
            className="text-4xl font-black"
            style={{ fontFamily: "Playfair Display, serif", color: "#f0e6d0" }}
          >
            Polityka Prywatności
          </h1>
          <div className="divider-obituary max-w-xs mx-auto mt-4" />
        </div>
        <div
          className="space-y-6 leading-relaxed"
          style={{ color: "rgba(240,230,208,0.75)", fontFamily: "Crimson Text, serif", fontSize: "1.05rem" }}
        >
          <p>
            Nekrolog.AI szanuje prywatność użytkowników jak redaktor szanuje tajemnice
            redakcyjne.
          </p>
          <p>
            <strong style={{ color: "#c9a84c" }}>Dane w formularzu:</strong> Treści
            wpisywane w formularz generatora nie są przechowywane na serwerze po
            wygenerowaniu nekrologu. Przesyłane są jedynie do API AI w celu generowania
            tekstu.
          </p>
          <p>
            <strong style={{ color: "#c9a84c" }}>Wall of the Dead:</strong> Nekrologi
            publikowane na Ścianie są przechowywane w bazie danych Supabase. Publikacja
            jest zawsze dobrowolna i opt-in.
          </p>
          <p>
            <strong style={{ color: "#c9a84c" }}>Płatności:</strong> Dane płatnicze
            przetwarzane są przez zewnętrznych operatorów (Stripe/Tpay) i nie są
            przechowywane przez Nekrolog.AI.
          </p>
          <p>
            <strong style={{ color: "#c9a84c" }}>Cookies:</strong> Serwis używa
            niezbędnych plików cookie do poprawnego działania. Analityki używamy w
            minimalnym zakresie (Plausible — bez śledzenia).
          </p>
          <p>
            W przypadku pytań: kontakt poprzez stronę GitHub projektu.
          </p>
        </div>
      </article>
      <Footer />
    </main>
  );
}
