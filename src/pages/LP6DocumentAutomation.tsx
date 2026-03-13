import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, FileText, Receipt, FileSignature, Mail, BarChart3, ChevronDown, CheckCircle, Upload, Clock, Shield } from 'lucide-react';
import LandingNavbar from '../components/landing/LandingNavbar';
import MainFooter from '../components/landing/MainFooter';

const NAV_LINKS = [
  { label: 'Il problema', id: 'problema' },
  { label: 'Come funziona', id: 'come-funziona' },
  { label: 'Per chi è', id: 'per-chi' },
];

const DOC_TYPES = ['Preventivi', 'Fatture', 'Contratti', 'Email di risposta', 'Report interni'] as const;
type DocType = typeof DOC_TYPES[number];

const DOC_ICONS: Record<DocType, typeof FileText> = {
  Preventivi: FileText,
  Fatture: Receipt,
  Contratti: FileSignature,
  'Email di risposta': Mail,
  'Report interni': BarChart3,
};

const DOC_DEMOS: Record<DocType, { before: string; after: string; time: string }> = {
  Preventivi: {
    before: `Da: marco.rossi@clienteXYZ.it
Oggetto: Richiesta preventivo

Buongiorno,
siamo un'azienda di 50 dipendenti nel settore food.
Avremmo bisogno di un servizio di consulenza per la
digitalizzazione dei processi di magazzino.
Budget indicativo: 15-20k.
Tempistiche: entro Q2 2026.
Grazie, Marco Rossi  Direttore Operativo`,
    after: `PREVENTIVO N. 2026-0847
Cliente: XYZ S.r.l.  Settore Food & Beverage

SERVIZIO: Consulenza Digitalizzazione Magazzino

Fase 1  Audit & Assessment (2 settimane)
  Analisi AS-IS dei processi .................. €3.500

Fase 2  Progettazione TO-BE (3 settimane)
  Disegno nuovi flussi + selezione tool ...... €5.000

Fase 3  Implementazione (4 settimane)
  Setup, integrazione, training team .......... €8.500

TOTALE: €17.000 + IVA
Validità: 30 giorni
Pagamento: 30% anticipo, 40% SAL, 30% a consegna`,
    time: '40 secondi',
  },
  Fatture: {
    before: `Preventivo 2026-0832 approvato dal cliente ABC S.r.l.
Importo concordato: €8.500 + IVA
Termini: pagamento a 30gg fine mese
Dati fiscali già nel sistema`,
    after: `FATTURA N. 2026/FV-0291
Data: 11/03/2026
Cliente: ABC S.r.l.  P.IVA 03456789012

Descrizione: Servizio di consulenza marketing Q1 2026
come da preventivo n. 2026-0832

Imponibile: €8.500,00
IVA 22%: €1.870,00
TOTALE: €10.370,00

Scadenza pagamento: 30/04/2026
IBAN: IT60X0542811101000000123456

[Sollecito automatico programmato: 01/05/2026]`,
    time: '15 secondi',
  },
  Contratti: {
    before: `Nuovo cliente: Studio Legale Bianchi
Servizio: Pacchetto consulenza annuale Premium
Valore: €24.000/anno
Inizio: 01/04/2026
Durata: 12 mesi con rinnovo tacito
Clausole speciali: NDA incluso`,
    after: `CONTRATTO DI CONSULENZA PROFESSIONALE

Tra: [La Tua Azienda S.r.l.] (di seguito "Fornitore")
E: Studio Legale Bianchi e Associati (di seguito "Cliente")

Art. 1  Oggetto
Il Fornitore si impegna a fornire il servizio di
consulenza Premium come da allegato A.

Art. 2  Durata
Dal 01/04/2026 al 31/03/2027. Rinnovo tacito.

Art. 3  Corrispettivo
€24.000 annui (€2.000/mese) + IVA

Art. 4  Riservatezza (NDA)
[clausola NDA standard compilata]

⚠️ ATTENZIONE: Art. 5 (Limitazione responsabilità)
richiede revisione legale prima della firma.

[Pronto per firma digitale via DocuSign]`,
    time: '35 secondi',
  },
  'Email di risposta': {
    before: `Da: info@fornitoreABC.it
Oggetto: Conferma ordine materiali

Gentile cliente,
confermiamo ricezione ordine n. 4521.
Consegna prevista: 18/03/2026.
Preghiamo confermare indirizzo di consegna
e fascia oraria preferita.
Distinti saluti`,
    after: `Oggetto: Re: Conferma ordine materiali  Ordine 4521

Buongiorno,

grazie per la conferma. Ecco i dettagli:

📍 Indirizzo: Via dell'Industria 15, 35010 Padova (PD)
🕐 Fascia oraria: 9:00-12:00 (riferimento: Sig. Neri, magazzino)
📞 Contatto: +39 049 XXX XXXX

Confermiamo la data del 18/03. In caso di variazioni,
preghiamo comunicare con almeno 48 ore di anticipo.

Cordiali saluti,
[Firma aziendale automatica]`,
    time: '10 secondi',
  },
  'Report interni': {
    before: `Dati settimana 10-14 marzo 2026:
- 12 preventivi inviati (3 approvati)
- 8 fatture emesse per €47.200
- 2 contratti in attesa di firma
- 15 email gestite dall'AI
- Tempo admin risparmiato: ~6 ore`,
    after: `REPORT SETTIMANALE  10-14 Marzo 2026

📊 COMMERCIALE
Preventivi inviati: 12 (+20% vs settimana prec.)
Tasso approvazione: 25% (3/12)
Valore pipeline: €78.500

💰 FATTURAZIONE
Fatture emesse: 8  Totale: €47.200
Incassi ricevuti: €31.400
Scaduti: €8.200 (2 fatture  sollecito automatico inviato)

📋 CONTRATTI
In attesa firma: 2 (valore: €36.000)
Firmati questa settimana: 1

🤖 AUTOMAZIONE
Email gestite dall'AI: 15/18 (83% autonomia)
Tempo admin risparmiato: ~6 ore
Equivalente economico: €480

[Generato automaticamente  prossimo report: 21/03/2026]`,
    time: '20 secondi',
  },
};

