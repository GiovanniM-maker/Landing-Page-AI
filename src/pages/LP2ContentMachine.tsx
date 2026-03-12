import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, FileText, Linkedin, Mail, Instagram, ChevronDown, PenTool, Zap, CheckCircle } from 'lucide-react';
import LandingNavbar from '../components/landing/LandingNavbar';
import LandingFooter from '../components/landing/LandingFooter';

const NAV_LINKS = [
  { label: 'Il problema', id: 'problema' },
  { label: 'Come funziona', id: 'come-funziona' },
  { label: 'Numeri', id: 'numeri' },
];

const FORMATS = ['Blog', 'LinkedIn', 'Newsletter', 'Instagram'] as const;
type Format = typeof FORMATS[number];

const FORMAT_ICONS: Record<Format, typeof FileText> = {
  Blog: FileText,
  LinkedIn: Linkedin,
  Newsletter: Mail,
  Instagram: Instagram,
};

const DEMO_OUTPUTS: Record<Format, { label: string; content: string }> = {
  Blog: {
    label: 'Articolo Blog',
    content: `Come l'intelligenza artificiale sta trasformando il marketing delle PMI italiane

Nel 2026, il 87% delle aziende italiane utilizza già strumenti di AI per la creazione di contenuti. Ma cosa significa concretamente per una PMI?

La risposta è semplice: più contenuti, più visibilità, più clienti  senza aumentare il team.

Le aziende che pubblicano con costanza ottengono il 67% in più di lead rispetto a chi pubblica sporadicamente. Il problema non è mai stato la mancanza di idee, ma la mancanza di un sistema che trasformi quelle idee in contenuti pubblicabili in modo efficiente.

L'AI non sostituisce la tua competenza. La amplifica. Ogni articolo che generi parte dalle tue conoscenze, dal tuo tono di voce, dalla tua esperienza nel settore...`,
  },
  LinkedIn: {
    label: 'Post LinkedIn',
    content: `Ho smesso di scrivere post su LinkedIn per 3 mesi.

Non perché non avessi niente da dire.
Ma perché ogni volta che aprivo il documento, finivo per chiuderlo dopo 10 minuti.

Poi ho provato a usare l'AI come assistente editoriale.

Non per "generare contenuti a caso".
Ma per trasformare le mie idee in post strutturati, nel mio tono, in 30 secondi.

Risultato dopo 60 giorni:
→ 3 post a settimana (prima: 1 al mese)
→ +340% di impression
→ 12 richieste di preventivo dirette

L'AI non scrive al posto mio. Mi toglie la parte che odiavo: la pagina bianca.

Chi sta ancora rimandando?

#AI #ContentMarketing #PMI #LinkedInStrategy`,
  },
  Newsletter: {
    label: 'Newsletter',
    content: `Oggetto: Il tuo competitor pubblica 3 volte a settimana. Tu?

Ciao [Nome],

Questa settimana voglio condividere un dato che mi ha fatto riflettere.

L'87% delle aziende italiane sta già usando l'AI per creare contenuti. Non tra cinque anni. Adesso.

E sai qual è la differenza tra chi lo fa e chi no? Non è il budget. Non è il team. È il sistema.

Chi ha un sistema pubblica. Chi non ce l'ha, rimanda.

Noi abbiamo messo in piedi il nostro sistema in un pomeriggio. Ora ogni lunedì i contenuti della settimana sono pronti  blog, social, newsletter.

Se vuoi sapere come, rispondi a questa email. Ti mostro esattamente cosa facciamo.

A presto,
[Firma]`,
  },
  Instagram: {
    label: 'Caption Instagram',
    content: `Il tuo profilo Instagram fermo da settimane non sta "riposando".

Sta perdendo clienti. 📉

Ogni giorno che non pubblichi, il tuo competitor appare al posto tuo nel feed dei tuoi potenziali clienti.

Ma scrivere caption richiede tempo. Trovare idee richiede energia. Mantenere la costanza richiede un sistema.

Ed è esattamente quello che l'AI ti dà:
✅ Caption pronte in 30 secondi
✅ Nel tuo tono di voce
✅ Ottimizzate per engagement

Non devi diventare un copywriter.
Devi solo avere lo strumento giusto.

🔗 Link in bio per provare gratis

#ContentMarketing #AIperPMI #InstagramStrategy #MarketingDigitale #PMIitaliane`,
  },
};

