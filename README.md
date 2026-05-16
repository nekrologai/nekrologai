# 💀 Nekrolog.AI

> *„Twój dzisiejszy dzień, opisany jak ostatnia strona Twojego życia."*

Nekrolog.AI to satyryczny generator nekrologów — opisujesz swój dzień w 3 zdaniach, a AI pisze Ci uroczysty, patetyczny nekrolog prasowy, jakbyś naprawdę odszedł/odeszła.

**Demo:** https://nekrolog.ai

---

## 🚀 Stack

- **Frontend:** Next.js 14 (App Router) + Tailwind CSS
- **AI:** OpenAI GPT-4o-mini / Groq Llama-3.3 / Google Gemini
- **Baza:** Supabase (PostgreSQL) — Wall of the Dead, darczyńcy
- **Hosting:** Vercel
- **Obrazy:** html2canvas (generowanie wycinków gazetowych do pobrania)
- **Płatności:** Stripe / Tpay (donate)

---

## 📦 Instalacja lokalna

```bash
# Sklonuj repo
git clone https://github.com/TWOJ-NICK/nekrolog-ai.git
cd nekrolog-ai

# Zainstaluj zależności
npm install

# Skopiuj i uzupełnij zmienne środowiskowe
cp .env.example .env.local
# → edytuj .env.local i wpisz klucze API

# Uruchom dev server
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Konfiguracja

### Zmienne środowiskowe (`.env.local`)

| Zmienna | Opis |
|---|---|
| `OPENAI_API_KEY` | Klucz OpenAI (GPT-4o-mini) |
| `GROQ_API_KEY` | Klucz Groq (darmowy fallback) |
| `NEXT_PUBLIC_SUPABASE_URL` | URL projektu Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key Supabase |
| `STRIPE_SECRET_KEY` | Klucz Stripe (donate) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Publiczny klucz Stripe |

> **Minimum do działania:** `OPENAI_API_KEY` LUB `GROQ_API_KEY`  
> Bez Supabase działa w trybie demo (bez Wall of the Dead i darczyńców)

### Supabase — uruchomienie bazy

1. Utwórz projekt na [supabase.com](https://supabase.com)
2. Przejdź do **SQL Editor**
3. Wklej i uruchom zawartość pliku `supabase-schema.sql`

---

## 🚀 Deploy na Vercel

### Opcja 1 — Przez GitHub (zalecana)

1. Push repo na GitHub
2. Wejdź na [vercel.com](https://vercel.com) → **New Project**
3. Zaimportuj repo
4. Dodaj zmienne środowiskowe w ustawieniach projektu
5. Deploy!

### Opcja 2 — Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## 🗂️ Struktura projektu

```
nekrolog-ai/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── generate/route.ts    # AI generowanie nekrologu
│   │   │   └── wall/route.ts        # Wall of the Dead API
│   │   ├── wall/page.tsx            # Ściana Wiecznej Pamięci
│   │   ├── regulamin/page.tsx       # Regulamin
│   │   ├── polityka-prywatnosci/    # Polityka prywatności
│   │   ├── layout.tsx               # Root layout + disclaimer
│   │   ├── page.tsx                 # Strona główna
│   │   └── globals.css              # Style globalne
│   ├── components/
│   │   ├── GeneratorForm.tsx        # Formularz generatora
│   │   ├── ObitResult.tsx           # Wynik — karta nekrologu
│   │   ├── WallPreview.tsx          # Preview Wall of the Dead
│   │   ├── ExampleObits.tsx         # Przykładowe nekrologi
│   │   ├── DonateSection.tsx        # Fundusz Życia Po Śmierci
│   │   └── Footer.tsx               # Stopka
│   └── lib/
│       └── supabase.ts              # Klient Supabase
├── supabase-schema.sql              # SQL schema do uruchomienia
├── vercel.json                      # Konfiguracja Vercel
├── .env.example                     # Szablon zmiennych env
└── README.md
```

---

## 🎭 Funkcje MVP

- [x] Generator nekrologu (9 stylów + 3 długości)
- [x] Piękna karta nekrologu (styl gazetowy)
- [x] Pobierz jako obraz (html2canvas)
- [x] Udostępnij / kopiuj
- [x] Wall of the Dead z głosowaniem
- [x] Sekcja donate (Fundusz Życia Po Śmierci)
- [x] Przykładowe nekrologi
- [x] Regulamin + Polityka prywatności
- [x] Disclaimer na każdej stronie
- [ ] Tryb „Dla znajomego" (gotowe komponenty, wymaga integracji)
- [ ] Tryb zbiorowy (do 5 osób)
- [ ] AI voice (TikTok potential)
- [ ] Stripe checkout

---

## 📣 Marketing

**Hashtag:** `#NekrologChallenge`

**Grupy docelowe:**
- Facebook: "Polskie startupy i SaaS"
- Wykop: tag #humor #ai #programowanie
- Reddit: r/Polska, r/programowanie
- TikTok: format screen + AI voice + zoomy
- Discord: serwery programistyczne

---

## ⚖️ Disclaimer

Ten serwis jest **wyłącznie satyryczny i humorystyczny**. Generowane nekrologi mają charakter rozrywkowy. Zabrania się używania do treści dotyczących rzeczywistych osób zmarłych.

---

*Zbudowane z miłością, absurdem i odrobiną czarnego humoru.* 💀