const SECTORS = ['Studio professionale', 'Agenzia', 'PMI manifatturiera', 'Studio medico'] as const;
type SectorType = typeof SECTORS[number];

const SECTOR_FLOWS: Record<SectorType, { flow: string; timeSaved: string }> = {
  'Studio professionale': {
    flow: 'Ricezione documenti cliente → Estrazione dati → Compilazione dichiarazioni → Generazione lettere di accompagnamento → Archiviazione automatica',
    timeSaved: '12 ore/settimana risparmiate',
  },
  'Agenzia': {
    flow: 'Brief cliente via email → Preventivo personalizzato → Contratto di servizio → Report mensile automatico → Fatturazione a milestone',
    timeSaved: '8 ore/settimana risparmiate',
  },
  'PMI manifatturiera': {
    flow: 'Ordine fornitore → DDT automatico → Fattura di accompagnamento → Comunicazione cliente → Report magazzino settimanale',
    timeSaved: '10 ore/settimana risparmiate',
  },
  'Studio medico': {
    flow: 'Modulo paziente → Consenso informato → Referto preliminare → Comunicazione assicurazione → Archiviazione fascicolo',
    timeSaved: '6 ore/settimana risparmiate',
  },
};

const FAQ_ITEMS = [
  {
    q: 'I miei documenti sono troppo specifici e complessi?',
    a: 'Il sistema viene configurato sui tuoi template, sui tuoi processi, sul tuo settore. Non è un tool generico  è addestrato sul tuo modo di lavorare.',
  },
  {
    q: 'E la sicurezza dei dati? Ho documenti riservati.',
    a: 'Tutto gira su infrastruttura europea, GDPR compliant. I tuoi documenti non vengono usati per addestrare nessun modello. Restano tuoi.',
  },
  {
    q: 'Devo cambiare il mio gestionale?',
    a: 'No. Il sistema si integra con quello che già usi  Drive, Dropbox, il tuo software di fatturazione, la tua email. Zero migrazione, zero stravolgimenti.',
  },
  {
    q: 'E se genera un documento sbagliato?',
    a: 'Ogni output passa per la tua approvazione prima di uscire. L\'AI non manda nulla in autonomia senza che tu abbia visto e confermato. È un assistente, non un sostituto.',
  },
];