const FAQ_ITEMS = [
  {
    q: 'Ma i contenuti suonano finti?',
    a: 'No. Il sistema impara il tuo stile dalle prime interazioni. Niente tono da ChatGPT anni 2022. Ogni contenuto viene generato partendo dal tuo tone of voice, dal tuo settore, dal tuo modo di comunicare.',
  },
  {
    q: 'Devo sapere usare strumenti complicati?',
    a: 'No. Se sai scrivere un messaggio WhatsApp, sai usare questo. L\'interfaccia è pensata per chi non ha tempo da perdere con tutorial.',
  },
  {
    q: 'Quanto costa?',
    a: 'Meno di un\'ora del tuo tempo a settimana. I piani partono da cifre accessibili per qualsiasi PMI. Scopri i dettagli nella sezione piani.',
  },
];

const TESTIMONIALS = [
  {
    quote: 'Prima pubblicavamo un post al mese, se andava bene. Ora usciamo tre volte a settimana su LinkedIn e la newsletter va ogni giovedì. I clienti ci scrivono dicendo che ci vedono ovunque.',
    name: 'Marco R.',
    role: 'Marketing Manager',
    company: 'Studio Associato  Verona',
  },
  {
    quote: 'Ho provato a farlo con ChatGPT ma il risultato sembrava scritto da un robot. Questo invece parla come me.',
    name: 'Elena B.',
    role: 'Founder',
    company: 'Agenzia digital  Torino',
  },
];

