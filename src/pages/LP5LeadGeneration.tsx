import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Target, Send, TrendingUp, Users, ChevronDown, CheckCircle, Zap, BarChart3 } from 'lucide-react';
import LandingNavbar from '../components/landing/LandingNavbar';
import LandingFooter from '../components/landing/LandingFooter';

const NAV_LINKS = [
  { label: 'Il problema', id: 'problema' },
  { label: 'Come funziona', id: 'come-funziona' },
  { label: 'Per chi è', id: 'per-chi' },
];

const PROFILES = ['Agenzia', 'Consulente', 'Freelance', 'Startup', 'PMI'] as const;
type Profile = typeof PROFILES[number];

const EMAIL_SEQUENCES: Record<Profile, { subject: string; body: string }[]> = {
  Agenzia: [
    {
      subject: 'Una domanda sul vostro reparto marketing — [Nome Azienda]',
      body: `Buongiorno [Nome],

ho notato che [Azienda Target] sta investendo nella comunicazione digitale — complimenti per il rebrand recente del sito.

Lavoro con [Nome Agenzia], aiutiamo aziende manifatturiere del Nord Italia a strutturare la strategia di contenuti B2B. Con [Cliente Simile] abbiamo ottenuto +140% di lead qualificati in 4 mesi.

Mi chiedevo: il vostro reparto marketing gestisce internamente la content strategy o vi appoggiate a partner esterni?

Se ha senso, le propongo una call di 15 minuti per capire se possiamo essere utili.

Buona giornata,
[Firma]`,
    },
    {
      subject: 'Re: Una domanda sul vostro reparto marketing',
      body: `Buongiorno [Nome],

torno sulla mia email di qualche giorno fa — capisco che le agende siano piene.

Le condivido un caso studio rapido: [Cliente nel suo settore] aveva lo stesso problema di visibilità B2B. In 90 giorni abbiamo portato il traffico organico da 2.000 a 8.500 visite/mese.

Se le interessa, posso mandarglielo in PDF.

A presto,
[Firma]`,
    },
    {
      subject: 'Ultimo tentativo — poi non disturbo più',
      body: `Buongiorno [Nome],

non voglio essere insistente, quindi sarò breve: se la content strategy non è una priorità adesso, capisco perfettamente.

Se invece è qualcosa che avete in roadmap, sono disponibile per una call conoscitiva di 15 minuti — senza impegno, senza slide, solo una conversazione.

In ogni caso, le auguro buon lavoro.

[Firma]`,
    },
  ],
  Consulente: [
    {
      subject: 'Idea per i vostri processi interni — [Azienda]',
      body: `Buongiorno [Nome],

mi sono imbattuto nel profilo di [Azienda] su LinkedIn e ho notato che state crescendo rapidamente — congratulazioni per i risultati dell'ultimo trimestre.

Come consulente specializzato in efficienza operativa, lavoro con PMI in fase di scaling che hanno bisogno di strutturare i processi prima che la crescita diventi un problema.

Con [Azienda Simile] abbiamo ridotto i tempi di delivery del 35% in 60 giorni, senza cambiare team.

Le interessa una conversazione di 15 minuti per capire se ci sono margini di miglioramento anche per voi?

Cordialmente,
[Firma]`,
    },
    {
      subject: 'Re: Idea per i vostri processi',
      body: `[Nome], riprendo brevemente il filo.

Ho preparato un mini-audit gratuito basato su dati pubblici di [Azienda] — 3 punti dove vedo potenziale di ottimizzazione immediata.

Glielo mando se mi conferma interesse, nessun obbligo.

[Firma]`,
    },
    {
      subject: 'Chiudo il cerchio — [Azienda]',
      body: `[Nome], capisco che i tempi possano non essere giusti.

Se in futuro doveste valutare un supporto esterno sull'efficienza operativa, il mio contatto resta questo.

Le auguro una buona giornata.

[Firma]`,
    },
  ],
  Freelance: [
    {
      subject: 'Una proposta per [Azienda] — design & brand',
      body: `Buongiorno [Nome],

ho visto il vostro sito e i materiali di comunicazione — avete un prodotto interessante, ma credo che il brand non lo stia raccontando al meglio.

Sono un brand designer freelance specializzato in PMI B2B. Ho curato il rebrand di [Azienda Simile] che ha portato a +60% di richieste di preventivo in 3 mesi.

Non le chiedo un'ora — le chiedo 10 minuti per mostrarle 2-3 idee concrete specifiche per [Azienda].

Quando le farebbe comodo?

[Firma]`,
    },
    {
      subject: 'Re: Proposta design — ho preparato qualcosa',
      body: `[Nome], ho preparato un mockup rapido (non richiesto, lo so) di come potrebbe apparire la vostra homepage con un refresh visivo.

Se le interessa vederlo, mi faccia sapere — glielo mando senza impegno.

[Firma]`,
    },
    {
      subject: 'Ultimo messaggio — poi sparisco!',
      body: `[Nome], non voglio riempirle la inbox.

Il mockup resta a disposizione se in futuro vi interessa. Le auguro un ottimo proseguimento.

[Firma]`,
    },
  ],
  Startup: [
    {
      subject: 'Da founder a founder — [Azienda]',
      body: `Ciao [Nome],

sto seguendo il percorso di [Startup] da quando ho visto il vostro post su LinkedIn sulla chiusura del seed round — in bocca al lupo!

Noi di [Nostra Startup] aiutiamo startup in fase di go-to-market a validare il product-market fit attraverso outreach strutturato — senza bruciare budget in ads prematuramente.

Con [Startup Simile] abbiamo generato 40 conversazioni qualificate in 3 settimane partendo da zero lista contatti.

Ti va una call da 15 minuti? Zero pitch, solo scambio di idee.

[Firma]`,
    },
    {
      subject: 'Re: Da founder a founder',
      body: `Ciao [Nome], riprendo il thread.

Ho scritto un mini-playbook "Go-to-market senza ads" basato su quello che ha funzionato per noi e per i nostri clienti early-stage. Te lo mando?

[Firma]`,
    },
    {
      subject: 'Ultimo ping — poi silenzio',
      body: `[Nome], se non è il momento giusto, nessun problema. Il mondo startup è caotico, lo capisco bene.

Se in futuro vi serve un canale di acquisizione che non sia ads, sapete dove trovarmi.

In bocca al lupo per tutto!
[Firma]`,
    },
  ],
  PMI: [
    {
      subject: 'Un\'osservazione sul vostro commerciale — [Azienda]',
      body: `Buongiorno [Nome],

ho trovato [Azienda] cercando fornitori di [Settore] nel [Area Geografica] — il vostro catalogo è interessante.

Lavoro con PMI che vogliono scalare le vendite B2B senza assumere nuovi commerciali. Il nostro sistema di outreach AI ha permesso a [Azienda Simile] di passare da 5 a 20 trattative attive al mese con lo stesso team.

La sua forza vendita attuale quanto riesce a fare prospecting attivo ogni settimana? Se la risposta è "poco", forse possiamo aiutarvi.

Le propongo un confronto di 15 minuti — nessun impegno.

Cordiali saluti,
[Firma]`,
    },
    {
      subject: 'Re: Commerciale [Azienda] — un dato che potrebbe interessarle',
      body: `[Nome], torno brevemente.

Un dato dal nostro ultimo report: le PMI che automatizzano il primo contatto commerciale chiudono 3.4x deal in più a parità di team.

Se vuole il report completo, glielo invio volentieri.

[Firma]`,
    },
    {
      subject: 'Chiudo qui — [Azienda]',
      body: `[Nome], non voglio occuparle tempo se non è il momento giusto.

Se in futuro la crescita commerciale diventa una priorità, il mio contatto resta questo.

Le auguro buon lavoro.
[Firma]`,
    },
  ],
};

