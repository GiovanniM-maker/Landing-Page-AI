// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
const DEBUG_BUILD_TAG = "dbg-2026-02-22-01";
// #region agent log
fetch('http://127.0.0.1:7243/ingest/21bc038c-a630-47b4-90e2-607d774cf53d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({runId:'run-initial',hypothesisId:'H5',location:'src/App.tsx:module-load',message:'Module loaded in browser runtime',data:{ok:true},timestamp:Date.now()})}).catch(()=>{});
// #endregion
console.log("[AUIKI-DBG-BUILD]", DEBUG_BUILD_TAG);
if (typeof window !== "undefined") (window as any).__auikiBuildTag = DEBUG_BUILD_TAG;
// #region agent log
if (typeof window !== "undefined" && !(window as any).__auikiErrorHooksInstalled) {
  (window as any).__auikiErrorHooksInstalled = true;
  window.addEventListener("error", (ev) => {
    const payload = {
      runId: "run-initial",
      hypothesisId: "H7",
      location: "src/App.tsx:window.error",
      message: "Global window error captured",
      data: {
        message: String((ev as ErrorEvent)?.message || ""),
        filename: String((ev as ErrorEvent)?.filename || ""),
        lineno: Number((ev as ErrorEvent)?.lineno || 0),
        colno: Number((ev as ErrorEvent)?.colno || 0),
      },
      timestamp: Date.now(),
    };
    console.error("[AUIKI-ERR]", payload);
    (window as any).__auikiDebug = [...((window as any).__auikiDebug || []), payload].slice(-120);
    fetch('http://127.0.0.1:7243/ingest/21bc038c-a630-47b4-90e2-607d774cf53d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}).catch(()=>{});
  });
  window.addEventListener("unhandledrejection", (ev) => {
    const payload = {
      runId: "run-initial",
      hypothesisId: "H8",
      location: "src/App.tsx:window.unhandledrejection",
      message: "Unhandled promise rejection captured",
      data: {
        reason: String((ev as PromiseRejectionEvent)?.reason || ""),
      },
      timestamp: Date.now(),
    };
    console.error("[AUIKI-ERR]", payload);
    (window as any).__auikiDebug = [...((window as any).__auikiDebug || []), payload].slice(-120);
    fetch('http://127.0.0.1:7243/ingest/21bc038c-a630-47b4-90e2-607d774cf53d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}).catch(()=>{});
  });
}
// #endregion

const BLOCKED_DOMAINS = ["gmail.com","yahoo.com","hotmail.com","outlook.com","icloud.com","libero.it","virgilio.it","alice.it","tin.it","tiscali.it","live.com","aol.com","mail.com","protonmail.com","zoho.com"];
const WEBHOOK_URL = "https://giovannimavilla.app.n8n.cloud/webhook/598963fd-c7c5-41ca-b0cf-27a9c9f2b229";
const LEAD_WEBHOOK_URL = "https://giovannimavilla.app.n8n.cloud/webhook/f5d0fd75-8c72-4c61-8029-cd6c46832039";
const CUSTOM_ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];
const MAX_CUSTOM_IMAGES = 6;
const LOADING_STEPS = ["Analisi della struttura in corso...","Verifica attributi tecnici...","Controllo ottimizzazione SEO...","Confronto benchmark di settore...","Generazione report..."];
const SIMULATOR_EXTRACTION_TEXT = `Analizza l'immagine/le immagini di questo prodotto alimentare ed estrai tutte le informazioni visibili.

Se sono presenti due immagini, la prima e tipicamente il fronte del pack (nome, brand, visual) e la seconda e il retro (ingredienti, valori nutrizionali, info produttore).

Restituisci un JSON con questa struttura esatta:

{
  'extraction_metadata': {
    'images_analyzed': 1,
    'confidence_score': 0.95,
    'image_quality': 'good',
    'notes': ''
  },
  'product_identification': {
    'product_name': '',
    'brand_name': '',
    'product_type_hint': '',
    'is_wine_or_alcohol': false
  },
  'weight_and_volume': {
    'net_value': null,
    'unit': '',
    'is_liquid': false
  },
  'certifications_visible': {
    'bio_organic': false,
    'aop_dop': false,
    'igp': false,
    'other_certifications': []
  },
  'wine_details': {
    'grape_variety': null,
    'alcohol_percentage': null,
    'region': null,
    'denomination': null,
    'vintage_year': null
  },
  'nutritional_info_per_100g': {
    'energy_kj': null,
    'energy_kcal': null,
    'fat_g': null,
    'saturated_fat_g': null,
    'carbohydrates_g': null,
    'sugars_g': null,
    'fiber_g': null,
    'protein_g': null,
    'salt_g': null
  },
  'ingredients': {
    'full_text': '',
    'language_detected': '',
    'allergens_identified': []
  },
  'warnings_and_labels': {
    'pregnancy_warning_visible': false,
    'alcohol_warning_visible': false,
    'other_warnings': []
  },
  'storage_and_preparation': {
    'storage_instructions': null,
    'preparation_suggestions': null
  },
  'undefined_data': {
    'other_texts': [],
    'other_symbols': [],
    'other_codes': [],
    'notes': ''
  }
}

ISTRUZIONI PER OGNI SEZIONE:

extraction_metadata:
- images_analyzed: numero di immagini analizzate (1 o 2)
- confidence_score: da 0.0 a 1.0, quanto sei sicuro dell estrazione complessiva
- image_quality: 'good', 'medium', 'poor' (basato su leggibilita)
- notes: eventuali problemi (es: 'retro parzialmente coperto', 'riflesso su etichetta')

product_identification:
- product_name: nome del prodotto come appare sul pack (es: 'Rigatoni', 'Barolo', 'Parmigiano Reggiano')
- brand_name: nome del produttore/brand (es: 'Rummo', 'Marchesi di Barolo', 'Parmareggio')
- product_type_hint: categoria prodotto in italiano (es: 'pasta', 'vino rosso', 'formaggio', 'olio', 'salume')
- is_wine_or_alcohol: true se e vino, birra, liquore o altro alcolico

weight_and_volume:
- net_value: valore numerico del peso/volume netto (es: 500, 750, 1)
- unit: unita di misura come appare (es: 'g', 'kg', 'ml', 'cl', 'L')
- is_liquid: true se il prodotto e liquido

certifications_visible:
- bio_organic: true se vedi logo BIO/biologico/organic (foglia verde EU, o scritta)
- aop_dop: true se vedi logo AOP/DOP (cerchio rosso-giallo EU)
- igp: true se vedi logo IGP (cerchio blu-giallo EU)
- other_certifications: array di altre certificazioni visibili (es: ['Kosher', 'Halal', 'Vegan'])

wine_details: (compila SOLO se is_wine_or_alcohol = true)
- grape_variety: vitigno (es: 'Nebbiolo', 'Sangiovese', 'Glera')
- alcohol_percentage: gradazione alcolica come numero senza % (es: 13.5)
- region: regione di produzione (es: 'Piemonte', 'Toscana', 'Veneto')
- denomination: classificazione (es: 'DOCG', 'DOC', 'IGT')
- vintage_year: anno di vendemmia come numero (es: 2019)

nutritional_info_per_100g: (valori numerici, senza unita)
- Estrai i valori dalla tabella nutrizionale se visibile
- Usa null per valori non visibili
- I valori sono tipicamente 'per 100g' o 'per 100ml'

ingredients:
- full_text: copia ESATTA del testo ingredienti come appare (inclusi allergeni evidenziati)
- language_detected: 'it', 'fr', o 'it+fr' se bilingue
- allergens_identified: array di allergeni trovati (es: ['glutine', 'latte', 'uova', 'frutta a guscio'])

warnings_and_labels:
- pregnancy_warning_visible: true se vedi simbolo donna incinta barrata o scritta 'sconsigliato in gravidanza'/'deconseille aux femmes enceintes'
- alcohol_warning_visible: true se vedi warning sull alcol
- other_warnings: altri avvisi visibili

storage_and_preparation:
- storage_instructions: istruzioni di conservazione se visibili (es: 'Conservare in luogo fresco e asciutto')
- preparation_suggestions: suggerimenti di preparazione/cottura se visibili

undefined_data: (TUTTO cio che NON rientra nelle categorie sopra)
- other_texts: array di testi visibili non classificabili (es: ['Prodotto in Italia', 'Dal 1890', 'Ricetta tradizionale', 'Lotto: L2024A'])
- other_symbols: array di simboli/loghi non classificati (es: ['simbolo riciclaggio', 'logo sconosciuto blu', 'QR code'])
- other_codes: array di codici visibili (es: ['EAN: 8001234567890', 'Lotto: L2024A', 'REF: 12345'])
- notes: qualsiasi altra informazione rilevante non categorizzabile

IMPORTANTE:
- Se il retro non e disponibile, molti campi saranno null - questo e normale
- Gli allergeni sono spesso in MAIUSCOLO o grassetto nel testo ingredienti
- Per i vini, la gradazione alcolica e obbligatoria per legge, cercala bene
- Il peso netto e spesso indicato con 'e' davanti (es: 'e 500g') - estrai solo il numero e l unita
- TUTTO cio che leggi e non sai dove mettere va in undefined_data - non perdere informazioni

RISPONDI SOLO CON IL JSON, NIENT ALTRO.
NO spiegazioni. NO markdown. NO \`\`\`json\`\`\`.`;
const SIM_PRODUCTS = [
  {
    id: "wine-zolla",
    name: "La Zolla Toscana Sangiovese 2023",
    category: "Food & Beverage",
    frontImage: "/products/wine-front.png",
    backImage: "/products/wine-back.png",
  },
  {
    id: "gift-wild-turkey",
    name: "Wild Turkey Gift Box",
    category: "Spirits",
    frontImage: "/products/box-front.png",
    backImage: "/products/box-back.png",
  },
];
const IMPROVEMENT_AREAS = [
  { name: "Attributi tecnici", value: "3 su 12 presenti", status: "red" },
  { name: "Ottimizzazione SEO", value: "Assente", status: "red" },
  { name: "Cross-selling", value: "Non configurato", status: "red" },
  { name: "Struttura HTML", value: "Base", status: "orange" },
  { name: "Tone of Voice", value: "Non definito", status: "orange" },
];

const HOW_STEPS = [
  { n: "01", title: "Ci dai quello che hai", desc: "Immagini prodotto, dati grezzi, file del fornitore. Qualsiasi formato tu abbia già, noi partiamo da lì. Nessun template obbligatorio.", image: "/flow/step-1.png" },
  { n: "02", title: "Il motore AI elabora", desc: "Generiamo in automatico titoli, descrizioni, attributi strutturati, tag SEO e categorie, uniformando tutto al tuo standard.", image: "/flow/step-2.png" },
  { n: "03", title: "Validazione umana", desc: "Nessun dato va online al buio. Il sistema propone, il tuo team approva, corregge o rifiuta. Il controllo di qualità resta a voi.", image: "/flow/step-3.png" },
  { n: "04", title: "Pronto per il tuo gestionale", desc: "Dati puliti e pronti per il tuo eCommerce, PIM o ERP. Integrazione diretta, senza dover fare un ulteriore copia-incolla.", image: "/flow/step-3.png" },
];

const SECTOR_RESULTS = [
  { sector: "Moda", products: "500 schede", time: "6 ore", before: 43, after: 88, outputs: ["Titolo prodotto", "Descrizione prodotto", "Descrizione breve", "Meta description SEO", "Titolo SEO", "Attributi tecnici e filtri"] },
  { sector: "Pharma", products: "300 schede", time: "4 ore", before: 46, after: 90, outputs: ["Categoria prodotto", "Scheda per categoria con campi personalizzati", "Per cosmetico: campi specifici", "Per omeopatico: campi specifici", "Sezioni dinamiche per tipologia", "Fonte dati: bugiardino + web"] },
  { sector: "Food & Beverage", products: "15.000 referenze Eataly", time: "48 ore", before: 47, after: 89, outputs: ["Titolo prodotto (normative legali + stile)", "Descrizione prodotto", "Descrizione corta", "Meta SEO", "Title SEO", "Campo peso", "Famiglia prodotto", "% alcolica", "Altri attributi", "Allergeni", "Base dati + foto prodotto"] },
  { sector: "Industrial", products: "1.200 schede tecniche", time: "12 ore", before: 40, after: 86, outputs: ["Specifiche tecniche pulite", "Compatibilita codificata", "Formato multicanale"] },
];

const FAQS = [
  { q: "Funziona con il mio PIM?", a: "Esportiamo in CSV, XML, JSON. Se il tuo PIM accetta un'importazione dati, funziona." },
  { q: "Quanto tempo ci vuole?", a: "Un catalogo di 10.000 referenze viene processato in media in 48 ore." },
  { q: "I miei dati sono al sicuro?", a: "Lavoriamo sotto NDA. I dati vengono processati su infrastruttura europea e cancellati." },
  { q: "Quanto costa?", a: "Dipende dal volume e dalla complessita. Offriamo un audit gratuito su 50 prodotti." },
  { q: "In cosa siete diversi da ChatGPT?", a: "Noi produciamo schede enterprise-ready, formattate per il tuo PIM e orientate alla conversione." },
];

const MOCK_ENRICHED = {
  title: "Giacca Invernale Uomo in Lana Merino Premium - Blu Navy | Collezione Inverno 2026",
  attributes: [
    { label: "Materiale", value: "100% Lana Merino Extra-Fine (19.5 micron)" },
    { label: "Vestibilita", value: "Regular Fit - Consigliamo la taglia abituale" },
    { label: "Manutenzione", value: "Lavaggio a mano 30C - No asciugatrice" },
    { label: "Stagione", value: "Autunno/Inverno 2026" },
    { label: "Origine", value: "Made in Italy - Produzione artigianale" },
  ],
  seoTags: "giacca lana merino uomo, cappotto invernale blu, giacca italiana premium",
  metaDesc: "Giacca uomo in lana merino premium, vestibilita regular, produzione artigianale Made in Italy.",
  htmlPreview: '<h1>Giacca Invernale Uomo Lana Merino Premium</h1>\n<p class="subtitle">Blu Navy | Collezione Inverno 2026</p>\n<div class="attributes">12 attributi strutturati</div>',
};

class UiErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; message: string }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: "" };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error?.message || "Errore UI" };
  }
  componentDidCatch(error: Error) {
    console.error("UI crash intercettato", error);
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/21bc038c-a630-47b4-90e2-607d774cf53d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({runId:'run-initial',hypothesisId:'H1',location:'src/App.tsx:componentDidCatch',message:'React error boundary caught runtime error',data:{errorMessage:String(error?.message||''),name:String(error?.name||'')},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "var(--bg)", color: "var(--white)" }}>
          <div style={{ maxWidth: 760, width: "100%", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 18 }}>
            <h2 style={{ marginTop: 0 }}>La pagina ha avuto un errore, ma non e andata persa.</h2>
            <p style={{ marginBottom: 0 }}>Messaggio tecnico: {this.state.message || "Errore sconosciuto"}</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function useCountUp(end: number, duration: number, start: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setVal(Math.floor(p * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, end, duration]);
  return val;
}

function CircularScore({ score = 0, active = false }: { score?: number; active?: boolean }) {
  const safe = Math.max(0, Math.min(100, Number(score) || 0));
  const r = 40;
  const c = 2 * Math.PI * r;
  const offset = c - (safe / 100) * c;
  return (
    <div style={{ display: "grid", placeItems: "center", minHeight: 170 }}>
      <svg width="128" height="128" viewBox="0 0 100 100" aria-label={`Punteggio ${safe} su 100`}>
        <circle cx="50" cy="50" r={r} stroke="var(--border)" strokeWidth="8" fill="none" />
        <circle
          cx="50"
          cy="50"
          r={r}
          stroke={active ? "var(--coral)" : "var(--gray-500)"}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform="rotate(-90 50 50)"
          style={{ transition: "stroke-dashoffset .4s ease" }}
        />
        <text x="50" y="52" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 18, fontWeight: 700, fill: "var(--white)" }}>
          {safe}
        </text>
      </svg>
      <span className="muted" style={{ marginTop: -6, fontSize: 12 }}>Score / 100</span>
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSectorTab, setActiveSectorTab] = useState(0);
  const [simState, setSimState] = useState("idle");
  const [loadingStep, setLoadingStep] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState(SIM_PRODUCTS[0].id);
  const [customFiles, setCustomFiles] = useState<File[]>([]);
  const [customUploadError, setCustomUploadError] = useState("");
  const [webhookTextResponse, setWebhookTextResponse] = useState("");
  const [webhookHtmlResponse, setWebhookHtmlResponse] = useState("");
  const [webhookIsHtml, setWebhookIsHtml] = useState(false);
  const [webhookTextStatus, setWebhookTextStatus] = useState<"idle" | "ok" | "error">("idle");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const simulatorRef = useRef<HTMLElement | null>(null);
  const howRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);
  const [calcSku, setCalcSku] = useState("");
  const [calcMinutes, setCalcMinutes] = useState("");
  const [calcCost, setCalcCost] = useState("");
  const [contactRole, setContactRole] = useState("");
  const [contactSkuRange, setContactSkuRange] = useState("");
  const customFileInputRef = useRef<HTMLInputElement | null>(null);
  const m1 = useCountUp(70, 1200, true);
  const m2 = useCountUp(3, 800, true);
  const m3 = useCountUp(40, 1000, true);
  const activeSector = SECTOR_RESULTS[activeSectorTab];
  const hasCustomFiles = customFiles.length > 0;
  const selectedProduct = SIM_PRODUCTS.find((p) => p.id === selectedProductId) || SIM_PRODUCTS[0];

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/21bc038c-a630-47b4-90e2-607d774cf53d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({runId:'run-initial',hypothesisId:'H6',location:'src/App.tsx:useEffect(mount)',message:'App mounted successfully',data:{mounted:true},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
  }, []);
  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/21bc038c-a630-47b4-90e2-607d774cf53d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({runId:'run-initial',hypothesisId:'H2',location:'src/App.tsx:useEffect(simState)',message:'Simulator state changed',data:{simState,loadingStep},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
  }, [simState, loadingStep]);

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const validateEmail = (e: string) => {
    const v = e.trim().toLowerCase();
    if (!v || !v.includes("@")) return "Inserisci un'email valida.";
    const [local, domain] = v.split("@");
    if (!local || !domain || !domain.includes(".")) return "Inserisci un'email valida.";
    return "";
  };
  const normalizeText = (v?: any) => String(v ?? "").replace(/\s+/g, " ").trim();
  const isLikelyHtml = (v: string) => /<!doctype html|<html[\s>]|<head[\s>]|<body[\s>]/i.test(v);
  const debugClient = (hypothesisId: string, message: string, data: Record<string, unknown> = {}) => {
    try {
      const entry = { hypothesisId, message, data, ts: Date.now() };
      (window as any).__auikiDebug = [...((window as any).__auikiDebug || []), entry].slice(-80);
      console.log("[AUIKI-DBG]", entry);
    } catch {
      // ignore debug failures
    }
  };
  const toSafeResponseText = (raw: string) => {
    const plain = normalizeText(raw.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]*>/g, " "));
    return plain.slice(0, 15000);
  };
  const asArray = (v: any) => (Array.isArray(v) ? v : []);
  const parseHtmlOutput = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const bySummary = (label: string) => {
      const details = Array.from(doc.querySelectorAll("details")).find((d) =>
        normalizeText(d.querySelector("summary")?.textContent).toLowerCase().includes(label.toLowerCase())
      );
      return details || null;
    };
    const byAccordionLabel = (label: string) => {
      const acc = Array.from(doc.querySelectorAll(".acc-item")).find((item) =>
        normalizeText(item.querySelector(".acc-label")?.textContent).toLowerCase().includes(label.toLowerCase())
      );
      return acc || null;
    };
    const detailsToPairs = (detailsEl: Element | null) => {
      if (!detailsEl) return [];
      const dts = Array.from(detailsEl.querySelectorAll("dt"));
      const dds = Array.from(detailsEl.querySelectorAll("dd"));
      return dts.map((dt, i) => ({
        label: normalizeText(dt.textContent),
        value: normalizeText(dds[i]?.textContent || ""),
      }));
    };
    const accordionToPairs = (accEl: Element | null) => {
      if (!accEl) return [];
      return Array.from(accEl.querySelectorAll("table tr")).map((row) => {
        const cells = row.querySelectorAll("td");
        return {
          label: normalizeText(cells[0]?.textContent),
          value: normalizeText(cells[1]?.textContent),
        };
      });
    };
    const detailsToParagraphs = (detailsEl: Element | null) =>
      detailsEl
        ? Array.from(detailsEl.querySelectorAll(".details-content p"))
            .map((p) => normalizeText(p.textContent))
            .filter(Boolean)
        : [];
    const accordionToParagraphs = (accEl: Element | null) =>
      accEl
        ? Array.from(accEl.querySelectorAll(".acc-content p"))
            .map((p) => normalizeText(p.textContent))
            .filter(Boolean)
        : [];
    const schemaText = normalizeText(doc.querySelector('script[type="application/ld+json"]')?.textContent);
    let schema: any = null;
    try {
      schema = schemaText ? JSON.parse(schemaText) : null;
    } catch {
      schema = null;
    }
    const fullText = normalizeText(doc.body?.textContent);
    const eanMatches = Array.from(new Set((fullText.match(/\b\d{13}\b/g) || []).map((x) => `EAN: ${x}`)));
    const lottoMatches = Array.from(new Set(fullText.match(/\bL[A-Z0-9]{4,}\b/g) || [])).map((x) => `Lotto: ${x}`);
    const technicalDetails = [
      ...detailsToPairs(bySummary("Caratteristiche Tecniche")),
      ...accordionToPairs(byAccordionLabel("Dettagli Tecnici")),
    ];
    const ingredientsParagraphs = [
      ...detailsToParagraphs(bySummary("Allergeni e Ingredienti")),
      ...accordionToParagraphs(byAccordionLabel("Allergeni")),
    ];
    const originParagraphs = [
      ...detailsToParagraphs(bySummary("Origine e Produttore")),
      ...accordionToParagraphs(byAccordionLabel("Origine e Produttore")),
    ];
    const disposalParagraphs = [
      ...detailsToParagraphs(bySummary("Smaltimento")),
      ...accordionToParagraphs(byAccordionLabel("Smaltimento")),
      ...accordionToParagraphs(byAccordionLabel("FAQ")).filter((p) => p.toLowerCase().includes("smalt")),
    ];

    return {
      title: normalizeText(doc.querySelector("h1")?.textContent) || normalizeText(doc.querySelector("title")?.textContent),
      brand: normalizeText(doc.querySelector(".brand-label")?.textContent) || normalizeText(doc.querySelector(".brand-logo")?.textContent) || normalizeText(schema?.brand?.name),
      metaDescription: normalizeText(doc.querySelector('meta[name="description"]')?.getAttribute("content")),
      badges: Array.from(doc.querySelectorAll(".badges .badge, .badge")).map((b) => normalizeText(b.textContent)).filter(Boolean),
      highlights: Array.from(doc.querySelectorAll(".highlight-text, .h-card span")).map((h) => normalizeText(h.textContent)).filter(Boolean),
      description: normalizeText(doc.querySelector(".description p")?.textContent) || normalizeText(doc.querySelector(".short-desc p")?.textContent),
      technicalDetails,
      ingredientsParagraphs,
      originParagraphs,
      disposalParagraphs,
      codes: [...eanMatches, ...lottoMatches],
      schema: {
        productName: normalizeText(schema?.name),
        gtin13: normalizeText(schema?.gtin13),
        sku: normalizeText(schema?.sku),
        countryOfOrigin: normalizeText(schema?.countryOfOrigin?.name),
      },
      rawTextPreview: normalizeText(doc.body?.textContent).slice(0, 1200),
    };
  };
  const imageUrlToFile = async (url: string, fallbackName: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Impossibile leggere ${url}`);
    const blob = await res.blob();
    const fileName = url.split("/").pop() || fallbackName;
    return new File([blob], fileName, { type: blob.type || "image/png" });
  };
  const sendSimulatorWebhook = async (event: string, providedEmail?: string) => {
    try {
      debugClient("H3", "Webhook send start", { event, hasCustomFiles });
      const filesToSend = hasCustomFiles
        ? customFiles
        : [
            await imageUrlToFile(selectedProduct.frontImage, `${selectedProduct.id}-front.png`),
            await imageUrlToFile(selectedProduct.backImage, `${selectedProduct.id}-back.png`),
          ];
      const payload = {
        event,
        text: SIMULATOR_EXTRACTION_TEXT,
        inputMode: hasCustomFiles ? "custom_upload" : "sample_carousel",
        selectedProduct: {
          id: hasCustomFiles ? null : selectedProduct.id,
          name: hasCustomFiles ? "Upload custom utente" : selectedProduct.name,
          category: hasCustomFiles ? "Custom" : selectedProduct.category,
          frontImage: hasCustomFiles ? null : selectedProduct.frontImage,
          backImage: hasCustomFiles ? null : selectedProduct.backImage,
        },
        email: providedEmail || "",
        filesMeta: filesToSend.map((f) => ({
          filename: f.name,
          mimeType: f.type,
          sizeBytes: f.size,
        })),
        sentAt: new Date().toISOString(),
        source: "auiki-landing-simulator",
      };
      const formData = new FormData();
      formData.append("payload", JSON.stringify(payload));
      formData.append("event", event);
      formData.append("text", SIMULATOR_EXTRACTION_TEXT);
      formData.append("inputMode", hasCustomFiles ? "custom_upload" : "sample_carousel");
      formData.append("productId", hasCustomFiles ? "custom-upload" : selectedProduct.id);
      formData.append("productName", hasCustomFiles ? "Upload custom utente" : selectedProduct.name);
      formData.append("productCategory", hasCustomFiles ? "Custom" : selectedProduct.category);
      formData.append("email", providedEmail || "");
      formData.append("sentAt", payload.sentAt);
      formData.append("source", payload.source);
      filesToSend.forEach((file) => formData.append("files", file, file.name));
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        // Do not set Content-Type manually: browser adds multipart boundary.
        body: formData,
      });
      const rawText = (await res.text().catch(() => "")) || "";
      const cleaned = normalizeText(rawText).slice(0, 12000);
      const htmlMode = isLikelyHtml(rawText);
      setWebhookIsHtml(htmlMode);
      setWebhookHtmlResponse(htmlMode ? rawText.slice(0, 50000) : "");
      setWebhookTextResponse(cleaned || "(Webhook senza body testuale)");
      setWebhookTextStatus(res.ok ? "ok" : "error");
      debugClient("H3", "Webhook response", { ok: res.ok, status: res.status });
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/21bc038c-a630-47b4-90e2-607d774cf53d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({runId:'run-initial',hypothesisId:'H3',location:'src/App.tsx:sendSimulatorWebhook',message:'Webhook response received',data:{ok:res.ok,status:res.status},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      if (!res.ok) {
        console.error("Webhook non riuscito", res.status, await res.text());
        return;
      }
    } catch (err) {
      console.error("Errore invio webhook simulatore", err);
      debugClient("H3", "Webhook exception", { error: String((err as any)?.message || err) });
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/21bc038c-a630-47b4-90e2-607d774cf53d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({runId:'run-initial',hypothesisId:'H3',location:'src/App.tsx:sendSimulatorWebhook.catch',message:'Webhook request failed',data:{error:String((err as any)?.message||err)},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
    }
  };
  const sendLeadWebhook = async () => {
    const payload = {
      nome: firstName.trim(),
      cognome: lastName.trim(),
      email: email.trim().toLowerCase(),
    };
    const res = await fetch(LEAD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error(`Lead webhook fallito: ${res.status}`);
    }
  };
  const onOpenCustomPicker = () => {
    customFileInputRef.current?.click();
  };
  const onCustomFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (!selected.length) return;
    const valid: File[] = [];
    for (const file of selected) {
      if (!CUSTOM_ALLOWED_IMAGE_TYPES.includes(file.type)) {
        setCustomUploadError("Formato non supportato. Carica immagini PNG, JPG/JPEG o WEBP.");
        continue;
      }
      valid.push(file);
      if (valid.length >= MAX_CUSTOM_IMAGES) break;
    }
    if (!valid.length) return;
    setCustomFiles(valid.slice(0, MAX_CUSTOM_IMAGES));
    setCustomUploadError("");
    e.target.value = "";
  };
  const runSimulator = async () => {
    if (!selectedProduct && !hasCustomFiles) return;
    debugClient("H4", "runSimulator clicked", { hasSelectedProduct: !!selectedProduct, hasCustomFiles });
    setWebhookTextResponse("");
    setWebhookHtmlResponse("");
    setWebhookIsHtml(false);
    setWebhookTextStatus("idle");
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/21bc038c-a630-47b4-90e2-607d774cf53d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({runId:'run-initial',hypothesisId:'H4',location:'src/App.tsx:runSimulator.start',message:'Run simulator clicked',data:{hasSelectedProduct:!!selectedProduct,hasCustomFiles},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    setSimState("loading");
    setLoadingStep(0);
    const iv = window.setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % LOADING_STEPS.length);
    }, 1100);
    try {
      await sendSimulatorWebhook("simulator_submit");
      debugClient("H4", "webhook completed, setting result", {});
      setSimState("result");
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/21bc038c-a630-47b4-90e2-607d774cf53d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({runId:'run-post-fix',hypothesisId:'H4',location:'src/App.tsx:runSimulator.finish',message:'Webhook completed and set result',data:{ok:true},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
    } finally {
      window.clearInterval(iv);
    }
  };
  const submitEmail = async () => {
    if (!firstName.trim()) return setEmailError("Inserisci il nome.");
    if (!lastName.trim()) return setEmailError("Inserisci il cognome.");
    const err = validateEmail(email);
    if (err) return setEmailError(err);
    setEmailError("");
    try {
      await sendLeadWebhook();
    } catch (err) {
      setEmailError("Errore invio contatto. Riprova.");
      return;
    }
    setSimState("unlocked");
  };

  return (
    <UiErrorBoundary>
    <div style={{ background: "var(--bg)", color: "var(--white)", minHeight: "100vh", fontFamily: "var(--font)", overflowX: "hidden" }}>
      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
      :root{
        --bg:#0A0A0A;
        --bg-raised:#141414;
        --bg-card:#1A1A1A;
        --bg-card-hover:#202020;
        --border:rgba(255,255,255,0.08);
        --border-strong:rgba(255,255,255,0.14);
        --coral:#F36A63;
        --coral-dim:rgba(243,106,99,0.12);
        --coral-glow:rgba(243,106,99,0.08);
        --white:#F5F5F7;
        --gray-100:#E5E5E7;
        --gray-300:#A1A1A6;
        --gray-500:#6E6E73;
        --gray-700:#3A3A3C;
        --green:#34C759;
        --green-dim:rgba(52,199,89,0.12);
        --red:#FF453A;
        --red-dim:rgba(255,69,58,0.1);
        --font:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;
        --ink:var(--white);
        --muted:var(--gray-300);
        --line:var(--border);
        --card:var(--bg-card);
        --accent:var(--coral);
        --primary:var(--coral);
        --primary-ink:var(--coral);
        --danger:var(--red);
        --success:var(--green);
      }
      .container{max-width:1100px;margin:0 auto;padding:0 32px}
      .mono{font-family:var(--font)}
      .kicker{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--coral);font-weight:700}
      .card{background:var(--bg-card);border:1px solid var(--border);border-radius:14px;transition:all .25s}
      .card:hover{border-color:var(--coral);background:var(--bg-card-hover)}
      .card-dark{background:var(--bg-card);color:var(--white);border:1px solid var(--border);border-radius:14px}
      .btn{border-radius:100px;padding:10px 26px;border:1px solid var(--border-strong);background:transparent;color:var(--white);cursor:pointer;font-weight:600;font-size:13px;transition:all .25s}
      .btn:hover{background:rgba(255,255,255,.06);transform:translateY(-1px)}
      .btn-primary{background:var(--coral);color:#fff;border-color:var(--coral)}
      .btn-primary:hover{filter:brightness(1.1);transform:translateY(-1px)}
      .muted{color:var(--gray-300)}
      .how-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
      .two-col{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}
      .rule{height:1px;background:var(--border)}
      .grid-bg{position:relative}
      .grid-bg::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,var(--coral-glow) 0%,transparent 65%);pointer-events:none;z-index:0}
      .grid-bg > *{position:relative;z-index:1}
      .hero-visual{height:min(56vh,520px);border:1px solid var(--border);border-radius:14px;margin-bottom:34px;overflow:hidden;position:relative;background:linear-gradient(180deg,var(--bg-raised) 0%,var(--bg) 100%)}
      .hero-visual::after{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,var(--coral-glow) 0%,transparent 65%);pointer-events:none}
      .hero-mark{position:absolute;left:22px;top:20px;font-size:12px;letter-spacing:.16em;color:var(--white);text-transform:uppercase;font-weight:700}
      .hero-content{position:relative;z-index:2;padding:32px 36px 40px;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;min-height:100%;box-sizing:border-box}
      .how-step-card{--border-radius:14px;position:relative;padding:1.5rem 1.5rem 1.8rem;cursor:pointer;border-radius:var(--border-radius);background:var(--bg-card);border:1px solid var(--border);transition:all .25s}
      .how-step-card:hover{border-color:var(--coral);background:var(--bg-card-hover)}
      .how-step-card > * + *{margin-top:1.1em}
      .how-step-card .card__content{color:var(--gray-300);font-size:.9rem;margin:0;line-height:1.55}
      .how-step-card .card__title{padding:0;font-size:1.3rem;font-weight:600;color:var(--white);margin:0;line-height:1.15}
      .how-step-card .card__date{color:var(--gray-500);font-size:.8rem}
      .how-step-card .card__arrow{position:absolute;background:var(--coral);padding:.4rem;border-top-left-radius:10px;border-bottom-right-radius:var(--border-radius);bottom:0;right:0;transition:.2s;display:flex;justify-content:center;align-items:center}
      .how-step-card .card__arrow svg{transition:.2s}
      .how-step-card:hover .card__title{color:var(--coral)}
      .how-step-card:hover .card__arrow{background:var(--bg-card-hover)}
      .how-step-card:hover .card__arrow svg{transform:translateX(3px)}
      .product-carousel{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
      .product-card{position:relative;border:1px solid var(--border);border-radius:14px;overflow:hidden;background:var(--bg-card);cursor:pointer;transition:all .25s}
      .product-card:hover{transform:translateY(-2px);border-color:var(--coral);background:var(--bg-card-hover)}
      .product-card.is-selected{border-color:var(--coral);box-shadow:0 0 0 2px var(--coral-dim)}
      .product-card.is-disabled{opacity:.42;cursor:not-allowed;filter:grayscale(1)}
      .product-card.is-disabled:hover{transform:none;border-color:var(--border)}
      .product-hover{position:absolute;inset:0;background:var(--bg-card);transform:translateY(-102%);transition:transform .25s ease;z-index:2}
      .product-card:hover .product-hover{transform:translateY(0)}
      .product-upload{background:var(--bg-card);border:1px solid var(--border)}
      .product-upload:hover{transform:translateY(-2px);border-color:var(--coral);background:var(--bg-card-hover)}
      .sim-chat-wrap{display:flex;flex-direction:column;width:100%}
      .sim-chat-shell{position:relative;display:flex;background:var(--border);border-radius:14px;padding:1.5px;overflow:hidden}
      .sim-chat-inner{display:flex;flex-direction:column;background:var(--bg-card);border-radius:12px;width:100%;overflow:hidden;border:1px solid var(--border)}
      .sim-chat-body{padding:10px}
      .sim-chat-note{color:var(--gray-300);font-size:12px;margin:0 0 8px}
      .sim-chat-options{display:flex;justify-content:space-between;align-items:flex-end;padding:10px}
      .sim-btns-add{display:flex;gap:8px}
      .sim-btns-add button{display:flex;color:var(--gray-500);background:transparent;border:none;cursor:pointer;transition:all .3s ease}
      .sim-btns-add button:hover{transform:translateY(-2px);color:var(--white)}
      .sim-submit{display:flex;padding:2px;background:var(--bg-card);border:1px solid var(--border);border-radius:10px;cursor:pointer;transition:all .3s ease}
      .sim-submit:hover{border-color:var(--coral)}
      .sim-submit i,.sim-submit svg{color:var(--gray-300);transition:all .3s ease}
      .sim-submit:hover svg{color:var(--coral)}
      .sim-submit:active{transform:scale(.92)}
      .sim-tags{padding:10px 0 2px;display:flex;color:var(--white);font-size:10px;gap:6px;flex-wrap:wrap}
      .sim-tags span{padding:4px 8px;background:var(--bg-card);border:1px solid var(--border);border-radius:10px;user-select:none}
      .gen-btn-wrapper{position:relative;display:inline-block}
      .gen-btn{user-select:none;display:flex;justify-content:center;align-items:center;gap:8px;padding:15px 34px;font-family:var(--font);font-size:14px;font-weight:600;background:var(--coral);color:#fff;border:none;border-radius:100px;cursor:pointer;transition:all .25s}
      .gen-btn:hover{filter:brightness(1.1);transform:translateY(-1px)}
      .gen-btn-letter{position:relative;display:inline-block;color:inherit}
      .gen-btn-svg{flex-grow:1;height:24px;margin-right:.5rem;fill:currentColor}
      .gen-txt-wrapper{position:relative;display:flex;align-items:center;min-width:6.4em}
      .gen-txt-1,.gen-txt-2{position:absolute;word-spacing:-1em}
      .gen-txt-1{animation:appear-anim 1s ease-in-out forwards}
      .gen-txt-2{opacity:0}
      .loader-stage{display:grid;place-items:center;min-height:420px;background:var(--bg-card);border:1px solid var(--border);border-radius:14px}
      .loader-wrapper{position:relative;display:flex;align-items:center;justify-content:center;width:180px;height:180px;font-family:var(--font);font-size:1.2em;font-weight:300;color:var(--white);border-radius:50%;user-select:none}
      .loader{position:absolute;top:0;left:0;width:100%;aspect-ratio:1 / 1;border-radius:50%;background:transparent;animation:loader-rotate 2s linear infinite;z-index:0}
      @keyframes loader-rotate{
        0%{transform:rotate(90deg);box-shadow:0 10px 20px 0 var(--coral-dim) inset}
        50%{transform:rotate(270deg);box-shadow:0 10px 20px 0 var(--coral-glow) inset}
        100%{transform:rotate(450deg);box-shadow:0 10px 20px 0 var(--coral-dim) inset}
      }
      .loader-letter{display:inline-block;opacity:.4;transform:translateY(0);animation:loader-letter-anim 2s infinite;z-index:1;border-radius:50ch;border:none}
      .loader-letter:nth-child(1){animation-delay:0s}
      .loader-letter:nth-child(2){animation-delay:.1s}
      .loader-letter:nth-child(3){animation-delay:.2s}
      .loader-letter:nth-child(4){animation-delay:.3s}
      .loader-letter:nth-child(5){animation-delay:.4s}
      .loader-letter:nth-child(6){animation-delay:.5s}
      .loader-letter:nth-child(7){animation-delay:.6s}
      .loader-letter:nth-child(8){animation-delay:.7s}
      .loader-letter:nth-child(9){animation-delay:.8s}
      .loader-letter:nth-child(10){animation-delay:.9s}
      @keyframes loader-letter-anim{
        0%,100%{opacity:.4;transform:translateY(0)}
        20%{opacity:1;transform:scale(1.15)}
        40%{opacity:.7;transform:translateY(0)}
      }
      .notice-card{background:var(--bg-card);border:1px solid var(--border);border-radius:14px;transition:all .25s}
      .notice-card:hover{border-color:var(--coral)}
      .notice-container{margin:1.25em 2em 1.375em 1.375em;display:flex;flex-direction:row;gap:.75em}
      .notice-status{width:.625em;height:.625em;margin:.375em 0;border-radius:.5em;background:var(--coral)}
      .notice-right{display:flex;flex-direction:column;gap:.875em}
      .notice-text-wrap{display:flex;flex-direction:column;gap:.25em;color:var(--white)}
      .notice-text{margin:0;font-size:15px;line-height:1.55}
      .notice-link{font-weight:500;text-decoration:none;color:var(--white)}
      .notice-time{font-size:.875em;color:var(--gray-500);margin:0}
      .notice-btn-wrap{display:flex;flex-direction:row;gap:1em;align-items:center}
      .notice-primary{font-size:15px;background:transparent;font-weight:600;color:var(--coral);border:none;border-radius:100px;cursor:pointer}
      .notice-secondary{background:transparent;border:none;font-size:15px;font-weight:400;color:var(--gray-300);cursor:pointer}
      .notice-btn-wrap button:hover{text-decoration:underline}
      .web-browser{width:100%;height:560px;background:var(--bg-card);border:1px solid var(--border);border-radius:14px;display:flex;flex-direction:column;overflow:hidden;position:relative}
      .web-tabs-head{background:var(--bg-raised);height:40px;display:flex;justify-content:space-between;align-items:end;padding-left:20px;border-bottom:1px solid var(--border)}
      .web-tab-open{width:140px;height:34px;border-radius:14px 14px 0 0;background:var(--bg-card);display:flex;gap:5px;align-items:start;justify-content:space-between;padding:4px 8px;position:relative;border:1px solid var(--border);border-bottom:none}
      .web-tab-open .close-tab{color:var(--gray-300);font-size:9px;padding:1px 4px;border-radius:50%}
      .web-tab-open .close-tab:hover{background:var(--bg-card-hover);color:var(--white)}
      .web-rounded-l,.web-rounded-r{position:absolute;background:var(--bg-card);width:20px;height:24px;top:0;overflow:hidden}
      .web-rounded-l{right:0;transform:translate(100%)}
      .web-rounded-r{left:0;transform:translate(-100%)}
      .web-mask-round{width:100%;height:100%;background:var(--bg-raised)}
      .web-rounded-l .web-mask-round{border-radius:0 0 0 14px}
      .web-rounded-r .web-mask-round{border-radius:0 0 14px 0}
      .web-tab-open span{color:var(--white);font-size:10px}
      .web-window-opt{display:flex}
      .web-window-opt button{height:30px;width:30px;border:none;background:transparent;transition:.1s ease-out;color:var(--white);margin-bottom:10px}
      .web-window-opt button:hover{background:var(--bg-card-hover)}
      .web-window-opt .window-close:hover{background:var(--red)}
      .web-head-browser{position:absolute;top:30px;width:100%;height:40px;background:var(--bg-card);padding:7px;display:flex;border-radius:14px 14px 0 0;gap:5px;border:1px solid var(--border);border-bottom:none}
      .web-head-browser input{background:var(--bg);border:2px solid transparent;height:100%;border-radius:20px;outline:none;color:var(--white);padding:0 15px;flex:1;transition:.2s ease-in-out}
      .web-head-browser input:hover{background:var(--bg-card-hover)}
      .web-head-browser input:focus{border-color:var(--coral)}
      .web-head-browser input::placeholder{color:var(--gray-500)}
      .web-head-browser button{width:27px;height:25px;border:none;background:transparent;color:var(--white);border-radius:50%;transition:.2s ease-in-out}
      .web-head-browser button:disabled{opacity:.4}
      .web-head-browser button:hover{background:var(--bg-card-hover)}
      .web-head-browser button:disabled:hover{background:transparent}
      .web-head-browser .star{color:var(--white);position:absolute;right:45px;top:50%;transform:translateY(-50%);font-size:15px;opacity:.7;height:18px;width:19px;display:flex;align-items:center;justify-content:center;padding-bottom:3px}
      .web-body{margin-top:70px;height:calc(100% - 70px);background:var(--bg)}
      .web-body iframe{width:100%;height:100%;border:none;background:#fff;display:block}
      .web-body-fallback{padding:12px;color:var(--gray-300);font-size:13px}
      .ai-modal-backdrop{position:fixed;inset:0;background:rgba(10,10,10,.6);display:grid;place-items:center;z-index:70;padding:20px}
      .ai-modal{width:min(920px,96vw);max-height:88vh;overflow:auto;background:var(--bg-card);border:1px solid var(--border);border-radius:14px;box-shadow:0 28px 60px rgba(0,0,0,.4)}
      .ai-modal-head{position:sticky;top:0;background:var(--bg-card);border-bottom:1px solid var(--border);padding:14px 16px;display:flex;justify-content:space-between;align-items:center;z-index:2}
      .ai-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
      .ai-block{border:1px solid var(--border);border-radius:12px;padding:12px;background:var(--bg-raised)}
      .ai-list{margin:0;padding-left:18px;display:grid;gap:6px}
      .ai-pill{display:inline-flex;border:1px solid var(--border);border-radius:999px;padding:4px 10px;font-size:12px;background:var(--bg-card)}
      @media (max-width:980px){.how-grid,.two-col{grid-template-columns:1fr}}
      @media (max-width:980px){.hero-visual{height:auto;min-height:42vh;border-radius:14px}}
      @media (max-width:840px){.container{padding:0 18px}}
      @media (max-width:840px){h1{font-size:36px !important;line-height:1.08 !important}}
      @media (max-width:840px){.stats-grid{grid-template-columns:repeat(2,minmax(0,1fr)) !important}}
      @media (max-width:640px){.stats-grid{grid-template-columns:1fr !important}}
      @media (max-width:640px){.product-carousel{grid-template-columns:1fr !important}}
      `}</style>

      <nav style={{ position: "fixed", insetInline: 0, top: 0, zIndex: 40, borderBottom: "1px solid var(--border)", background: "#000000", padding: "18px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="container" style={{ height: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: 0 }}>
          <strong style={{ letterSpacing: 1.2, fontWeight: 700, color: "var(--white)" }}>AUIKI</strong>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn" onClick={() => scrollTo(howRef)}>Come funziona</button>
            <button className="btn btn-primary" onClick={() => scrollTo(simulatorRef)}>Prova gratis</button>
          </div>
        </div>
      </nav>

      <main>
        <section className="container grid-bg" style={{ paddingTop: 146, paddingBottom: 96, textAlign: "left" }}>
          <div className="hero-visual">
            <div className="hero-content">
              <h1 style={{ fontSize: "clamp(34px, 4.2vw, 50px)", lineHeight: 1.08, letterSpacing: "-.025em", maxWidth: 720, margin: "18px 0", fontWeight: 800, color: "var(--white)", textTransform: "uppercase" }}>Gestire l'e‑commerce con l'AI?</h1>
              <p style={{ fontSize: 22, fontWeight: 600, color: "var(--white)", margin: "0 0 16px", maxWidth: 720 }}>Il tuo lavoro è vendere. Non compilare schede prodotto.</p>
              <p className="muted" style={{ maxWidth: 760, margin: "0 0 28px", fontSize: 17, lineHeight: 1.65 }}>
                Il data entry manuale uccide i margini e ritarda le vendite. Abbiamo messo a punto un sistema basato sull'AI che estrae i dati dei tuoi prodotti in automatico e compila le schede al posto tuo. Il tuo team smette di fare copia‑incolla, e il catalogo va online in un terzo del tempo. Senza stress e senza dover assumere nuove persone.
              </p>
              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                <button className="btn btn-primary" onClick={() => scrollTo(simulatorRef)}>Prova l'AI su un tuo prodotto. Sul serio.</button>
                <button className="btn" onClick={() => scrollTo(simulatorRef)}>Calcola quanto ti costa il catalogo oggi</button>
              </div>
              <p className="muted" style={{ fontSize: 13, marginTop: 10 }}>Ci vogliono 60 secondi e non devi registrarti</p>
            </div>
          </div>

          <div style={{ marginTop: 48 }} className="rule" />
          <div className="stats-grid" style={{ paddingTop: 24, display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 12, textAlign: "left" }}>
            {[{ v: `–${m1}%`, l: "Tempo di gestione catalogo" }, { v: `${m2}x`, l: "Velocità di messa online" }, { v: `–${m3}%`, l: "Costi operativi" }, { v: "∞", l: "Scalabilità senza nuovi assunti" }].map((m) => (
              <div key={m.l}><p className="mono" style={{ fontSize: 36, margin: 0, letterSpacing: "-.02em" }}>{m.v}</p><p className="muted" style={{ margin: 0 }}>{m.l}</p></div>
            ))}
          </div>
        </section>

        <section className="container grid-bg" style={{ paddingBottom: 90 }}>
          <div className="card" style={{ padding: 32 }}>
            <p className="kicker">Il vero costo del data entry</p>
            <h2 style={{ marginTop: 10, fontSize: 44, letterSpacing: "-.02em", lineHeight: 1.1, fontWeight: 800 }}>Il tuo team ha altri obiettivi.<br />Non sprecarlo su fogli Excel.</h2>
            <p className="muted" style={{ maxWidth: "70ch", marginTop: 14, lineHeight: 1.65, fontSize: 17 }}>
              Ogni scheda compilata a mano è tempo sottratto alla strategia aziendale, un costo che lievita e un errore sempre in agguato. Le persone sono la tua risorsa più preziosa: farle impazzire su infiniti fogli Excel non è più sostenibile.
            </p>

            <div style={{ padding: 24, marginTop: 24, background: "var(--bg-raised)", border: "1px solid var(--border)", borderRadius: 14 }}>
              <p className="kicker">Il costo nascosto</p>
              <p className="muted" style={{ lineHeight: 1.65, marginTop: 8 }}>
                Un team di 3 persone che spende 15 minuti a scheda su 300 referenze al mese, brucia oltre 4.500 euro al mese solo per fare inserimento dati. Senza contare il tempo perso per correzioni, sviste e rilavorazioni.
              </p>
              <button className="btn btn-primary" style={{ marginTop: 12 }} onClick={() => scrollTo(simulatorRef)}>Calcola il vero costo del tuo team catalogo</button>
              <p className="muted" style={{ fontSize: 13, marginTop: 8 }}>Ti sorprenderà, ma è un numero reale</p>
            </div>

            <div className="two-col" style={{ marginTop: 28 }}>
              <div>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 24 }}>
                  <span style={{ fontSize: 26, lineHeight: 1 }}>⏱</span>
                  <div>
                    <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Inserimento manuale lento</h4>
                    <p className="muted" style={{ margin: "6px 0 0", lineHeight: 1.55 }}>Centinaia di prodotti significano settimane di lavoro ripetitivo.</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 26, lineHeight: 1 }}>⚠️</span>
                  <div>
                    <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Incoerenza dati ed errori umani</h4>
                    <p className="muted" style={{ margin: "6px 0 0", lineHeight: 1.55 }}>Titoli disallineati, attributi mancanti, categorie sbagliate. L'errore è fisiologico, non è colpa del team.</p>
                  </div>
                </div>
              </div>
              <div>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 24 }}>
                  <span style={{ fontSize: 26, lineHeight: 1 }}>🐢</span>
                  <div>
                    <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Ritardi sul mercato</h4>
                    <p className="muted" style={{ margin: "6px 0 0", lineHeight: 1.55 }}>Se la merce è in magazzino ma il catalogo non è pronto, non stai fatturando.</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 26, lineHeight: 1 }}>📈</span>
                  <div>
                    <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Impossibilità di crescere</h4>
                    <p className="muted" style={{ margin: "6px 0 0", lineHeight: 1.55 }}>Da 500 a 5.000 referenze, il sistema esplode. Fino a ieri l'unica soluzione era assumere data-entry.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={howRef} className="container grid-bg" style={{ paddingBottom: 100 }}>
          <p className="kicker">Come funziona nella realtà</p>
          <h2 style={{ fontSize: 48, lineHeight: 1.06, letterSpacing: "-.03em", marginTop: 10, fontWeight: 800 }}>Nessun tool da studiare.<br />Un sistema che lavora per te.</h2>
          <p className="muted" style={{ maxWidth: "70ch", marginTop: 14, lineHeight: 1.65 }}>Non vogliamo venderti l'ennesimo tool da configurare. Abbiamo costruito un flusso che elimina il lavoro alienante e restituisce dati puliti. La tecnologia produce, tu mantieni il controllo assoluto.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 20, marginTop: 32 }}>
            {HOW_STEPS.map((step) => (
              <article key={step.n} className="how-step-card">
                <div className="card__date">Step {step.n}</div>
                <h3 className="card__title">{step.title}</h3>
                <p className="card__content">{step.desc}</p>
                <div className="card__arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15" width="15">
                    <path fill="#fff" d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z" />
                  </svg>
                </div>
              </article>
            ))}
          </div>
          <p className="muted" style={{ marginTop: 24, fontSize: 15, lineHeight: 1.65 }}>Il sistema si adatta al tuo processo e alla tua struttura dati. Non viceversa. Siamo qui per risolvere problemi, non per importi i nostri formati.</p>
        </section>

        <section className="container grid-bg" style={{ paddingBottom: 100 }}>
          <p className="kicker">Impatto reale</p>
          <h2 style={{ fontSize: 48, lineHeight: 1.06, letterSpacing: "-.03em", marginTop: 10, fontWeight: 800 }}>Tempi dimezzati. Morale al massimo, errore al minimo.</h2>
          <p className="muted" style={{ maxWidth: "70ch", marginTop: 14, lineHeight: 1.65 }}>Non ci piacciono le promesse da guru. Preferiamo le soluzioni che danno un contributo vero. Ottimizzare il catalogo significa liberare risorse preziose e arrivare sul mercato prima dei tuoi competitor.</p>

          <div className="card" style={{ padding: 28, marginTop: 28 }}>
            <p className="kicker">Un caso studio</p>
            <h3 style={{ fontSize: 24, fontWeight: 700, marginTop: 8 }}>Azienda Retail Food, +2.000 referenze</h3>
            <p className="muted" style={{ lineHeight: 1.65, marginTop: 10 }}>
              Il team passava le giornate a compilare campi manualmente. Con il nostro sistema AI, il tempo medio per scheda è crollato da 12 a 3 minuti. I costi operativi sul data-entry si sono ridotti del 65%. E i nuovi prodotti oggi vanno online in 3 giorni anziché 2 settimane.
            </p>
          </div>

          <div className="stats-grid" style={{ paddingTop: 28, display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 16, textAlign: "left" }}>
            <div className="card" style={{ padding: 20 }}>
              <p className="mono" style={{ fontSize: 34, margin: 0, color: "var(--coral)" }}>–75%</p>
              <p style={{ margin: "6px 0 0", fontWeight: 700, fontSize: 15 }}>Tempo per scheda</p>
              <p className="muted" style={{ margin: "6px 0 0", fontSize: 14, lineHeight: 1.5 }}>Da 40 minuti a meno di 5 per ogni prodotto. Sui grandi numeri, è la differenza tra crescere o bloccarsi.</p>
            </div>
            <div className="card" style={{ padding: 20 }}>
              <p className="mono" style={{ fontSize: 34, margin: 0, color: "var(--coral)" }}>–65%</p>
              <p style={{ margin: "6px 0 0", fontWeight: 700, fontSize: 15 }}>Costi operativi</p>
              <p className="muted" style={{ margin: "6px 0 0", fontSize: 14, lineHeight: 1.5 }}>Meno budget bruciato nel data-entry. Il team torna a fare lavori a valore aggiunto.</p>
            </div>
            <div className="card" style={{ padding: 20 }}>
              <p className="mono" style={{ fontSize: 34, margin: 0, color: "var(--coral)" }}>3 gg</p>
              <p style={{ margin: "6px 0 0", fontWeight: 700, fontSize: 15 }}>Time-to-market</p>
              <p className="muted" style={{ margin: "6px 0 0", fontSize: 14, lineHeight: 1.5 }}>Prodotti online in pochi giorni. Meno merce ferma a prendere polvere in magazzino.</p>
            </div>
            <div className="card" style={{ padding: 20 }}>
              <p className="mono" style={{ fontSize: 34, margin: 0, color: "var(--coral)" }}>∞</p>
              <p style={{ margin: "6px 0 0", fontWeight: 700, fontSize: 15 }}>Scalabilità</p>
              <p className="muted" style={{ margin: "6px 0 0", fontSize: 14, lineHeight: 1.5 }}>Passare da 300 a 3.000 referenze al mese senza dover assumere persone solo per digitare su una tastiera.</p>
            </div>
          </div>
        </section>

        <section
          ref={simulatorRef}
          style={{
            paddingBottom: 78,
            background: "var(--bg-raised)",
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="container grid-bg" style={{ paddingTop: 24, color: "var(--white)" }}>
            <p className="kicker">Fai una prova sui tuoi prodotti</p>
            <h2 style={{ marginTop: 8, fontSize: 44, letterSpacing: "-.02em", lineHeight: 1.08, fontWeight: 800 }}>Tocca con mano come funziona.<br />Scommettiamo che rimarrai sbalordito?</h2>
            <p className="muted" style={{ maxWidth: "70ch", lineHeight: 1.65 }}>Non crederci sulla parola. Seleziona un prodotto d'esempio o carica la foto di un tuo articolo per vedere come il sistema ne estrae i dati pronti all'uso in 60 secondi. È gratuito.</p>
            <div style={{ color: "var(--white)", paddingTop: 16 }}>
              {simState === "idle" && (
                <div style={{ padding: "12px 0 10px" }}>
                  <p className="muted" style={{ marginTop: 0, marginBottom: 10, textAlign: "center" }}>
                    📤 Carica le tue immagini (PNG, JPG, WEBP – max 6 foto) oppure seleziona un prodotto d'esempio.
                  </p>
                  <div className="product-carousel">
                    {SIM_PRODUCTS.map((product) => (
                      <article
                        key={product.id}
                        className={`product-card ${selectedProductId === product.id ? "is-selected" : ""} ${hasCustomFiles ? "is-disabled" : ""}`}
                        onClick={() => {
                          if (hasCustomFiles) return;
                          setSelectedProductId(product.id);
                        }}
                      >
                        <img
                          src={product.frontImage}
                          alt={`${product.name} fronte`}
                          style={{ width: "100%", height: 190, objectFit: "cover", display: "block" }}
                        />
                        <div className="product-hover">
                          <img
                            src={product.backImage}
                            alt={`${product.name} retro`}
                            style={{ width: "100%", height: 190, objectFit: "cover", display: "block" }}
                          />
                        </div>
                        <div style={{ padding: 10 }}>
                          <p style={{ margin: 0, fontWeight: 600, fontSize: 13 }}>{product.name}</p>
                          <p className="muted" style={{ margin: "4px 0 0", fontSize: 12 }}>{product.category}</p>
                        </div>
                      </article>
                    ))}
                    <article className="product-card product-upload" onClick={onOpenCustomPicker}>
                      <div style={{ position: "relative", height: 190, overflow: "hidden" }}>
                        <img
                          src={selectedProduct.frontImage}
                          alt=""
                          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(4px)", transform: "scale(1.06)", opacity: 0.52 }}
                        />
                        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.5)" }} />
                      </div>
                      <div style={{ padding: 10, minHeight: 58, display: "grid", placeItems: "center" }}>
                        <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: "var(--white)", textAlign: "center" }}>
                          Carica una foto prodotto
                        </p>
                      </div>
                    </article>
                  </div>
                  <input ref={customFileInputRef} type="file" accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp" multiple style={{ display: "none" }} onChange={onCustomFilesChange} />
                  {hasCustomFiles && (
                    <p className="muted" style={{ margin: "8px 0 0", fontSize: 12 }}>
                      Upload custom attivo: {customFiles.map((f) => f.name).join(" · ")}
                    </p>
                  )}
                  {customUploadError && <p style={{ margin: "4px 0 0", fontSize: 12, color: "var(--danger)" }}>{customUploadError}</p>}
                  <div style={{ display: "grid", placeItems: "center", paddingTop: 12 }}>
                    <div className="gen-btn-wrapper">
                      <button className="gen-btn" onClick={runSimulator} aria-label="Generate">
                        <svg className="gen-btn-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                        </svg>
                        <div className="gen-txt-wrapper">
                          <div className="gen-txt-1">
                            {"Generate".split("").map((ch, i) => <span key={`g1-${i}`} className="gen-btn-letter">{ch}</span>)}
                          </div>
                          <div className="gen-txt-2">
                            {"Generating".split("").map((ch, i) => <span key={`g2-${i}`} className="gen-btn-letter">{ch}</span>)}
                          </div>
                        </div>
                      </button>
                    </div>
                    <p className="muted" style={{ fontSize: 13, marginTop: 10, textAlign: "center" }}>È gratis per davvero. E non ti chiediamo la mail per farti vedere il risultato.</p>
                  </div>
                </div>
              )}
              {simState === "loading" && (
                <div>
                  <div className="loader-stage">
                    <div className="loader-wrapper">
                      {"Generating".split("").map((ch, idx) => (
                        <span key={`loader-letter-${idx}`} className="loader-letter">{ch}</span>
                      ))}
                      <div className="loader" />
                    </div>
                  </div>
                  <p style={{ marginTop: 8, textAlign: "center" }}>{LOADING_STEPS[loadingStep]}</p>
                </div>
              )}
              {(simState === "result" || simState === "unlocked") && (
                <div>
                  <div className="web-browser" style={{ marginTop: 10 }}>
                    <div className="web-tabs-head">
                      <div className="web-tab-open">
                        <div className="web-rounded-l"><div className="web-mask-round" /></div>
                        <span>Webhook Preview</span>
                        <div className="close-tab">✕</div>
                        <div className="web-rounded-r"><div className="web-mask-round" /></div>
                      </div>
                      <div className="web-window-opt">
                        <button>-</button>
                        <button>□</button>
                        <button className="window-close">✕</button>
                      </div>
                    </div>
                    <div className="web-head-browser">
                      <button>←</button>
                      <button disabled>→</button>
                      <input type="text" placeholder="Search Google or type URL" value="webhook.response" readOnly />
                      <button>⋮</button>
                      <button className="star">✰</button>
                    </div>
                    <div className="web-body">
                      {webhookIsHtml && webhookHtmlResponse ? (
                        <iframe title="Anteprima risposta webhook" srcDoc={webhookHtmlResponse} sandbox="" />
                      ) : (
                        <div className="web-body-fallback">Il webhook non ha restituito HTML renderizzabile in anteprima.</div>
                      )}
                    </div>
                  </div>
                  <div style={{ marginTop: 10 }} />
                </div>
              )}
            </div>

            <div style={{ marginTop: 40 }}>
              <div className="rule" />
              <h3 style={{ fontSize: 22, fontWeight: 700, marginTop: 28 }}>Quanto ti costa oggi il lavoro manuale?</h3>
              <p className="muted" style={{ marginTop: 4, lineHeight: 1.55 }}>Inserisci i tuoi numeri. Scopri quante ore e quanto budget puoi recuperare quest'anno.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 12, marginTop: 16 }}>
                <div>
                  <label className="muted" style={{ fontSize: 13, display: "block", marginBottom: 6 }}>SKU gestite (circa)</label>
                  <input value={calcSku} onChange={(e) => setCalcSku(e.target.value)} placeholder="es. 500" type="number" style={{ width: "100%", borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg-card)", color: "var(--white)", padding: 11, boxSizing: "border-box" }} />
                </div>
                <div>
                  <label className="muted" style={{ fontSize: 13, display: "block", marginBottom: 6 }}>Minuti per scheda attuali</label>
                  <input value={calcMinutes} onChange={(e) => setCalcMinutes(e.target.value)} placeholder="es. 15" type="number" style={{ width: "100%", borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg-card)", color: "var(--white)", padding: 11, boxSizing: "border-box" }} />
                </div>
                <div>
                  <label className="muted" style={{ fontSize: 13, display: "block", marginBottom: 6 }}>Costo orario €</label>
                  <input value={calcCost} onChange={(e) => setCalcCost(e.target.value)} placeholder="es. 25" type="number" style={{ width: "100%", borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg-card)", color: "var(--white)", padding: 11, boxSizing: "border-box" }} />
                </div>
              </div>
              {(() => {
                const sku = parseInt(calcSku) || 0;
                const min = parseInt(calcMinutes) || 0;
                const cost = parseFloat(calcCost) || 0;
                if (!sku || !min || !cost) return null;
                const hoursMonth = (sku * min) / 60;
                const costMonth = hoursMonth * cost;
                const costYear = costMonth * 12;
                return (
                  <div style={{ marginTop: 20, padding: 20, background: "var(--coral-dim)", border: "1px solid var(--coral)", borderRadius: 14 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 16, textAlign: "center" }}>
                      <div>
                        <p className="mono" style={{ fontSize: 28, margin: 0, color: "var(--coral)" }}>{Math.round(hoursMonth)}h</p>
                        <p className="muted" style={{ margin: "4px 0 0", fontSize: 13 }}>ore / mese</p>
                      </div>
                      <div>
                        <p className="mono" style={{ fontSize: 28, margin: 0, color: "var(--coral)" }}>€{Math.round(costMonth).toLocaleString("it-IT")}</p>
                        <p className="muted" style={{ margin: "4px 0 0", fontSize: 13 }}>costo / mese</p>
                      </div>
                      <div>
                        <p className="mono" style={{ fontSize: 28, margin: 0, color: "var(--coral)" }}>€{Math.round(costYear).toLocaleString("it-IT")}</p>
                        <p className="muted" style={{ margin: "4px 0 0", fontSize: 13 }}>costo / anno</p>
                      </div>
                    </div>
                  </div>
                );
              })()}
              <p className="muted" style={{ fontSize: 13, marginTop: 10 }}>È una stima indicativa e nessun dato viene salvato. Fai tutte le prove che vuoi.</p>
            </div>
          </div>
        </section>

        <section className="container grid-bg" style={{ paddingBottom: 90, paddingTop: 60 }}>
          <div className="card" style={{ padding: 32 }}>
            <p className="kicker">Il controllo resta a te</p>
            <h2 style={{ marginTop: 10, fontSize: 44, letterSpacing: "-.02em", lineHeight: 1.1, fontWeight: 800 }}>L'AI fa il lavoro sporco.<br />Tu hai l'ultima parola.</h2>
            <p className="muted" style={{ maxWidth: "70ch", marginTop: 14, lineHeight: 1.65 }}>
              Sappiamo che affidare i dati aziendali a un algoritmo richiede fiducia. Per questo il nostro sistema è chiuso, sicuro e non pubblica mai nulla senza il tuo via libera.
            </p>
            <div className="two-col" style={{ marginTop: 28 }}>
              <div>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 24 }}>
                  <span style={{ fontSize: 26, lineHeight: 1 }}>👁</span>
                  <div>
                    <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Supervisione umana</h4>
                    <p className="muted" style={{ margin: "6px 0 0", lineHeight: 1.55 }}>Tu approvi, l'AI esegue. Niente va online in automatico.</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 26, lineHeight: 1 }}>🧪</span>
                  <div>
                    <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Si parte in piccolo</h4>
                    <p className="muted" style={{ margin: "6px 0 0", lineHeight: 1.55 }}>Testiamo su un campione di prodotti. Mai salti nel buio o pubblicazioni massive alla cieca.</p>
                  </div>
                </div>
              </div>
              <div>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 24 }}>
                  <span style={{ fontSize: 26, lineHeight: 1 }}>🔒</span>
                  <div>
                    <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Dati al sicuro</h4>
                    <p className="muted" style={{ margin: "6px 0 0", lineHeight: 1.55 }}>I tuoi database e i tuoi file originali non vengono mai toccati o sovrascritti.</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 26, lineHeight: 1 }}>✅</span>
                  <div>
                    <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Integrazione rapida</h4>
                    <p className="muted" style={{ margin: "6px 0 0", lineHeight: 1.55 }}>In 2–4 settimane il flusso è integrato, testato e funzionante nel tuo ecosistema.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={contactRef} className="container grid-bg" style={{ paddingBottom: 96 }}>
          <div className="card" style={{ padding: 40, textAlign: "center" }}>
            <p className="kicker">Facciamo due chiacchiere</p>
            <h2 style={{ fontSize: 44, margin: "12px 0", letterSpacing: "-.02em", lineHeight: 1.08, fontWeight: 800 }}>Capiamo se fa al caso tuo.<br />Senza provare a venderti niente.</h2>
            <p className="card__content" style={{ maxWidth: 700, margin: "0 auto 24px", lineHeight: 1.65 }}>In 20 minuti analizziamo come gestisci il catalogo oggi e ti diciamo onestamente se il nostro sistema può farti risparmiare tempo e soldi. Niente presentazioni commerciali infinite, andiamo dritti al punto.</p>

            <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "left" }}>
              <p style={{ margin: "0 0 8px", fontWeight: 600, fontSize: 15 }}>Il tuo ruolo:</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
                {["Head of eCommerce", "Digital Director", "Operations Manager", "CEO", "PIM Manager", "Altro"].map((r) => (
                  <button key={r} className="btn" style={{ background: contactRole === r ? "var(--coral)" : "transparent", color: contactRole === r ? "#fff" : "var(--white)", borderColor: contactRole === r ? "var(--coral)" : "var(--border-strong)" }} onClick={() => setContactRole(r)}>{r}</button>
                ))}
              </div>
              <p style={{ margin: "0 0 8px", fontWeight: 600, fontSize: 15 }}>SKU gestite (circa):</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
                {["Meno di 500", "500 – 2.000", "2.000 – 10.000", "Oltre 10.000"].map((s) => (
                  <button key={s} className="btn" style={{ background: contactSkuRange === s ? "var(--coral)" : "transparent", color: contactSkuRange === s ? "#fff" : "var(--white)", borderColor: contactSkuRange === s ? "var(--coral)" : "var(--border-strong)" }} onClick={() => setContactSkuRange(s)}>{s}</button>
                ))}
              </div>
            </div>

            <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "left" }}>
              <p style={{ margin: "0 0 8px", fontWeight: 600, fontSize: 15 }}>Lasciaci i tuoi dati:</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <input value={firstName} onChange={(e) => { setFirstName(e.target.value); setEmailError(""); }} placeholder="Nome *" style={{ borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg-card)", color: "var(--white)", padding: 12, fontSize: 14, fontFamily: "var(--font)" }} />
                <input value={lastName} onChange={(e) => { setLastName(e.target.value); setEmailError(""); }} placeholder="Cognome *" style={{ borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg-card)", color: "var(--white)", padding: 12, fontSize: 14, fontFamily: "var(--font)" }} />
              </div>
              <input value={email} onChange={(e) => { setEmail(e.target.value); setEmailError(""); }} placeholder="nome@tuaazienda.it *" style={{ width: "100%", marginTop: 10, borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg-card)", color: "var(--white)", padding: 12, fontSize: 14, fontFamily: "var(--font)", boxSizing: "border-box" }} />
              {emailError && <p style={{ color: "var(--coral)", fontSize: 13, marginTop: 6 }}>{emailError}</p>}
            </div>

            <button className="btn btn-primary" style={{ fontSize: 16, padding: "14px 36px", marginTop: 20 }} onClick={submitEmail}>Prenota la call</button>
            <p className="muted" style={{ fontSize: 13, marginTop: 12 }}>Scegli tu giorno e ora. Se capiamo che il servizio non fa per te, te lo diciamo subito.</p>
          </div>
        </section>

        <footer className="container" style={{ borderTop: "1px solid var(--border)", padding: "24px 24px 40px", display: "flex", justifyContent: "space-between" }}>
          <span className="muted">© 2026 Auiki</span>
          <a className="muted" href="#">Privacy Policy</a>
        </footer>
      </main>
    </div>
    </UiErrorBoundary>
  );
}