export default function LP2ContentMachine() {
  const [scrolled, setScrolled] = useState(false);
  const [activeFormat, setActiveFormat] = useState<Format>('LinkedIn');
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
        ctaLabel="Provala adesso, gratis"
        ctaTarget="demo"
        navLinks={NAV_LINKS}
      />

      {/* Breadcrumb */}
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <p className="text-xs text-gray-500 font-mono">/contenuti</p>
      </div>

      {/* HERO */}
      <section id="hero" className="pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 text-xs font-medium text-accent border border-accent/30 rounded-full mb-6">
              AI Content Machine
            </span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl leading-[1.1] text-[#F5F5F7] mb-6">
              Stai perdendo clienti perché non pubblichi abbastanza.
              <span className="text-accent"> L'AI ora pubblica per te.</span>
            </h1>
            <p className="font-body text-xl text-gray-400 leading-relaxed mb-8 max-w-xl">
              Blog, newsletter, LinkedIn, Instagram  contenuti professionali, nel tuo tone of voice, pronti in 30 secondi.
            </p>
            <button
              onClick={() => scrollTo('demo')}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-white font-display font-semibold rounded-lg hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Provala adesso, gratis
              <ArrowRight size={18} />
            </button>
          </motion.div>

          {/* Demo interattiva */}
          <motion.div
            id="demo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border border-white/10 bg-[#1A1A1A] p-6 shadow-lg"
          >
            <p className="text-xs uppercase tracking-[0.15em] text-gray-500 font-display font-semibold mb-4">
              Prova live  Scegli il formato
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {FORMATS.map((f) => {
                const Icon = FORMAT_ICONS[f];
                return (
                  <button
                    key={f}
                    onClick={() => setActiveFormat(f)}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeFormat === f
                        ? 'bg-accent text-white border border-accent'
                        : 'bg-[#0A0A0A] text-gray-400 border border-white/10 hover:border-white/20'
                    }`}
                  >
                    <Icon size={14} />
                    {f}
                  </button>
                );
              })}
            </div>
            <div className="rounded-xl bg-[#0A0A0A] border border-white/5 p-4 max-h-[320px] overflow-y-auto">
              <p className="text-[10px] uppercase tracking-wider text-accent font-display font-semibold mb-2">
                {DEMO_OUTPUTS[activeFormat].label}
              </p>
              <p className="font-body text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                {DEMO_OUTPUTS[activeFormat].content}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROBLEMA */}
      <SectionParagraphs id="problema" />

      {/* SOLUZIONE */}
      <SolutionSection activeFormat={activeFormat} setActiveFormat={setActiveFormat} />

      {/* COME FUNZIONA */}
      <HowItWorks />

      {/* NUMERI + CALCOLATORE */}
      <NumbersSection
        calcHours={calcHours}
        setCalcHours={setCalcHours}
        calcRate={calcRate}
        setCalcRate={setCalcRate}
        calcResult={calcResult}
      />

      {/* SOCIAL PROOF */}
      <TestimonialsSection testimonials={TESTIMONIALS} />

      {/* FAQ / OBIEZIONI */}
      <FaqSection items={FAQ_ITEMS} openFaq={openFaq} setOpenFaq={setOpenFaq} />

      {/* CTA FINALE */}
      <LandingFooter
        headline="Smetti di rimandare la newsletter. Il post di oggi scrivilo in 30 secondi."
        subtext="Nessuna carta di credito. Nessun impegno. Risultati immediati."
        ctaLabel="Prova gratis adesso"
        ctaTarget="demo"
        onScrollTo={scrollTo}
      />
    </div>
  );
}

/* ────── Sub-components ────── */

function SectionParagraphs({ id }: { id: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const paragraphs = [
    'Sai già che dovresti pubblicare di più.',
    'Hai idee. Hai competenze. Hai cose da dire.',
    'Ma ogni volta che apri il documento Word per scrivere un post, finisce così:\n hai altro da fare\n non sai da dove partire\n ci hai messo due ore per tre righe',
    'Risultato? Profilo LinkedIn fermo da settimane. Newsletter mai partita. Competitor che pubblica ogni giorno e appare più autorevole di te.',
    'Non è un problema di tempo. È un problema di sistema.',
  ];

  return (
    <section id={id} ref={ref} className="py-24 px-4 sm:px-6">
      <div className="max-w-[680px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
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
              className="whitespace-pre-line"
            >
              {text}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionSection({ activeFormat, setActiveFormat }: { activeFormat: Format; setActiveFormat: (f: Format) => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const points = [
    'Articoli di blog ottimizzati SEO',
    'Post LinkedIn che generano interazioni',
    'Newsletter che le persone aprono davvero',
    'Caption Instagram pronte da copiare',
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
          Il tuo reparto contenuti automatico.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="font-body text-lg text-gray-400 mb-8 max-w-xl"
        >
          Ogni settimana, senza che tu muova un dito:
        </motion.p>
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {points.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#1A1A1A] p-4"
            >
              <CheckCircle size={20} className="text-accent mt-0.5 shrink-0" />
              <span className="font-body text-gray-300">{p}</span>
            </motion.div>
          ))}
        </div>
        <p className="font-display font-semibold text-accent text-lg mb-6">
          Tu decidi i temi. L'AI scrive. Tu approvi in 2 minuti.
        </p>

        {/* Selettore formato */}
        <div className="rounded-2xl border border-white/10 bg-[#1A1A1A] p-6">
          <p className="text-xs uppercase tracking-[0.15em] text-gray-500 font-display font-semibold mb-4">
            Stesso topic, formato diverso
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {FORMATS.map((f) => {
              const Icon = FORMAT_ICONS[f];
              return (
                <button
                  key={f}
                  onClick={() => setActiveFormat(f)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFormat === f
                      ? 'bg-accent text-white border border-accent'
                      : 'bg-[#0A0A0A] text-gray-400 border border-white/10 hover:border-white/20'
                  }`}
                >
                  <Icon size={14} />
                  {f}
                </button>
              );
            })}
          </div>
          <div className="rounded-xl bg-[#0A0A0A] border border-white/5 p-4 max-h-[280px] overflow-y-auto">
            <p className="font-body text-sm text-gray-300 leading-relaxed whitespace-pre-line">
              {DEMO_OUTPUTS[activeFormat].content}
            </p>
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
      icon: PenTool,
      title: 'Dimmi di cosa vuoi parlare',
      desc: 'Scrivi un\'idea, incolla un link, scegli da una lista di argomenti suggeriti.',
    },
    {
      num: '02',
      icon: Zap,
      title: 'L\'AI genera i tuoi contenuti',
      desc: 'Articoli, post, email  nel tuo stile, non in quello di un robot.',
    },
    {
      num: '03',
      icon: CheckCircle,
      title: 'Revisiona e pubblica',
      desc: 'Modifica quello che vuoi. Oppure pubblica direttamente. Fatto.',
    },
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
          Tre passi. Zero competenze tecniche.
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
              <span className="absolute top-6 right-6 font-display font-bold text-4xl text-accent/20">
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

        {/* Before/After */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-6">
            <p className="text-[10px] uppercase tracking-wider text-gray-500 font-display font-semibold mb-3">
              Quello che scrivi tu in 2 ore
            </p>
            <div className="font-mono text-xs text-gray-400 space-y-2 leading-relaxed">
              <p>Mmh... dovrei scrivere qualcosa sul marketing AI...</p>
              <p>[apre documento Word]</p>
              <p>[guarda il cursore lampeggiante per 20 minuti]</p>
              <p>"L'intelligenza artificiale sta rivoluzionando..."</p>
              <p>[cancella tutto]</p>
              <p>[apre LinkedIn per "ispirarsi"]</p>
              <p>[chiude il laptop 2 ore dopo, zero post pubblicati]</p>
            </div>
          </div>
          <div className="rounded-xl border border-accent/30 bg-accent/10 p-6">
            <p className="text-[10px] uppercase tracking-wider text-accent font-display font-semibold mb-3">
              Quello che genera l'AI in 30 secondi
            </p>
            <div className="font-body text-sm text-gray-300 space-y-2 leading-relaxed">
              <p className="font-semibold">Ho smesso di scrivere post su LinkedIn per 3 mesi.</p>
              <p>Non perché non avessi niente da dire. Ma perché ogni volta che aprivo il documento, finivo per chiuderlo dopo 10 minuti.</p>
              <p>Poi ho provato a usare l'AI come assistente editoriale...</p>
              <p className="text-accent font-medium">→ Post completo, formattato, pronto da pubblicare.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NumbersSection({ calcHours, setCalcHours, calcRate, setCalcRate, calcResult }: {
  calcHours: string; setCalcHours: (v: string) => void;
  calcRate: string; setCalcRate: (v: string) => void;
  calcResult: number | null;
}) {
  const cards = [
    { value: '3 ore', text: 'Il tempo medio che una PMI spreca ogni settimana a creare contenuti' },
    { value: '87%', text: 'Delle aziende italiane che usano già l\'AI lo fa per creare testi' },
    { value: '0', text: 'Il numero di copywriter che devi assumere' },
  ];

  return (
    <section id="numeri" className="py-24 px-4 sm:px-6 lg:px-8 border-y border-white/10 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.2em] text-accent font-display font-semibold mb-3"
        >
          I numeri
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-bold text-3xl text-[#F5F5F7] mb-10 max-w-2xl"
        >
          Numeri che parlano da soli.
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
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

        {/* Calcolatore */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/10 bg-[#1A1A1A] p-6 sm:p-8"
        >
          <p className="text-xs uppercase tracking-[0.15em] text-accent font-display font-semibold mb-4">
            Calcolatore risparmio
          </p>
          <p className="font-body text-gray-400 mb-6">
            Scopri quanto stai bruciando in contenuti ogni anno.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Ore/settimana sui contenuti</label>
              <input
                type="number"
                min="0"
                value={calcHours}
                onChange={(e) => setCalcHours(e.target.value)}
                placeholder="es. 3"
                className="w-full rounded-lg border border-white/10 bg-[#0A0A0A] px-4 py-3 text-sm text-[#F5F5F7] placeholder-gray-500 focus:border-accent focus:ring-1 focus:ring-accent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">La tua tariffa oraria &euro;</label>
              <input
                type="number"
                min="0"
                value={calcRate}
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
              className="rounded-xl bg-accent/10 border border-accent/20 p-5 text-center"
            >
              <p className="font-body text-gray-400 mb-1">Stai bruciando circa</p>
              <p className="font-display font-bold text-3xl text-accent">&euro;{calcResult.toLocaleString('it-IT')}</p>
              <p className="font-body text-gray-400 mt-1">all'anno in contenuti. Ecco quanto ti costerebbe delegarlo all'AI.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialsSection({ testimonials }: { testimonials: typeof TESTIMONIALS }) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.2em] text-accent font-display font-semibold mb-10"
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
              className="rounded-xl border border-white/10 bg-[#1A1A1A] p-6"
            >
              <p className="font-body text-gray-300 leading-relaxed mb-4 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="text-sm">
                <span className="font-display font-semibold text-[#F5F5F7]">{t.name}</span>
                <span className="text-gray-500"> &mdash; {t.role}, {t.company}</span>
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
            <div
              key={i}
              className="border border-white/10 rounded-xl overflow-hidden bg-[#1A1A1A]"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-display font-semibold text-[#F5F5F7] hover:bg-white/5 transition-colors min-h-[44px]"
                aria-expanded={openFaq === i}
              >
                {faq.q}
                <ChevronDown
                  className={`shrink-0 text-gray-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                  size={20}
                />
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
                    <p className="px-5 pb-4 pt-0 font-body text-gray-400 leading-relaxed border-t border-white/10">
                      {faq.a}
                    </p>
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