const TARGETS = [
  { icon: '🏢', label: 'Agenzie e consulenti B2B', desc: 'Prospecting su scala senza assumere commerciali' },
  { icon: '💻', label: 'Software house e SaaS', desc: 'Outreach verso decision maker con messaggi tecnici' },
  { icon: '👤', label: 'Freelance e professionisti', desc: 'Primo contatto professionale senza sembrare disperati' },
  { icon: '🚀', label: 'Startup in go-to-market', desc: 'Validare il mercato velocemente prima di investire in ads' },
  { icon: '🏭', label: 'PMI con forza vendita piccola', desc: 'Moltiplicare il lavoro del commerciale esistente' },
];

const FAQ_ITEMS = [
  {
    q: 'Le email automatiche finiscono in spam?',
    a: 'Il sistema usa personalizzazione profonda — nome, azienda, contesto specifico — che i filtri antispam riconoscono come email umane. Tasso di deliverability medio: 94%.',
  },
  {
    q: 'Sembra freddo e impersonale?',
    a: 'È il contrario. L\'AI ricerca il prospect prima di scrivere — settore, dimensione, eventuali notizie recenti sull\'azienda. Ogni email sembra scritta a mano perché contiene dettagli reali su chi la riceve.',
  },
  {
    q: 'Non ho una lista di contatti?',
    a: 'Non serve. Il sistema identifica i prospect in base al tuo cliente ideale e costruisce la lista da zero.',
  },
];

