import { NextRequest, NextResponse } from "next/server";

const STYLE_DESCRIPTIONS: Record<string, string> = {
  patetyczny:
    "skrajnie patetyczny i dramatyczny, pełen kwiecistego języka, łez i rozpaczy",
  sebix: "w stylu polskiego sebika/dresiarza, z charakterystycznym slangiem i gramatyką",
  korpo:
    "w stylu korporacyjnym, pełen buzzwordów, KPI, synergii i optymalizacji procesów",
  poetycki: "poetycki i liryczny, jak wiersz żałobny pełen metafor i porównań",
  brainrot:
    "w stylu TikTok brainrot — sigma, rizz, W rizz, based, no cap, skibidi, Ohio",
  wujek:
    "w stylu polskiego wujka na weselu, z anegdotami, piwem i mądrościami życiowymi",
  filozoficzny:
    "głęboko filozoficzny — egzystencjalizm, Camus, Nietzsche, pytania o sens bytu",
  gracz:
    "w stylu gracza — pełen terminologii gamingowej, skill issue, L+ratio, no life gamer",
  student: "w stylu studenta po sesji — niedospany, zdesperowany, bez grosza",
  klasyczny:
    "w klasycznym stylu polskiego nekrologu prasowego z lat 90., bardzo poważny i uroczysty",
};

const LENGTH_TOKENS: Record<string, number> = {
  krotki: 200,
  standardowy: 350,
  patetyczny: 600,
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, activity, food, mood, style, length } = body;

    if (!activity || !food || !mood) {
      return NextResponse.json({ error: "Brakuje wymaganych pól" }, { status: 400 });
    }

    const styleDesc = STYLE_DESCRIPTIONS[style] || STYLE_DESCRIPTIONS.klasyczny;
    const maxTokens = LENGTH_TOKENS[length] || 350;
    const personName = name || "Nieznany Wojownik";

    const systemPrompt = `Jesteś redaktorem naczelnym Nekrolog.AI — najpoważniejszego i najbardziej absurdalnego generatora nekrologów w polskim internecie. 
Piszesz nekrologi w stylu: ${styleDesc}.

ZASADY:
1. Pisz wyłącznie po polsku.
2. Styl nekrologu musi być ${styleDesc}.
3. Zawsze uwzględnij sekcje: główny opis życia/dnia, "PRZYCZYNA ZGONU:", "OSTATNIE SŁOWA:".
4. Opisuj banalne fakty dnia jako wielką tragedię lub heroiczny czyn.
5. Bądź absurdalnie dramatyczny — to czarny humor, nie prawdziwy nekrolog.
6. NIE pisz że to fikcja ani żart wewnątrz tekstu nekrologu.
7. Nekrolog ma wyglądać jak autentyczny wydruk z gazety.`;

    const userPrompt = `Napisz nekrolog dla: ${personName}
    
Ostatni dzień:
- Co robił/a: ${activity}
- Co jadł/a (ostatnia wieczerza): ${food}  
- Stan ducha / ostatnie myśli: ${mood}

Napisz kompletny nekrolog uwzględniający te fakty.`;

    // Try OpenAI first, fallback to mock if no API key
    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey) {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          max_tokens: maxTokens,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.9,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI error: ${response.status}`);
      }

      const data = await response.json();
      const text = data.choices?.[0]?.message?.content;
      return NextResponse.json({ text });
    }

    // Groq fallback
    const groqKey = process.env.GROQ_API_KEY;
    if (groqKey) {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${groqKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          max_tokens: maxTokens,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.9,
        }),
      });

      const data = await response.json();
      const text = data.choices?.[0]?.message?.content;
      return NextResponse.json({ text });
    }

    // Demo fallback (no API key set)
    const demoText = generateDemoObituary(personName, activity, food, mood, style);
    return NextResponse.json({ text: demoText });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Błąd generowania nekrologu. Spróbuj ponownie." },
      { status: 500 }
    );
  }
}

function generateDemoObituary(
  name: string,
  activity: string,
  food: string,
  mood: string,
  style: string
): string {
  return `Z niezmiernym bólem i głębokim żalem zawiadamiamy, iż ${name} odszedł/odeszła tego dnia, pozostawiając po sobie pustkę nie do wypełnienia.

Ostatnie godziny swego życia poświęcił/a na ${activity}. Czynił/a to z oddaniem, które mogło zawstydzić niejednego świętego.

Ostatnia wieczerza składała się z ${food} — skromna, lecz godna legendy.

PRZYCZYNA ZGONU: Przeciążenie egzystencjalne połączone z przewlekłym ${mood}.

OSTATNIE SŁOWA: "Jeszcze tylko chwilę... zaraz się ogarnę."

Żegnaj, ${name}. Algorytmy internetu nigdy Cię nie zapomną.

— Redakcja Nekrolog.AI`;
}
