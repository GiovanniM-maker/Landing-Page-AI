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
  { n: "01", title: "Ci mandi i dati grezzi", desc: "Excel, export PIM o CSV/XML in input pipeline.", image: "/flow/step-1.png" },
  { n: "02", title: "Il sistema li processa", desc: "Arricchimento attributi, SEO, HTML e tone of voice.", image: "/flow/step-2.png" },
  { n: "03", title: "Ricevi schede pronte", desc: "Output validato e pronto per import nel PIM.", image: "/flow/step-3.png" },
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
        <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "#f5f5f7", color: "#1d1d1f" }}>
          <div style={{ maxWidth: 760, width: "100%", background: "#fff", border: "1px solid #d2d2d7", borderRadius: 16, padding: 18 }}>
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
        <circle cx="50" cy="50" r={r} stroke="#e5e7eb" strokeWidth="8" fill="none" />
        <circle
          cx="50"
          cy="50"
          r={r}
          stroke={active ? "#ff375f" : "#9ca3af"}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform="rotate(-90 50 50)"
          style={{ transition: "stroke-dashoffset .4s ease" }}
        />
        <text x="50" y="52" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 18, fontWeight: 700, fill: "#111827" }}>
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
  const customFileInputRef = useRef<HTMLInputElement | null>(null);
  const m1 = useCountUp(15000, 1500, true);
  const m2 = useCountUp(80, 1200, true);
  const m3 = useCountUp(48, 1000, true);
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
    <div style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh", fontFamily: "Inter, sans-serif", overflowX: "hidden" }}>
      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
      :root{
        --bg:#050607;
        --bg-soft:#0a0e12;
        --ink:#f1f2f0;
        --muted:#a8afb8;
        --line:rgba(120,145,170,.22);
        --card:#0c1217;
        --accent:#f36a63;
        --primary:#f36a63;
        --primary-ink:#f36a63;
        --danger:#ff7670;
        --success:#68d894;
        --grid:rgba(120,145,170,.14);
      }
      .container{max-width:1240px;margin:0 auto;padding:0 28px}
      .mono{font-family:'Inter',sans-serif}
      .kicker{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--accent, var(--primary));font-weight:600}
      .card{background:var(--card);border:1px solid var(--line);border-radius:18px;box-shadow:0 12px 36px rgba(0,0,0,.24)}
      .card-dark{background:#0b1014;color:var(--ink);border:1px solid var(--line);border-radius:20px;box-shadow:0 12px 36px rgba(0,0,0,.24)}
      .btn{border-radius:999px;padding:11px 20px;border:1px solid var(--line);background:rgba(255,255,255,.02);color:var(--ink);cursor:pointer;font-weight:600;transition:all .2s ease}
      .btn:hover{border-color:rgba(241,242,240,.35);transform:translateY(-1px)}
      .btn-primary{background:var(--primary-ink);color:#fff;border-color:var(--primary-ink)}
      .btn-primary:hover{background:#e85a54;border-color:#e85a54;transform:translateY(-1px)}
      .muted{color:var(--muted)}
      .how-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
      .two-col{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}
      .rule{height:1px;background:var(--line)}
      .grid-bg{position:relative}
      .grid-bg::before{content:"";position:absolute;inset:0;background:
        linear-gradient(to right,var(--grid) 1px,transparent 1px),
        linear-gradient(to bottom,var(--grid) 1px,transparent 1px);
        background-size:28px 28px;pointer-events:none;z-index:0}
      .grid-bg > *{position:relative;z-index:1}
      .hero-visual{height:min(56vh,520px);border:1px solid var(--line);border-radius:18px;margin-bottom:34px;overflow:hidden;position:relative;background:
        radial-gradient(1200px 400px at 70% -20%,rgba(109,144,176,.24),transparent 55%),
        radial-gradient(700px 300px at 20% 0%,rgba(243,106,99,.18),transparent 48%),
        linear-gradient(180deg,#1a2733 0%,#0b1319 45%,#06090c 100%)}
      .hero-visual::after{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(5,6,7,.82),rgba(5,6,7,.14) 45%,rgba(5,6,7,.06))}
      .hero-visual::before{content:"";position:absolute;inset:0;background:
        linear-gradient(to right,var(--grid) 1px,transparent 1px),
        linear-gradient(to bottom,var(--grid) 1px,transparent 1px);
        background-size:32px 32px;opacity:.45}
      .hero-mark{position:absolute;left:22px;top:20px;font-size:12px;letter-spacing:.16em;color:rgba(241,242,240,.84);text-transform:uppercase;font-weight:700}
      .hero-content{position:relative;z-index:2;padding:32px 36px 40px;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;min-height:100%;box-sizing:border-box}
      .hero-circle{position:absolute;border-radius:999px;filter:blur(0.2px)}
      .hero-circle.c1{width:260px;height:260px;right:18%;top:18%;background:radial-gradient(circle at 35% 35%,rgba(241,242,240,.22),rgba(72,104,133,.08) 45%,rgba(5,6,7,0) 72%)}
      .hero-circle.c2{width:190px;height:190px;right:34%;top:30%;background:radial-gradient(circle at 50% 40%,rgba(243,106,99,.28),rgba(243,106,99,.04) 62%,rgba(0,0,0,0))}
      .how-step-card{--border-radius:.75rem;--primary-color:var(--primary-ink);--secondary-color:var(--muted);position:relative;padding:1rem 1rem 1.2rem;cursor:pointer;border-radius:var(--border-radius);background:#0e141a;box-shadow:0 8px 16px 0 rgba(0,0,0,.18);border:1px solid var(--line)}
      .how-step-card > * + *{margin-top:1.1em}
      .how-step-card .card__content{color:var(--secondary-color);font-size:.86rem;margin:0;line-height:1.5}
      .how-step-card .card__title{padding:0;font-size:1.3rem;font-weight:700;color:var(--ink);margin:0;line-height:1.15}
      .how-step-card .card__date{color:var(--muted);font-size:.8rem}
      .how-step-card .card__arrow{position:absolute;background:var(--primary-color);padding:.4rem;border-top-left-radius:var(--border-radius);border-bottom-right-radius:var(--border-radius);bottom:0;right:0;transition:.2s;display:flex;justify-content:center;align-items:center}
      .how-step-card .card__arrow svg{transition:.2s}
      .how-step-card:hover .card__title{color:var(--primary-color);text-decoration:underline}
      .how-step-card:hover .card__arrow{background:#13181f}
      .how-step-card:hover .card__arrow svg{transform:translateX(3px)}
      .product-carousel{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
      .product-card{position:relative;border:1px solid var(--line);border-radius:14px;overflow:hidden;background:#0f151b;cursor:pointer;transition:transform .2s ease, box-shadow .2s ease}
      .product-card:hover{transform:translateY(-2px);box-shadow:0 10px 24px rgba(0,0,0,.3)}
      .product-card.is-selected{border-color:var(--primary-ink);box-shadow:0 0 0 2px rgba(255,55,95,.22)}
      .product-card.is-disabled{opacity:.42;cursor:not-allowed;filter:grayscale(1)}
      .product-card.is-disabled:hover{transform:none;box-shadow:none}
      .product-hover{position:absolute;inset:0;background:#0f151b;transform:translateY(-102%);transition:transform .25s ease;z-index:2}
      .product-card:hover .product-hover{transform:translateY(0)}
      .product-upload{background:#0f151b}
      .product-upload:hover{transform:translateY(-2px);box-shadow:0 10px 24px rgba(0,0,0,.3)}
      .sim-chat-wrap{display:flex;flex-direction:column;width:100%}
      .sim-chat-shell{position:relative;display:flex;background:linear-gradient(to bottom right,#7e7e7e,#363636,#363636,#363636,#363636);border-radius:16px;padding:1.5px;overflow:hidden}
      .sim-chat-shell::after{position:absolute;content:"";top:-10px;left:-10px;background:radial-gradient(ellipse at center,#fff,rgba(255,255,255,.3),rgba(255,255,255,.1),rgba(0,0,0,0),rgba(0,0,0,0),rgba(0,0,0,0),rgba(0,0,0,0));width:30px;height:30px;filter:blur(1px)}
      .sim-chat-inner{display:flex;flex-direction:column;background-color:rgba(0,0,0,.56);border-radius:15px;width:100%;overflow:hidden}
      .sim-chat-body{padding:10px}
      .sim-chat-note{color:#f3f6fd;font-size:12px;opacity:.9;margin:0 0 8px}
      .sim-chat-options{display:flex;justify-content:space-between;align-items:flex-end;padding:10px}
      .sim-btns-add{display:flex;gap:8px}
      .sim-btns-add button{display:flex;color:rgba(255,255,255,.45);background-color:transparent;border:none;cursor:pointer;transition:all .3s ease}
      .sim-btns-add button:hover{transform:translateY(-5px);color:#fff}
      .sim-submit{display:flex;padding:2px;background-image:linear-gradient(to top,#292929,#555,#292929);border-radius:10px;box-shadow:inset 0 6px 2px -4px rgba(255,255,255,.5);cursor:pointer;border:none;outline:none;transition:all .15s ease}
      .sim-submit i{width:30px;height:30px;padding:6px;background:rgba(0,0,0,.1);border-radius:10px;backdrop-filter:blur(3px);color:#8b8b8b}
      .sim-submit svg{transition:all .3s ease}
      .sim-submit:hover svg{color:#f3f6fd;filter:drop-shadow(0 0 5px #fff)}
      .sim-submit:active{transform:scale(.92)}
      .sim-tags{padding:10px 0 2px;display:flex;color:#fff;font-size:10px;gap:6px;flex-wrap:wrap}
      .sim-tags span{padding:4px 8px;background-color:#1b1b1b;border:1.5px solid #363636;border-radius:10px;user-select:none}
      .gen-btn-wrapper{position:relative;display:inline-block}
      .gen-btn{--border-radius:24px;--padding:4px;--transition:.4s;--button-color:#101010;--highlight-color-hue:210deg;user-select:none;display:flex;justify-content:center;padding:.5em .5em .5em 1.1em;font-family:"Inter","Segoe UI",sans-serif;font-size:1em;font-weight:500;background-color:var(--button-color);box-shadow:inset 0 1px 1px rgba(255,255,255,.2),inset 0 2px 2px rgba(255,255,255,.15),inset 0 4px 4px rgba(255,255,255,.1),inset 0 8px 8px rgba(255,255,255,.05),inset 0 16px 16px rgba(255,255,255,.05),0 -1px 1px rgba(0,0,0,.02),0 -2px 2px rgba(0,0,0,.03),0 -4px 4px rgba(0,0,0,.05),0 -8px 8px rgba(0,0,0,.06),0 -16px 16px rgba(0,0,0,.08);border:solid 1px #fff2;border-radius:var(--border-radius);cursor:pointer;transition:box-shadow var(--transition),border var(--transition),background-color var(--transition);position:relative}
      .gen-btn::before{content:"";position:absolute;top:calc(0px - var(--padding));left:calc(0px - var(--padding));width:calc(100% + var(--padding)*2);height:calc(100% + var(--padding)*2);border-radius:calc(var(--border-radius) + var(--padding));pointer-events:none;background-image:linear-gradient(0deg,#0004,#000a);z-index:-1;transition:box-shadow var(--transition),filter var(--transition);box-shadow:0 -8px 8px -6px #0000 inset,0 -16px 16px -8px #0000 inset,1px 1px 1px #fff2,2px 2px 2px #fff1,-1px -1px 1px #0002,-2px -2px 2px #0001}
      .gen-btn::after{content:"";position:absolute;top:0;left:0;width:100%;height:100%;border-radius:inherit;pointer-events:none;background-image:linear-gradient(0deg,#fff,hsl(var(--highlight-color-hue),100%,70%),hsla(var(--highlight-color-hue),100%,70%,.5),8%,transparent);background-position:0 0;opacity:0;transition:opacity var(--transition),filter var(--transition)}
      .gen-btn-letter{position:relative;display:inline-block;color:#fff5;animation:letter-anim 2s ease-in-out infinite;transition:color var(--transition),text-shadow var(--transition),opacity var(--transition)}
      .gen-btn-svg{flex-grow:1;height:24px;margin-right:.5rem;fill:#e8e8e8;animation:flicker 2s linear infinite;animation-delay:.5s;filter:drop-shadow(0 0 2px #fff9);transition:fill var(--transition),filter var(--transition),opacity var(--transition)}
      .gen-txt-wrapper{position:relative;display:flex;align-items:center;min-width:6.4em}
      .gen-txt-1,.gen-txt-2{position:absolute;word-spacing:-1em}
      .gen-txt-1{animation:appear-anim 1s ease-in-out forwards}
      .gen-txt-2{opacity:0}
      .gen-btn:hover{border:solid 1px hsla(var(--highlight-color-hue),100%,80%,40%)}
      .gen-btn:hover::before{box-shadow:0 -8px 8px -6px #fffa inset,0 -16px 16px -8px hsla(var(--highlight-color-hue),100%,70%,.3) inset,1px 1px 1px #fff2,2px 2px 2px #fff1,-1px -1px 1px #0002,-2px -2px 2px #0001}
      .gen-btn:hover::after{opacity:1;mask-image:linear-gradient(0deg,#fff,transparent)}
      .gen-btn:hover .gen-btn-svg{fill:#fff;filter:drop-shadow(0 0 3px hsl(var(--highlight-color-hue),100%,70%)) drop-shadow(0 -4px 6px #0009);animation:none}
      .loader-stage{display:grid;place-items:center;min-height:420px;background:#212121;border-radius:10px}
      .loader-wrapper{position:relative;display:flex;align-items:center;justify-content:center;width:180px;height:180px;font-family:"Inter",sans-serif;font-size:1.2em;font-weight:300;color:#fff;border-radius:50%;background-color:transparent;user-select:none}
      .loader{position:absolute;top:0;left:0;width:100%;aspect-ratio:1 / 1;border-radius:50%;background-color:transparent;animation:loader-rotate 2s linear infinite;z-index:0}
      @keyframes loader-rotate{
        0%{transform:rotate(90deg);box-shadow:0 10px 20px 0 #fff inset,0 20px 30px 0 #ad5fff inset,0 60px 60px 0 #471eec inset}
        50%{transform:rotate(270deg);box-shadow:0 10px 20px 0 #fff inset,0 20px 10px 0 #d60a47 inset,0 40px 60px 0 #311e80 inset}
        100%{transform:rotate(450deg);box-shadow:0 10px 20px 0 #fff inset,0 20px 30px 0 #ad5fff inset,0 60px 60px 0 #471eec inset}
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
      .notice-card{background:#f2f3f7;border-radius:.75em;transition:ease .2s;box-shadow:1em 1em 1em #d8dae0b1,-.75em -.75em 1em #fff;border:1.5px solid #f2f3f7}
      .notice-card:hover{background:#d3ddf1;border:1.5px solid #1677ff}
      .notice-container{margin:1.25em 2em 1.375em 1.375em;display:flex;flex-direction:row;gap:.75em}
      .notice-status{width:.625em;height:.625em;margin:.375em 0;border-radius:.5em;background:#ff0000}
      .notice-right{display:flex;flex-direction:column;gap:.875em}
      .notice-text-wrap{display:flex;flex-direction:column;gap:.25em;color:#333}
      .notice-text{margin:0;font-size:15px;line-height:1.55}
      .notice-link{font-weight:500;text-decoration:none;color:#000}
      .notice-time{font-size:.875em;color:#777;margin:0}
      .notice-btn-wrap{display:flex;flex-direction:row;gap:1em;align-items:center}
      .notice-primary{font-size:15px;background-color:transparent;font-weight:600;color:#1677ff;border:none;border-radius:1.5em;cursor:pointer}
      .notice-secondary{background-color:transparent;border:none;font-size:15px;font-weight:400;color:#666;cursor:pointer}
      .notice-btn-wrap button:hover{text-decoration:underline}
      .web-browser{width:100%;height:560px;background:lightgrey;border-radius:7px;display:flex;flex-direction:column;overflow:hidden;position:relative;box-shadow:5px 5px 10px rgba(31,31,31,.245)}
      .web-tabs-head{background-color:#353535;height:40px;display:flex;justify-content:space-between;align-items:end;padding-left:20px}
      .web-tab-open{width:140px;height:34px;border-radius:7px 7px 0 0;background-color:#515151;display:flex;gap:5px;align-items:start;justify-content:space-between;padding:4px 8px;position:relative}
      .web-tab-open .close-tab{color:#fff;font-size:9px;padding:1px 4px;border-radius:50%}
      .web-tab-open .close-tab:hover{background-color:#5d5d5d}
      .web-rounded-l,.web-rounded-r{position:absolute;background-color:#515151;width:20px;height:24px;top:0;overflow:hidden}
      .web-rounded-l{right:0;transform:translate(100%)}
      .web-rounded-r{left:0;transform:translate(-100%)}
      .web-mask-round{width:100%;height:100%;background-color:#353535}
      .web-rounded-l .web-mask-round{border-radius:0 0 0 7px}
      .web-rounded-r .web-mask-round{border-radius:0 0 7px 0}
      .web-tab-open span{color:#fff;font-size:10px}
      .web-window-opt{display:flex}
      .web-window-opt button{height:30px;width:30px;border:none;background-color:transparent;transition:.1s ease-out;color:#fff;margin-bottom:10px}
      .web-window-opt button:hover{background-color:#515151c8}
      .web-window-opt .window-close:hover{background-color:rgb(255,52,52)}
      .web-head-browser{position:absolute;top:30px;width:100%;height:40px;background-color:#515151;padding:7px;display:flex;border-radius:7px 7px 0 0;gap:5px}
      .web-head-browser input{background-color:#3b3b3b;border:2px solid transparent;height:100%;border-radius:20px;outline:none;color:#fff;padding:0 15px;flex:1;transition:.2s ease-in-out}
      .web-head-browser input:hover{background-color:#5d5d5d}
      .web-head-browser input:focus{border-color:rgb(173,214,255);background-color:#3b3b3b;transition:none}
      .web-head-browser input::placeholder{color:#fff}
      .web-head-browser button{width:27px;height:25px;border:none;background-color:transparent;color:#fff;border-radius:50%;transition:.2s ease-in-out}
      .web-head-browser button:disabled{opacity:.4}
      .web-head-browser button:hover{background-color:#5d5d5d}
      .web-head-browser button:disabled:hover{background-color:transparent}
      .web-head-browser .star{color:#fff;position:absolute;right:45px;top:50%;transform:translateY(-50%);font-size:15px;opacity:.7;height:18px;width:19px;display:flex;align-items:center;justify-content:center;padding-bottom:3px}
      .web-body{margin-top:70px;height:calc(100% - 70px);background:#0f141a}
      .web-body iframe{width:100%;height:100%;border:none;background:#fff;display:block}
      .web-body-fallback{padding:12px;color:#b4bdc8;font-size:13px}
      .ai-modal-backdrop{position:fixed;inset:0;background:rgba(10,10,12,.48);display:grid;place-items:center;z-index:70;padding:20px}
      .ai-modal{width:min(920px,96vw);max-height:88vh;overflow:auto;background:#0c1217;border:1px solid var(--line);border-radius:18px;box-shadow:0 28px 60px rgba(0,0,0,.4)}
      .ai-modal-head{position:sticky;top:0;background:#0c1217;border-bottom:1px solid var(--line);padding:14px 16px;display:flex;justify-content:space-between;align-items:center;z-index:2}
      .ai-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
      .ai-block{border:1px solid var(--line);border-radius:12px;padding:12px;background:#0e141a}
      .ai-list{margin:0;padding-left:18px;display:grid;gap:6px}
      .ai-pill{display:inline-flex;border:1px solid var(--line);border-radius:999px;padding:4px 10px;font-size:12px;background:rgba(255,255,255,.04)}
      @media (max-width:980px){.how-grid,.two-col{grid-template-columns:1fr}}
      @media (max-width:980px){.hero-visual{height:42vh;border-radius:14px}.hero-circle{display:none}}
      @media (max-width:840px){.container{padding:0 18px}}
      @media (max-width:840px){h1{font-size:56px !important;line-height:0.96 !important}}
      @media (max-width:840px){.stats-grid{grid-template-columns:repeat(2,minmax(0,1fr)) !important}}
      `}</style>

      <nav style={{ position: "fixed", insetInline: 0, top: 0, zIndex: 40, borderBottom: "1px solid var(--line)", background: scrolled ? "rgba(5,6,7,.94)" : "rgba(5,6,7,.84)", backdropFilter: "blur(10px)" }}>
        <div className="container" style={{ height: 74, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <strong style={{ letterSpacing: 1.2, fontWeight: 700 }}>AUIKI</strong>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn" onClick={() => scrollTo(howRef)}>Come funziona</button>
            <button className="btn btn-primary" onClick={() => scrollTo(simulatorRef)}>Prenota una demo</button>
          </div>
        </div>
      </nav>

      <main>
        <section className="container grid-bg" style={{ paddingTop: 146, paddingBottom: 96, textAlign: "left" }}>
          <div className="hero-visual">
            <span className="hero-circle c1" aria-hidden="true" />
            <span className="hero-circle c2" aria-hidden="true" />
            <div className="hero-content">
              <span className="kicker">Focus retailer</span>
              <h1 style={{ fontSize: 84, lineHeight: 0.94, letterSpacing: "-.03em", maxWidth: 860, margin: "18px 0", fontWeight: 800, color: "var(--ink)" }}>Dai dati fornitore ai prodotti online.<br />Verificati e pubblicati.</h1>
              <p className="muted" style={{ maxWidth: 760, margin: "0 0 28px", fontSize: 20 }}>
                Auiki trasforma dati prodotto in output verificati e pronti canale. Case study Eataly: -80% tempo operativo.
              </p>
              <button className="btn btn-primary" onClick={() => scrollTo(simulatorRef)}>Prenota una demo</button>
            </div>
          </div>

          <div style={{ marginTop: 48 }} className="rule" />
          <div className="stats-grid" style={{ paddingTop: 24, display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 12, textAlign: "left" }}>
            {[{ v: `${m1.toLocaleString("it-IT")}+`, l: "Referenze processate" }, { v: `${m2}%`, l: "Tempo risparmiato" }, { v: "<4", l: "Settimane al ROI" }, { v: `${m3}h`, l: "Consegna media" }].map((m) => (
              <div key={m.l}><p className="mono" style={{ fontSize: 36, margin: 0, letterSpacing: "-.02em" }}>{m.v}</p><p className="muted" style={{ margin: 0 }}>{m.l}</p></div>
            ))}
          </div>
        </section>

        <section className="container grid-bg" style={{ paddingBottom: 90 }}>
          <div className="card" style={{ padding: 32 }}>
            <p className="kicker">La sfida</p>
            <h2 style={{ marginTop: 10, fontSize: 44, letterSpacing: "-.02em", lineHeight: 1.1, fontWeight: 800 }}>La complessità dei dati fornitore limita la crescita</h2>
            <div className="two-col" style={{ marginTop: 20 }}>
              <div>
                <h3 className="card__title" style={{ fontSize: 24, marginTop: 0 }}>Stato attuale</h3>
                <ul className="card__content" style={{ lineHeight: 1.7, margin: 0, paddingLeft: 18 }}>
                  <li>Formati dati eterogenei tra fornitori</li>
                  <li>Validazione manuale lenta e costosa</li>
                  <li>Onboarding fornitori in mesi</li>
                </ul>
              </div>
              <div>
                <h3 className="card__title" style={{ fontSize: 24, marginTop: 0 }}>Con Auiki</h3>
                <ul className="card__content" style={{ lineHeight: 1.7, margin: 0, paddingLeft: 18 }}>
                  <li>Ingestion unificata e normalizzazione automatica</li>
                  <li>Arricchimento operativo su schede reali</li>
                  <li>Go-live in giorni, non mesi</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section ref={howRef} className="container grid-bg" style={{ paddingBottom: 100 }}>
          <p className="kicker">Come funziona</p>
          <h2 style={{ fontSize: 58, lineHeight: 1.02, letterSpacing: "-.03em", marginTop: 10, fontWeight: 800 }}>Dal caos fornitore al controllo catalogo in tre step</h2>
          <p className="muted" style={{ maxWidth: "56ch", marginTop: 14, lineHeight: 1.6 }}>Importazione, arricchimento e pubblicazione in un flusso unico con output pronto per il PIM.</p>
          <div className="how-grid" style={{ marginTop: 32 }}>
            {HOW_STEPS.map((step) => (
              <article key={step.n} className="how-step-card">
                <h3 className="card__title">{step.title}</h3>
                <p className="card__content">{step.desc}</p>
                <img src={step.image} alt={step.title} loading="lazy" style={{ width: "100%", borderRadius: 10, border: "1px solid var(--line)", opacity: 0.92 }} />
                <div className="card__date">Step {step.n}</div>
                <div className="card__arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15" width="15">
                    <path fill="#fff" d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z" />
                  </svg>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="container grid-bg" style={{ paddingBottom: 100 }}>
          <p className="kicker">Risultati per settore</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "12px 0 18px" }}>
            {SECTOR_RESULTS.map((s, i) => (
              <button key={s.sector} className="btn" style={{ background: i === activeSectorTab ? "var(--primary-ink)" : "rgba(255,255,255,.02)", color: i === activeSectorTab ? "#fff" : "var(--ink)" }} onClick={() => setActiveSectorTab(i)}>
                {s.sector}
              </button>
            ))}
          </div>
          <div className="two-col">
            <article className="card" style={{ padding: 16 }}>
              <p className="kicker">Prima / Dopo</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div style={{ border: "1px solid var(--line)", borderRadius: 10, padding: 12, background: "rgba(255,255,255,.02)" }}>
                  <p className="muted" style={{ margin: 0 }}>Prima</p>
                  <p className="mono" style={{ fontSize: 34, margin: "5px 0", color: "var(--danger)" }}>{activeSector.before}/100</p>
                  <p className="muted" style={{ margin: 0 }}>Campi critici elevati</p>
                </div>
                <div style={{ border: "1px solid var(--line)", borderRadius: 10, padding: 12, background: "rgba(104,216,148,.1)" }}>
                  <p className="muted" style={{ margin: 0 }}>Dopo</p>
                  <p className="mono" style={{ fontSize: 34, margin: "5px 0", color: "var(--success)" }}>{activeSector.after}/100</p>
                  <p className="muted" style={{ margin: 0 }}>Schede pronte import</p>
                </div>
              </div>
              <p className="muted" style={{ marginBottom: 0 }}><strong>Volume:</strong> {activeSector.products} · <strong>Consegna:</strong> {activeSector.time}</p>
            </article>

            <article className="card" style={{ padding: 16 }}>
              <p className="kicker">Output operativo consegnato</p>
              <ul className="muted" style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 7 }}>
                {activeSector.outputs.map((o) => <li key={o}>{o}</li>)}
              </ul>
            </article>
          </div>
        </section>

        <section
          ref={simulatorRef}
          style={{
            paddingBottom: 78,
            background: "#070b0e",
            borderTop: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <div className="container grid-bg" style={{ paddingTop: 24, color: "#f5f5f7" }}>
            <p className="kicker" style={{ color: "#9ca3af" }}>Il simulatore</p>
            <h2 style={{ marginTop: 8, fontSize: 44, letterSpacing: "-.02em", lineHeight: 1.08, fontWeight: 800 }}>Prova il motore sulla tua scheda prodotto</h2>
            <p className="muted">Seleziona un prodotto dal carosello. Passa il mouse per vedere la seconda foto e avvia l'analisi.</p>
            <div style={{ color: "var(--ink)", paddingTop: 16 }}>
              {simState === "idle" && (
                <div style={{ padding: "12px 0 10px" }}>
                  <p className="muted" style={{ marginTop: 0, marginBottom: 10, textAlign: "center" }}>
                    Seleziona un prodotto dal carosello oppure carica immagini custom da inviare al webhook.
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
                        <div style={{ position: "absolute", inset: 0, background: "rgba(5,6,7,.5)" }} />
                      </div>
                      <div style={{ padding: 10, minHeight: 58, display: "grid", placeItems: "center" }}>
                        <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: "var(--ink)", textAlign: "center" }}>
                          Carica la foto del tuo prodotto
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
                  {simState === "result" ? (
                    <div style={{ marginTop: 12, textAlign: "center" }}>
                      <h3 style={{ marginBottom: 8 }}>Vuoi continuare con lo sblocco completo?</h3>
                      <div style={{ display: "grid", gap: 8, justifyContent: "center", maxWidth: 680, margin: "0 auto" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                          <input value={firstName} onChange={(e) => { setFirstName(e.target.value); setEmailError(""); }} placeholder="Nome *" style={{ borderRadius: 10, border: "1px solid var(--line)", background: "var(--card)", color: "var(--ink)", padding: 11 }} />
                          <input value={lastName} onChange={(e) => { setLastName(e.target.value); setEmailError(""); }} placeholder="Cognome *" style={{ borderRadius: 10, border: "1px solid var(--line)", background: "var(--card)", color: "var(--ink)", padding: 11 }} />
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <input value={email} onChange={(e) => { setEmail(e.target.value); setEmailError(""); }} placeholder="nome@tuaazienda.it *" style={{ minWidth: 300, flex: 1, borderRadius: 10, border: "1px solid var(--line)", background: "var(--card)", color: "var(--ink)", padding: 11 }} />
                          <button className="btn btn-primary" onClick={submitEmail}>Invio</button>
                        </div>
                      </div>
                      {emailError && <p style={{ color: "#f97316" }}>{emailError}</p>}
                    </div>
                  ) : (
                    <div style={{ marginTop: 10 }} />
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="container grid-bg" style={{ paddingBottom: 96 }}>
          <div className="card" style={{ padding: 40, textAlign: "center" }}>
            <p className="kicker">Prossimo passo</p>
            <h2 style={{ fontSize: 48, margin: "12px 0", letterSpacing: "-.02em", lineHeight: 1.08, fontWeight: 800 }}>Pronto a trasformare le operazioni del tuo catalogo?</h2>
            <p className="card__content" style={{ maxWidth: 700, margin: "0 auto 18px" }}>Parti con una discovery call di 20 minuti. Ti mostriamo il piano operativo su dati reali.</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button className="btn btn-primary">Prenota una demo →</button>
              <button className="btn">Contattaci</button>
            </div>
          </div>
        </section>

        <section className="container grid-bg" style={{ paddingBottom: 64 }}>
          <h3 style={{ fontSize: 32, marginBottom: 4, letterSpacing: "-.02em", fontWeight: 700 }}>Domande frequenti</h3>
          {FAQS.map((f, i) => (
            <div key={f.q} className="how-step-card" style={{ marginTop: 12, paddingBottom: "2.1rem" }}>
              <button
                style={{ width: "100%", textAlign: "left", border: "none", background: "transparent", padding: 0, cursor: "pointer", paddingRight: 34 }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="card__title" style={{ fontSize: 22 }}>{f.q}</span>
              </button>
              {openFaq === i && <p className="card__content" style={{ marginBottom: 0 }}>{f.a}</p>}
              <div className="card__arrow" aria-hidden="true">
                <span style={{ color: "#fff", fontWeight: 700, lineHeight: 1 }}>{openFaq === i ? "−" : "+"}</span>
              </div>
            </div>
          ))}
        </section>

        <footer className="container" style={{ borderTop: "1px solid var(--line)", padding: "24px 24px 40px", display: "flex", justifyContent: "space-between" }}>
          <span className="muted">© 2026 Auiki</span>
          <a className="muted" href="#">Privacy Policy</a>
        </footer>
      </main>
    </div>
    </UiErrorBoundary>
  );
}