const TESTIMONIALS = [
  {
    quote: 'Facevo i preventivi a mano in Word. Ci mettevo 45 minuti a pezzo. Ora descrivo la richiesta in due righe e il PDF è pronto in 40 secondi. Ho recuperato due ore al giorno.',
    name: 'Ing. Paolo V.',
    role: 'Titolare',
    company: 'Studio di ingegneria  Padova',
  },
  {
    quote: 'Le fatture scadute erano un incubo. Dovevo ricordarmi io di sollecitare. Ora il sistema manda il primo sollecito automatico, il secondo, e mi avvisa solo se dopo tre tentativi non c\'è risposta. I ritardi di pagamento sono calati del 70%.',
    name: 'Maria C.',
    role: 'CFO',
    company: 'PMI manifatturiera  Brescia',
  },
  {
    quote: 'Un commercialista mi ha detto che i miei documenti sono i più ordinati che abbia mai visto in uno studio della mia dimensione. Non so se ridere o piangere  li genera l\'AI.',
    name: 'Davide S.',
    role: 'Founder',
    company: 'Agenzia consulenza  Roma',
  },
];

export default function LP6DocumentAutomation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDocType, setActiveDocType] = useState<DocType>('Preventivi');
  const [activeSector, setActiveSector] = useState<SectorType>('Studio professionale');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [calcHours, setCalcHours] = useState('');
  const [calcRate, setCalcRate] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const calcResult = calcHours && calcRate ? Math.round(parseFloat(calcHours) * parseFloat(calcRate) * 48) : null;

  return (
    <div className="bg-[#000000] text-[#F5F5F7] min-h-screen">
      <LandingNavbar
        onScrollTo={scrollTo}
        scrolled={scrolled}
        ctaLabel="Prova con un documento"
        ctaTarget="demo"
        navLinks={NAV_LINKS}
      />

      {/* Breadcrumb */}
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <p className="text-xs text-gray-400 font-mono">/documenti</p>
      </div>

      {/* HERO */}
      <section id="hero" className="pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 text-xs font-medium text-accent border border-accent/30 rounded-full mb-6">
              AI Document Automation
            </span>
            <h1 className="hero-h1 font-display text-[#F5F5F7] mb-6">
              Fatture, contratti, preventivi, email.
              <span className="text-accent"> L'AI li fa in 30 secondi.</span>
            </h1>
            <p className="font-body text-xl text-gray-400 leading-relaxed mb-8 max-w-xl">
              Automatizza tutta la parte amministrativa della tua azienda  senza errori, senza ritardi, senza assumere nessuno.
            </p>
            <button
              onClick={() => scrollTo('demo')}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-white font-display font-semibold rounded-lg hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Carica un documento e vedi cosa succede
              <ArrowRight size={18} />
            </button>
          </motion.div>

          {/* Demo documento */}
          <motion.div
            id="demo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border border-white/10 bg-[#1A1A1A] p-6 shadow-lg"
          >
            <p className="text-xs uppercase tracking-[0.15em] text-gray-400 font-display font-semibold mb-4">
              Seleziona un tipo di documento
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {(['Fattura', 'Contratto', 'Email richiesta preventivo'] as const).map((label) => {
                const mapping: Record<string, DocType> = {
                  'Fattura': 'Fatture',
                  'Contratto': 'Contratti',
                  'Email richiesta preventivo': 'Preventivi',
                };
                const docType = mapping[label];
                return (
                  <button
                    key={label}
                    onClick={() => setActiveDocType(docType)}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeDocType === docType
                        ? 'bg-accent text-white border border-accent'
                        : 'bg-[#0A0A0A] text-gray-400 border border-white/10 hover:border-white/20'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-[#0A0A0A] border border-white/10 p-3">
                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-display font-semibold mb-2">
                  Documento originale
                </p>
                <pre className="font-mono text-[11px] text-gray-400 leading-relaxed whitespace-pre-wrap overflow-y-auto max-h-[240px]">
                  {DOC_DEMOS[activeDocType].before}
                </pre>
              </div>
              <div className="rounded-xl bg-accent/5 border border-accent/20 p-3">
                <p className="text-[10px] uppercase tracking-wider text-accent font-display font-semibold mb-2">
                  Output AI  {DOC_DEMOS[activeDocType].time}
                </p>
                <pre className="font-mono text-[11px] text-gray-300 leading-relaxed whitespace-pre-wrap overflow-y-auto max-h-[240px]">
                  {DOC_DEMOS[activeDocType].after}
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROBLEMA */}
      <ProblemSection
        calcHours={calcHours}
        setCalcHours={setCalcHours}
        calcRate={calcRate}
        setCalcRate={setCalcRate}
        calcResult={calcResult}
      />

      {/* SOLUZIONE */}
      <SolutionSection activeDocType={activeDocType} setActiveDocType={setActiveDocType} />

      {/* COME FUNZIONA */}
      <HowItWorks />

      {/* COSA AUTOMATIZZA */}
      <AutomationCards activeDocType={activeDocType} setActiveDocType={setActiveDocType} />

      {/* NUMERI */}
      <NumbersSection />

      {/* PER CHI È */}
      <TargetSection activeSector={activeSector} setActiveSector={setActiveSector} sectorFlows={SECTOR_FLOWS} />

      {/* SOCIAL PROOF */}
      <TestimonialsSection testimonials={TESTIMONIALS} />

      {/* FAQ */}
      <FaqSection items={FAQ_ITEMS} openFaq={openFaq} setOpenFaq={setOpenFaq} />

      {/* FOOTER */}
      <MainFooter />
    </div>
  );
}

/* ────── Sub-components ────── */

function ProblemSection({ calcHours, setCalcHours, calcRate, setCalcRate, calcResult }: {
  calcHours: string; setCalcHours: (v: string) => void;
  calcRate: string; setCalcRate: (v: string) => void;
  calcResult: number | null;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const paragraphs = [
    'Sai esattamente di cosa parlo.',
    'Sono le 18:30. Hai finito con l\'ultimo cliente. Dovresti staccare. Invece apri il laptop perché hai ancora tre preventivi da fare, due fatture da mandare, un contratto da revisionare e dieci email a cui rispondere.',
    'Ogni settimana, almeno 6-8 ore del tuo tempo  ore che potresti vendere, usare per acquisire clienti, o semplicemente non lavorare  le passi su attività che non richiedono la tua testa. Richiedono solo tempo.',
    'Moltiplicalo per 12 mesi.',
  ];

  return (
    <section id="problema" ref={ref} className="py-24 px-4 sm:px-6">
      <div className="max-w-[680px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-xs uppercase tracking-[0.2em] text-accent font-display font-semibold mb-10"
        >
          Il problema
        </motion.p>
        <div className="space-y-6 font-body text-gray-300 leading-[1.75] text-lg">
          {paragraphs.map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              {text}
            </motion.p>
          ))}
        </div>

        {/* Calcolatore */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="mt-10 rounded-2xl border border-white/10 bg-[#1A1A1A] p-6"
        >
          <p className="text-xs uppercase tracking-[0.15em] text-accent font-display font-semibold mb-4">
            Calcola il costo della tua burocrazia
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Ore/settimana su attività admin</label>
              <input
                type="number" min="0" value={calcHours}
                onChange={(e) => setCalcHours(e.target.value)}
                placeholder="es. 7"
                className="w-full rounded-lg border border-white/10 bg-[#0A0A0A] px-4 py-3 text-sm text-[#F5F5F7] placeholder-gray-500 focus:border-accent focus:ring-1 focus:ring-accent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Tariffa oraria &euro;</label>
              <input
                type="number" min="0" value={calcRate}
                onChange={(e) => setCalcRate(e.target.value)}
                placeholder="es. 80"
                className="w-full rounded-lg border border-white/10 bg-[#0A0A0A] px-4 py-3 text-sm text-[#F5F5F7] placeholder-gray-500 focus:border-accent focus:ring-1 focus:ring-accent outline-none"
              />
            </div>
          </div>
          {calcResult !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl bg-accent/5 border border-accent/20 p-5 text-center"
            >
              <p className="font-body text-gray-400 mb-1">Stai bruciando circa</p>
              <p className="font-display font-bold text-3xl text-accent">&euro;{calcResult.toLocaleString('it-IT')}</p>
              <p className="font-body text-gray-400 mt-1">all'anno in lavoro a basso valore.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function SolutionSection({ activeDocType, setActiveDocType }: { activeDocType: DocType; setActiveDocType: (d: DocType) => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const points = [
    'Legge i documenti che ricevi',
    'Estrae le informazioni importanti',
    'Genera i documenti che devi mandare',
    'Risponde alle email di routine',
    'Compila, archivia, ricorda le scadenze',
  ];

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] border-y border-white/10">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-xs uppercase tracking-[0.2em] text-accent font-display font-semibold mb-3"
        >
          La soluzione
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-display font-bold text-3xl text-[#F5F5F7] mb-4 max-w-2xl"
        >
          L'AI gestisce tutta la parte documentale.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="font-body text-lg text-gray-400 mb-8 max-w-xl"
        >
          Tu firma. Tu approva. Tu incassa. Il resto lo fa lei.
        </motion.p>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {points.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.06 }}
              className="flex items-start gap-2 rounded-xl border border-white/10 bg-[#1A1A1A] p-3"
            >
              <CheckCircle size={16} className="text-accent mt-0.5 shrink-0" />
              <span className="font-body text-sm text-gray-300">{p}</span>
            </motion.div>
          ))}
        </div>

        {/* Selettore documento */}
        <div className="rounded-2xl border border-white/10 bg-[#1A1A1A] p-6">
          <p className="text-xs uppercase tracking-[0.15em] text-gray-400 font-display font-semibold mb-4">
            Scegli cosa automatizzare
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {DOC_TYPES.map((dt) => {
              const Icon = DOC_ICONS[dt];
              return (
                <button
                  key={dt}
                  onClick={() => setActiveDocType(dt)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeDocType === dt
                      ? 'bg-accent text-white border border-accent'
                      : 'bg-[#0A0A0A] text-gray-400 border border-white/10 hover:border-white/20'
                  }`}
                >
                  <Icon size={14} />
                  {dt}
                </button>
              );
            })}
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="rounded-xl bg-[#0A0A0A] border border-white/10 p-4">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-display font-semibold mb-2">Prima</p>
              <pre className="font-mono text-xs text-gray-400 leading-relaxed whitespace-pre-wrap overflow-y-auto max-h-[200px]">
                {DOC_DEMOS[activeDocType].before}
              </pre>
            </div>
            <div className="rounded-xl bg-accent/5 border border-accent/20 p-4">
              <p className="text-[10px] uppercase tracking-wider text-accent font-display font-semibold mb-2">
                Dopo  {DOC_DEMOS[activeDocType].time}
              </p>
              <pre className="font-mono text-xs text-gray-300 leading-relaxed whitespace-pre-wrap overflow-y-auto max-h-[200px]">
                {DOC_DEMOS[activeDocType].after}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const steps = [
    {
      num: '01',
      icon: Upload,
      title: 'Ricevi o carichi un documento',
      desc: 'Qualsiasi formato: PDF, Word, email, testo.',
    },
    {
      num: '02',
      icon: Shield,
      title: 'L\'AI legge, capisce e agisce',
      desc: 'Estrae i dati. Identifica le azioni. Genera il documento di risposta.',
    },
    {
      num: '03',
      icon: CheckCircle,
      title: 'Tu controlli e mandi',
      desc: 'Revisione in 30 secondi. Un click per approvare. Archiviazione automatica.',
    },
  ];

  const timeline = [
    { time: '9:14', event: 'Email cliente con richiesta preventivo' },
    { time: '9:14', event: 'AI estrae: servizio, budget, tempistiche' },
    { time: '9:15', event: 'Preventivo PDF generato in dashboard' },
    { time: '9:15', event: 'Approvi e mandi con un click' },
  ];

  return (
    <section id="come-funziona" ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-[#000000]">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-xs uppercase tracking-[0.2em] text-accent font-display font-semibold mb-3"
        >
          Come funziona
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-display font-bold text-3xl text-[#F5F5F7] mb-10 max-w-2xl"
        >
          Tre passi. Zero burocrazia.
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8 md:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative rounded-2xl border border-white/10 bg-[#1A1A1A] p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="absolute top-6 right-6 font-display font-bold text-4xl text-accent/10">
                {step.num}
              </span>
              <div className="mb-4 text-accent">
                <step.icon size={28} strokeWidth={1.8} />
              </div>
              <h3 className="font-display font-bold text-lg text-[#F5F5F7] mb-2">{step.title}</h3>
              <p className="font-body text-gray-400 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="mt-16 rounded-2xl border border-white/10 bg-[#1A1A1A] p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.15em] text-accent font-display font-semibold mb-6">
            Un preventivo tipico
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0">
            {timeline.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.15 }}
                className="flex-1 flex items-center gap-3 sm:flex-col sm:text-center"
              >
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-accent" />
                </div>
                <div>
                  <p className="font-mono text-sm font-bold text-accent">{t.time}</p>
                  <p className="text-xs text-gray-400">{t.event}</p>
                </div>
                {i < timeline.length - 1 && (
                  <div className="hidden sm:block flex-1 h-px bg-white/10 mx-2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AutomationCards({ activeDocType, setActiveDocType }: { activeDocType: DocType; setActiveDocType: (d: DocType) => void }) {
  const descriptions: Record<DocType, string> = {
    Preventivi: 'Genera preventivi personalizzati partendo da una richiesta email o da un brief vocale. Nel tuo template, con i tuoi prezzi.',
    Fatture: 'Crea fatture dai preventivi approvati. Manda solleciti automatici alle scadenze. Traccia i pagamenti.',
    Contratti: 'Compila contratti standard dai dati del cliente. Evidenzia clausole che richiedono attenzione. Manda per firma digitale.',
    'Email di risposta': 'Analizza le email ricevute, capisce il contesto, genera bozza di risposta. Le routine escono da sole.',
    'Report interni': 'Genera report settimanali, aggiorna documenti di progetto, compila log di attività.',
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] border-y border-white/10">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.2em] text-accent font-display font-semibold mb-3"
        >
          Cosa automatizza
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-bold text-3xl text-[#F5F5F7] mb-10 max-w-2xl"
        >
          Ogni documento, gestito.
        </motion.h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {DOC_TYPES.map((dt, i) => {
            const Icon = DOC_ICONS[dt];
            return (
              <motion.button
                key={dt}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setActiveDocType(dt)}
                className={`text-left rounded-xl border p-5 transition-all ${
                  activeDocType === dt
                    ? 'border-accent/40 bg-accent/5 shadow-sm'
                    : 'border-white/10 bg-[#1A1A1A] hover:border-accent/30'
                }`}
              >
                <Icon size={24} className={activeDocType === dt ? 'text-accent' : 'text-accent'} />
                <h4 className="font-display font-semibold text-[#F5F5F7] mt-3 mb-2 text-sm">{dt}</h4>
                <p className="text-xs text-gray-400 font-body leading-relaxed">{descriptions[dt]}</p>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function NumbersSection() {
  const cards = [
    { value: '6-8 ore', text: 'La media settimanale che una PMI spreca in attività amministrative manuali' },
    { value: '82 gg/anno', text: 'Di lavoro manuale eliminato nelle aziende che hanno automatizzato i flussi documentali' },
    { value: '-60%', text: 'Il tempo di gestione documenti dopo l\'adozione dell\'AI' },
    { value: '0', text: 'Gli errori di trascrizione quando è l\'AI a estrarre e compilare' },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-y border-white/10 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.2em] text-accent font-display font-semibold mb-3"
        >
          I numeri
        </motion.p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <motion.article
              key={card.value}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-white/10 bg-[#1A1A1A] p-6"
            >
              <p className="font-mono text-2xl font-bold text-accent mb-3">{card.value}</p>
              <p className="text-sm text-gray-400 leading-relaxed font-body">{card.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TargetSection({ activeSector, setActiveSector, sectorFlows }: {
  activeSector: SectorType;
  setActiveSector: (s: SectorType) => void;
  sectorFlows: typeof SECTOR_FLOWS;
}) {
  const targets = [
    { icon: '⚖️', label: 'Studi professionali', desc: 'Commercialisti, avvocati, consulenti con alto volume documentale' },
    { icon: '🎨', label: 'Agenzie e freelance', desc: 'Preventivi, contratti, report cliente in automatico' },
    { icon: '🏭', label: 'PMI manifatturiere', desc: 'Ordini, DDT, fatture, comunicazioni fornitori' },
    { icon: '🏥', label: 'Studi medici e dentistici', desc: 'Moduli pazienti, referti, comunicazioni assicurazioni' },
  ];

  return (
    <section id="per-chi" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.2em] text-accent font-display font-semibold mb-3"
        >
          Per chi è
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-bold text-3xl text-[#F5F5F7] mb-10 max-w-2xl"
        >
          Per qualsiasi azienda che gestisce più di 20 documenti a settimana.
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {targets.map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-white/10 bg-[#1A1A1A] p-5 hover:border-accent/30 transition-colors"
            >
              <span className="text-2xl mb-2 block">{t.icon}</span>
              <h4 className="font-display font-semibold text-[#F5F5F7] mb-1">{t.label}</h4>
              <p className="text-sm text-gray-400 font-body">{t.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Selettore settore con flusso */}
        <div className="rounded-2xl border border-white/10 bg-[#1A1A1A] p-6">
          <p className="text-xs uppercase tracking-[0.15em] text-gray-400 font-display font-semibold mb-4">
            Flusso documentale per settore
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {SECTORS.map((s) => (
              <button
                key={s}
                onClick={() => setActiveSector(s)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSector === s
                    ? 'bg-accent text-white border border-accent'
                    : 'bg-[#0A0A0A] text-gray-400 border border-white/10 hover:border-white/20'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="rounded-xl bg-[#0A0A0A] border border-white/10 p-4">
            <p className="font-body text-sm text-gray-300 leading-relaxed mb-3">
              {sectorFlows[activeSector].flow}
            </p>
            <p className="font-display font-semibold text-accent text-sm">
              {sectorFlows[activeSector].timeSaved}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection({ testimonials }: { testimonials: typeof TESTIMONIALS }) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] border-y border-white/10">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.2em] text-accent font-display font-semibold mb-10"
        >
          Cosa dicono i clienti
        </motion.p>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-white/10 bg-[#1A1A1A] p-6"
            >
              <p className="font-body text-gray-300 leading-relaxed mb-4 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="text-sm">
                <span className="font-display font-semibold text-[#F5F5F7]">{t.name}</span>
                <span className="text-gray-400"> &mdash; {t.role}, {t.company}</span>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection({ items, openFaq, setOpenFaq }: { items: typeof FAQ_ITEMS; openFaq: number | null; setOpenFaq: (v: number | null) => void }) {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-[680px] mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-accent font-display font-semibold mb-10">
          Domande frequenti
        </p>
        <div className="space-y-2">
          {items.map((faq, i) => (
            <div key={i} className="border border-white/10 rounded-xl overflow-hidden bg-[#1A1A1A]">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-display font-semibold text-[#F5F5F7] hover:bg-white/5 transition-colors min-h-[44px]"
                aria-expanded={openFaq === i}
              >
                {faq.q}
                <ChevronDown className={`shrink-0 text-gray-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} size={20} />
              </button>
              <AnimatePresence initial={false}>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 pt-0 font-body text-gray-400 leading-relaxed border-t border-white/10">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