const TESTIMONIALS = [
  {
    quote: 'Avevo una lista di 400 contatti ferma da un anno. L\'AI ha scritto le email, ha mandato tutto, ha fatto i follow-up. In tre settimane ho avuto 23 risposte e 6 call prenotate. In un anno non avevo fatto nulla.',
    name: 'Andrea T.',
    role: 'Founder',
    company: 'Agenzia digital — Torino',
  },
  {
    quote: 'Il mio commerciale ora usa l\'AI per il primo contatto e si concentra solo sulle trattative. Ha triplicato il numero di deal chiusi senza lavorare più ore.',
    name: 'Luca F.',
    role: 'CEO',
    company: 'Software house — Milano',
  },
];

const PIPELINE_STEPS = [
  { label: '1.000', desc: 'Prospect identificati' },
  { label: '180', desc: 'Email aperte' },
  { label: '40', desc: 'Risposte' },
  { label: '12', desc: 'Call prenotate' },
  { label: '4', desc: 'Clienti chiusi' },
];

export default function LP5LeadGeneration() {
  const [scrolled, setScrolled] = useState(false);
  const [activeProfile, setActiveProfile] = useState<Profile>('Agenzia');
  const [activeEmailTab, setActiveEmailTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [calcEmails, setCalcEmails] = useState('');
  const [calcRate, setCalcRate] = useState('');
  const [calcValue, setCalcValue] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const calcResult = calcEmails && calcRate && calcValue
    ? Math.round((parseFloat(calcEmails) * 4 * (1 - parseFloat(calcRate) / 100)) * parseFloat(calcValue) * 0.05)
    : null;

  return (
    <div className="bg-[#FAFAF8] text-ink min-h-screen">
      <LandingNavbar
        onScrollTo={scrollTo}
        scrolled={scrolled}
        ctaLabel="Calcola i tuoi lead persi"
        ctaTarget="calcolatore"
        navLinks={NAV_LINKS}
      />

      {/* Breadcrumb */}
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <p className="text-xs text-gray-400 font-mono">/lead</p>
      </div>

      {/* HERO */}
      <section id="hero" className="pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 text-xs font-medium text-navy border border-navy/30 rounded-full mb-6">
              AI Lead Generation
            </span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl leading-[1.1] text-ink mb-6">
              Ogni giorno centinaia di aziende hanno bisogno di quello che vendi.
              <span className="text-accent"> L'AI le trova e le contatta per te.</span>
            </h1>
            <p className="font-body text-xl text-gray-600 leading-relaxed mb-8 max-w-xl">
              Prospecting automatico, email personalizzate su scala, follow-up intelligenti — senza che tu muova un dito. Tu parli solo con chi è già interessato.
            </p>
            <button
              onClick={() => scrollTo('calcolatore')}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-white font-display font-semibold rounded-lg hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Vedi quanti lead stai perdendo ogni mese
              <ArrowRight size={18} />
            </button>
          </motion.div>

          {/* Calcolatore Hero */}
          <motion.div
            id="calcolatore"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg"
          >
            <p className="text-xs uppercase tracking-[0.15em] text-navy font-display font-semibold mb-4">
              Calcola il tuo potenziale
            </p>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email commerciali/settimana</label>
                <input
                  type="number" min="0" value={calcEmails}
                  onChange={(e) => setCalcEmails(e.target.value)}
                  placeholder="es. 20"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tasso di risposta medio %</label>
                <input
                  type="number" min="0" max="100" value={calcRate}
                  onChange={(e) => setCalcRate(e.target.value)}
                  placeholder="es. 5"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Valore medio di un cliente &euro;</label>
                <input
                  type="number" min="0" value={calcValue}
                  onChange={(e) => setCalcValue(e.target.value)}
                  placeholder="es. 3000"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                />
              </div>
            </div>
            {calcResult !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-xl bg-accent/5 border border-accent/20 p-5 text-center"
              >
                <p className="font-body text-gray-600 mb-1">Stai lasciando sul tavolo circa</p>
                <p className="font-display font-bold text-3xl text-accent">&euro;{calcResult.toLocaleString('it-IT')}</p>
                <p className="font-body text-gray-600 mt-1">al mese in opportunità non colte.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* PROBLEMA */}
      <ProblemSection />

      {/* SOLUZIONE + DEMO EMAIL */}
      <SolutionSection
        activeProfile={activeProfile}
        setActiveProfile={setActiveProfile}
        activeEmailTab={activeEmailTab}
        setActiveEmailTab={setActiveEmailTab}
        emailSequences={EMAIL_SEQUENCES}
      />

      {/* COME FUNZIONA */}
      <HowItWorks pipelineSteps={PIPELINE_STEPS} />

      {/* NUMERI */}
      <NumbersSection />

      {/* PER CHI È */}
      <TargetSection
        targets={TARGETS}
        activeProfile={activeProfile}
        setActiveProfile={setActiveProfile}
        setActiveEmailTab={setActiveEmailTab}
      />

      {/* SOCIAL PROOF */}
      <TestimonialsSection testimonials={TESTIMONIALS} />

      {/* FAQ */}
      <FaqSection items={FAQ_ITEMS} openFaq={openFaq} setOpenFaq={setOpenFaq} />

      {/* CTA FINALE */}
      <LandingFooter
        headline="La prossima settimana potresti avere già 10 conversazioni aperte con potenziali clienti. O potresti continuare a rimandare."
        subtext="Nessuna registrazione. Risultato in 30 secondi. Poi decidi tu."
        ctaLabel="Calcola quanti lead stai perdendo ogni mese"
        ctaTarget="calcolatore"
        onScrollTo={scrollTo}
      />
    </div>
  );
}

/* ────── Sub-components ────── */

function ProblemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const paragraphs = [
    'Sai già chi dovresti contattare. Non lo fai mai abbastanza.',
    'Hai una lista di potenziali clienti che aspetta da mesi. Hai mandato qualche email, nessuna risposta, hai mollato.',
    'Non hai tempo per fare prospecting sistematico — stai già gestendo i clienti che hai.',
    'Ogni tanto ti ricordi di qualcuno, lo cerchi su LinkedIn, scrivi due righe, dimentichi di fare follow-up.',
    'Risultato: il tuo miglior lead si è già comprato il servizio da un competitor che era più costante di te.',
    'Non è pigrizia. È che vendere richiede un sistema — e tu non ce l\'hai ancora.',
  ];

  return (
    <section id="problema" ref={ref} className="py-24 px-4 sm:px-6">
      <div className="max-w-[680px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-xs uppercase tracking-[0.2em] text-navy font-display font-semibold mb-10"
        >
          Il problema
        </motion.p>
        <div className="space-y-6 font-body text-gray-700 leading-[1.75] text-lg">
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
      </div>
    </section>
  );
}

