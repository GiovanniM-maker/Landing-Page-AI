export const SECTORS = [
  'Food & Beverage',
  'Fashion',
  'Beauty',
  'Elettronica',
  'Industrial',
  'Altro',
] as const;

export type SectorKey = (typeof SECTORS)[number];

export const SECTOR_EXAMPLES: Record<SectorKey, string> = {
  'Food & Beverage':
    'Olio Extra Vergine di Oliva Biologico 500ml\nProduttore: Frantoio del Poggio, Toscana\nCategoria: Condimenti\nPrezzo: 12,90 EUR\nConfezione: Bottiglia vetro scuro\nNote: Spremuto a freddo',
  Fashion:
    'Giacca invernale uomo lana merino\nColore: blu navy\nTaglie: S-XL\nPrezzo: 289 EUR\nLavaggio a mano\nMade in Italy\nCollezione Inverno 2026',
  Beauty:
    'Crema viso idratante 50ml\nPelle sensibile\nCon acido ialuronico\nSenza parabeni\nMade in Italy\nPrezzo: 34,90 EUR',
  Elettronica:
    'Cuffie wireless over-ear\nBluetooth 5.3\nANC attivo\nBatteria 30h\nRicarica USB-C\nPeso: 250g\nPrezzo: 149 EUR',
  Industrial:
    'Trapano a percussione 800W\nMandrino 13mm\nVelocita variabile 0-3000 rpm\nImpugnatura ergonomica\nValigetta inclusa\nGaranzia 2 anni',
  Altro:
    'Prodotto esempio categoria generica\nMateriale: da specificare\nDimensioni: da specificare\nPrezzo: da definire',
};

export const SECTOR_RESULTS = [
  {
    sector: 'Fashion',
    products: '500 schede',
    attrs: "taglia, materiale, vestibilita, stagione, occasione d'uso",
    time: '6 ore',
  },
  {
    sector: 'Beauty',
    products: '300 schede',
    attrs: 'INCI, claim regolamentari, routine, cross-selling',
    time: '4 ore',
  },
  {
    sector: 'Food & Beverage',
    products: '15.000 referenze Eataly',
    attrs: 'allergeni, provenienza, abbinamenti, certificazioni',
    time: '48 ore',
  },
  {
    sector: 'Industrial',
    products: '1.200 schede tecniche',
    attrs: 'specifiche, compatibilita, normative, ricambi',
    time: '12 ore',
  },
];

export const FAQ_ITEMS = [
  {
    q: 'Funziona con il mio PIM?',
    a: "Esportiamo in CSV, XML, JSON. Se il tuo PIM accetta un'importazione dati, funziona. Akeneo, Magento, Shopify Plus, Salesforce Commerce Cloud, Pimcore: li abbiamo gia integrati.",
  },
  {
    q: 'Quanto tempo ci vuole?',
    a: 'Un catalogo di 10.000 referenze viene processato in media in 48 ore. Per test pilota su 200-500 prodotti, il risultato arriva in 24 ore.',
  },
  {
    q: 'I miei dati sono al sicuro?',
    a: 'Lavoriamo sotto NDA. I dati vengono processati su infrastruttura europea e cancellati al termine del progetto. Possiamo firmare prima di ricevere qualsiasi dato.',
  },
  {
    q: 'Quanto costa?',
    a: 'Dipende dal volume e dalla complessita. Il punto e il costo attuale del processo manuale: tempi lunghi, errori e ritardi di go-live. Offriamo un audit gratuito su 50 prodotti per quantificare il risparmio.',
  },
  {
    q: 'In cosa siete diversi da ChatGPT?',
    a: 'ChatGPT genera testo. Noi produciamo schede enterprise-ready: mappatura dati complessi, tone of voice del brand, formattazione per il PIM specifico e ottimizzazione per la conversione.',
  },
];

export const MOCK_RESULT = {
  score: 47,
  maxScore: 100,
  areas: [
    { name: 'Attributi tecnici', value: '3 su 12 presenti', status: 'red' as const },
    { name: 'Ottimizzazione SEO', value: 'Assente', status: 'red' as const },
    { name: 'Cross-selling', value: 'Non configurato', status: 'red' as const },
    { name: 'Struttura HTML', value: 'Base', status: 'orange' as const },
    { name: 'Tone of Voice', value: 'Non definito', status: 'orange' as const },
  ],
  benchmark: {
    you: 47,
    sectorAvg: 52,
    topPerformer: 78,
  },
  enriched: {
    title: 'Giacca Invernale Uomo in Lana Merino Premium  Blu Navy | Collezione Inverno 2026',
    attributes: [
      'Materiale: 100% Lana Merino Extra-Fine (19.5 micron)',
      'Vestibilità: Regular Fit  Consigliamo la taglia abituale',
      'Manutenzione: Lavaggio a mano a 30°C  Non asciugare in asciugatrice',
      'Stagione: Autunno/Inverno 2026',
      'Origine: Made in Italy  Produzione artigianale',
      'Tag SEO: giacca lana merino uomo, cappotto invernale blu, giacca italiana premium',
      'Cross-selling suggerito: "Completa il look: Sciarpa in cashmere, Guanti in pelle, Berretto in lana"',
    ],
    metaDescription:
      'Giacca uomo in lana merino premium, vestibilità regular, produzione artigianale Made in Italy. Ideale per la stagione fredda. Spedizione gratuita sopra i 99€.',
    htmlStructure: `<h1>Giacca Invernale Uomo in Lana Merino Premium</h1>
<p class="subtitle">Blu Navy | Collezione Inverno 2026</p>
<div class="attributes">...</div>`,
  },
};

const CONSUMER_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'icloud.com',
  'libero.it',
  'virgilio.it',
  'alice.it',
  'tin.it',
  'tiscali.it',
  'live.com',
  'aol.com',
  'mail.com',
  'protonmail.com',
  'zoho.com',
];

export function isConsumerEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  const domain = normalized.split('@')[1];
  if (!domain) return true;
  return CONSUMER_DOMAINS.includes(domain);
}

export function getSectorSlug(label: string): string {
  const map: Record<string, string> = {
    'Food & Beverage': 'food-beverage',
    Fashion: 'fashion',
    Beauty: 'beauty',
    Elettronica: 'electronics',
    Industrial: 'industrial',
    Altro: 'other',
  };
  return map[label] ?? 'other';
}