function SolutionSection({ activeProfile, setActiveProfile, activeEmailTab, setActiveEmailTab, emailSequences }: {
  activeProfile: Profile; setActiveProfile: (p: Profile) => void;
  activeEmailTab: number; setActiveEmailTab: (t: number) => void;
  emailSequences: typeof EMAIL_SEQUENCES;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const currentEmail = emailSequences[activeProfile][activeEmailTab];
  const tabLabels = ['Email 1 (primo contatto)', 'Follow-up 3gg', 'Follow-up 7gg'];

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-white/50 border-y border-gray-100">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-xs uppercase tracking-[0.2em] text-navy font-display font-semibold mb-3"
        >
          La soluzione
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-display font-bold text-3xl text-ink mb-4 max-w-2xl"
        >
          L'AI costruisce e gestisce il tuo sistema di acquisizione clienti.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="font-body text-lg text-gray-600 mb-8 max-w-xl"
        >
          Trova i prospect giusti. Scrive email personalizzate. Fa follow-up. Ti porta solo le risposte positive.
        </motion.p>

        {/* Demo sequenza email */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <p className="text-xs uppercase tracking-[0.15em] text-gray-400 font-display font-semibold mb-4">
            Demo: sequenza email per profilo
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {PROFILES.map((p) => (
              <button
                key={p}
                onClick={() => { setActiveProfile(p); setActiveEmailTab(0); }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeProfile === p
                    ? 'bg-navy text-white border border-navy'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {tabLabels.map((label, i) => (
              <button
                key={i}
                onClick={() => setActiveEmailTab(i)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  activeEmailTab === i
                    ? 'bg-accent/10 text-accent border border-accent/30'
                    : 'bg-gray-50 text-gray-500 border border-gray-100 hover:border-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
            <p className="font-mono text-xs text-gray-400 mb-2">
              Oggetto: {currentEmail.subject}
            </p>
            <p className="font-body text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {currentEmail.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks({ pipelineSteps }: { pipelineSteps: typeof PIPELINE_STEPS }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const steps = [
    {
      num: '01',
      icon: Target,
      title: 'Definisci il tuo cliente ideale',
      desc: 'Settore, dimensione, zona geografica, ruolo del decisore.',
    },
    {
      num: '02',
      icon: Send,
      title: 'L\'AI costruisce la sequenza',
      desc: 'Email personalizzata. Follow-up calibrati. Tono adatto al settore.',
    },
    {
      num: '03',
      icon: Zap,
      title: 'Il sistema gira in automatico',
      desc: 'Manda, aspetta, segue, riprova. Ti notifica sulle risposte positive.',
    },
    {
      num: '04',
      icon: TrendingUp,
      title: 'Tu chiudi',
      desc: 'Entri solo con chi ha già risposto. Zero tempo sprecato.',
    },
  ];

  return (
    <section id="come-funziona" ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAF8]">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-xs uppercase tracking-[0.2em] text-navy font-display font-semibold mb-3"
        >
          Come funziona
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-display font-bold text-3xl text-ink mb-10 max-w-2xl"
        >
          Dal prospect al cliente. In automatico.
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="absolute top-4 right-4 font-display font-bold text-3xl text-navy/10">
                {step.num}
              </span>
              <div className="mb-3 text-navy">
                <step.icon size={24} strokeWidth={1.8} />
              </div>
              <h3 className="font-display font-bold text-base text-ink mb-2">{step.title}</h3>
              <p className="font-body text-gray-600 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Pipeline animata */}
        <div className="mt-16 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.15em] text-navy font-display font-semibold mb-6">
            Pipeline tipica
          </p>
          <div className="flex flex-col sm:flex-row items-stretch gap-0">
            {pipelineSteps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.12 }}
                className="flex-1 text-center py-4 sm:py-6 relative"
              >
                <p className="font-display font-bold text-2xl text-accent">{s.label}</p>
                <p className="text-xs text-gray-600 mt-1">{s.desc}</p>
                {i < pipelineSteps.length - 1 && (
                  <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 text-gray-300">
                    <ArrowRight size={16} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function NumbersSection() {
  const cards = [
    { value: '45min → 1min', text: 'Il tempo per qualificare un lead, prima e dopo l\'AI' },
    { value: '+340%', text: 'Aumento medio del tasso di conversione con follow-up automatizzati' },
    { value: '8x', text: 'Il volume di prospect contattati a parità di tempo' },
    { value: '0', text: 'Le email di follow-up che dimentichi di mandare' },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-y border-gray-100 bg-white/50">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.2em] text-navy font-display font-semibold mb-3"
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
              className="rounded-xl border border-gray-200 bg-white p-6"
            >
              <p className="font-mono text-2xl font-bold text-accent mb-3">{card.value}</p>
              <p className="text-sm text-gray-600 leading-relaxed font-body">{card.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TargetSection({ targets, activeProfile, setActiveProfile, setActiveEmailTab }: {
  targets: typeof TARGETS;
  activeProfile: Profile;
  setActiveProfile: (p: Profile) => void;
  setActiveEmailTab: (t: number) => void;
}) {
  return (
    <section id="per-chi" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.2em] text-navy font-display font-semibold mb-3"
        >
          Per chi è
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-bold text-3xl text-ink mb-10 max-w-2xl"
        >
          Il tuo commerciale AI, per ogni settore.
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {targets.map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-gray-200 bg-white p-5 hover:border-accent/30 transition-colors cursor-pointer"
              onClick={() => {
                const profileMap: Record<string, Profile> = {
                  'Agenzie e consulenti B2B': 'Agenzia',
                  'Software house e SaaS': 'Startup',
                  'Freelance e professionisti': 'Freelance',
                  'Startup in go-to-market': 'Startup',
                  'PMI con forza vendita piccola': 'PMI',
                };
                const p = profileMap[t.label];
                if (p) { setActiveProfile(p); setActiveEmailTab(0); }
              }}
            >
              <span className="text-2xl mb-2 block">{t.icon}</span>
              <h4 className="font-display font-semibold text-ink mb-1">{t.label}</h4>
              <p className="text-sm text-gray-600 font-body">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection({ testimonials }: { testimonials: typeof TESTIMONIALS }) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white/50 border-y border-gray-100">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.2em] text-navy font-display font-semibold mb-10"
        >
          Cosa dicono i clienti
        </motion.p>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-gray-200 bg-white p-6"
            >
              <p className="font-body text-gray-700 leading-relaxed mb-4 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="text-sm">
                <span className="font-display font-semibold text-ink">{t.name}</span>
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
        <p className="text-xs uppercase tracking-[0.2em] text-navy font-display font-semibold mb-10">
          Domande frequenti
        </p>
        <div className="space-y-2">
          {items.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-display font-semibold text-ink hover:bg-gray-50 transition-colors min-h-[44px]"
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
                    <p className="px-5 pb-4 pt-0 font-body text-gray-600 leading-relaxed border-t border-gray-100">{faq.a}</p>
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
