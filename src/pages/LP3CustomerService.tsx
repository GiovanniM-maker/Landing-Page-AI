import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, MessageCircle, Clock, Calendar, Users, ChevronDown, Shield, CheckCircle } from 'lucide-react';
import LandingNavbar from '../components/landing/LandingNavbar';
import LandingFooter from '../components/landing/LandingFooter';

const NAV_LINKS = [
  { label: 'Il problema', id: 'problema' },
  { label: 'Come funziona', id: 'come-funziona' },
  { label: 'Per chi è', id: 'per-chi' },
];

const SECTORS = ['Clinica dentale', 'Studio medico', 'Hotel', 'Negozio', 'Altro'] as const;
type Sector = typeof SECTORS[number];

const CHAT_CONVERSATIONS: Record<Sector, { sender: 'user' | 'ai'; text: string }[]> = {
  'Clinica dentale': [
    { sender: 'user', text: 'Buonasera, vorrei prenotare una pulizia dei denti. Avete disponibilità questa settimana?' },
    { sender: 'ai', text: 'Buonasera! Certo, abbiamo disponibilità per la pulizia dentale. Questa settimana ho libero:\n\n• Mercoledì 12 marzo ore 10:00\n• Giovedì 13 marzo ore 15:30\n• Venerdì 14 marzo ore 9:00\n\nQuale preferisce? La seduta dura circa 45 minuti. Il costo è di €80.' },
    { sender: 'user', text: 'Giovedì alle 15:30 va benissimo. Come faccio a confermare?' },
    { sender: 'ai', text: 'Perfetto! Ho prenotato per giovedì 13 marzo alle 15:30 con la Dott.ssa Rossi.\n\nLe invio un promemoria il giorno prima via WhatsApp. Se ha bisogno di spostare o cancellare, mi scriva qui almeno 24 ore prima.\n\nA giovedì! 😊' },
  ],
  'Studio medico': [
    { sender: 'user', text: 'Buongiorno, devo fare delle analisi del sangue. Servono appuntamento o posso venire direttamente?' },
    { sender: 'ai', text: 'Buongiorno! Per le analisi del sangue serve l\'appuntamento. I prelievi vengono effettuati dal lunedì al venerdì, dalle 7:30 alle 10:00.\n\nProssime disponibilità:\n• Martedì 11 marzo ore 8:00\n• Mercoledì 12 marzo ore 7:30\n• Giovedì 13 marzo ore 9:00\n\nRicordo che è necessario presentarsi a digiuno da almeno 8 ore. Quale data preferisce?' },
    { sender: 'user', text: 'Martedì alle 8 va bene. Devo portare l\'impegnativa?' },
    { sender: 'ai', text: 'Sì, porti l\'impegnativa del medico curante e la tessera sanitaria. Se ha la ricetta dematerializzata (NRE), basta il codice.\n\nHo prenotato per martedì 11 marzo alle 8:00. Le invio un promemoria lunedì sera.\n\nA martedì!' },
  ],
  'Hotel': [
    { sender: 'user', text: 'Buongiorno, vorrei sapere la disponibilità per 2 notti dal 20 al 22 marzo, camera doppia.' },
    { sender: 'ai', text: 'Buongiorno! Per le date 20-22 marzo abbiamo disponibilità:\n\n🏨 Camera Doppia Classic — €120/notte\n🏨 Camera Doppia Superior (vista giardino) — €155/notte\n\nEntrambe includono colazione a buffet, Wi-Fi, parcheggio.\n\nCheck-in dalle 14:00, check-out entro le 11:00.\n\nDesidera procedere con la prenotazione?' },
    { sender: 'user', text: 'La Superior, grazie. È possibile il late check-out?' },
    { sender: 'ai', text: 'Ottima scelta! Ho riservato la Camera Doppia Superior per 2 notti (20-22 marzo) — totale €310.\n\nPer il late check-out: possiamo garantire fino alle 13:00 senza supplemento, soggetto a disponibilità. Le confermeremo il giorno del check-out.\n\nLe invio il link per completare la prenotazione con un acconto del 30%. Ha altre domande?' },
  ],
  'Negozio': [
    { sender: 'user', text: 'Ciao, avete la Nike Air Max 90 bianca taglia 43?' },
    { sender: 'ai', text: 'Ciao! Verifico subito... ✓\n\nSì, la Nike Air Max 90 bianca è disponibile in taglia 43!\n\n💰 Prezzo: €139,90\n📍 Disponibile nel nostro punto vendita di Via Roma 15\n🚚 Oppure spedizione gratuita in 2-3 giorni\n\nVuoi che te la metta da parte in negozio o preferisci l\'ordine online?' },
    { sender: 'user', text: 'Mettila da parte, passo domani pomeriggio' },
    { sender: 'ai', text: 'Fatto! La Nike Air Max 90 bianca tg. 43 è riservata a tuo nome fino a domani sera (ore 19:30).\n\n📍 Via Roma 15 — orario: 10:00-19:30\n\nSe cambi idea o hai bisogno di altro, scrivimi pure qui. A domani!' },
  ],
  'Altro': [
    { sender: 'user', text: 'Salve, vorrei informazioni sui vostri servizi di consulenza aziendale.' },
    { sender: 'ai', text: 'Salve! Grazie per l\'interesse. Offriamo diversi servizi di consulenza:\n\n📊 Consulenza strategica — analisi del business e piano di crescita\n💼 Consulenza operativa — ottimizzazione dei processi\n📈 Consulenza marketing — strategia digitale e posizionamento\n\nOgni percorso inizia con un incontro gratuito di 30 minuti per capire le sue esigenze. Vuole fissare una call conoscitiva?' },
    { sender: 'user', text: 'Sì, quando è possibile?' },
    { sender: 'ai', text: 'Prossime disponibilità per la call conoscitiva:\n\n• Mercoledì 12 marzo ore 11:00\n• Giovedì 13 marzo ore 16:00\n• Venerdì 14 marzo ore 10:00\n\nDura circa 30 minuti, via Google Meet. Quale preferisce? Le invierò il link non appena conferma.' },
  ],
};

const TARGETS = [
  { icon: '🏥', label: 'Cliniche e studi medici', desc: 'Prenotazioni, conferme, disdette, FAQ sui servizi' },
  { icon: '🏨', label: 'Hotel e B&B', desc: 'Disponibilità, check-in info, richieste speciali' },
  { icon: '🛍️', label: 'Negozi e showroom', desc: 'Orari, prodotti, preventivi base, appuntamenti' },
  { icon: '💼', label: 'Studi professionali', desc: 'Primo contatto, raccolta documenti, gestione agenda' },
  { icon: '🏢', label: 'Qualsiasi PMI', desc: 'Con più di 20 richieste a settimana' },
];

const FAQ_ITEMS = [
  {
    q: 'I miei clienti vogliono parlare con una persona vera?',
    a: 'L\'AI non finge di essere umana. È trasparente. Ma risponde meglio e più velocemente di molti umani — e i clienti lo apprezzano. Le richieste complesse vengono sempre passate a te.',
  },
  {
    q: 'Devo cambiare i miei sistemi?',
    a: 'No. Si integra con quello che già usi: Google Calendar, WhatsApp Business, il tuo sito. Zero stravolgimenti.',
  },
  {
    q: 'E se l\'AI risponde una cosa sbagliata?',
    a: 'La configuriamo noi, la testiamo con te, e ogni risposta incerta viene escalata a te prima di uscire. Controllo totale.',
  },
];

const TESTIMONIALS = [
  {
    quote: 'Prima avevamo una segretaria part-time solo per gestire le chiamate. Ora l\'AI gestisce l\'80% delle richieste da sola. La segretaria si occupa solo dei casi che richiedono davvero attenzione umana.',
    name: 'Dott. Giovanni L.',
    role: 'Direttore',
    company: 'Studio Dentistico — Veneto',
  },
  {
    quote: 'Un paziente mi ha scritto alle 2 di notte per prenotare una visita urgente. L\'AI ha risposto, ha raccolto i dati, ha inserito l\'appuntamento. Io ho trovato tutto pronto la mattina.',
    name: 'Dott.ssa Sara M.',
    role: 'Medico',
    company: 'Studio privato — Milano',
  },
];

export default function LP3CustomerService() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSector, setActiveSector] = useState<Sector>('Clinica dentale');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [calcRequests, setCalcRequests] = useState('');
  const [calcValue, setCalcValue] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const calcResult = calcRequests && calcValue ? Math.round(parseFloat(calcRequests) * parseFloat(calcValue) * 0.3 * 4) : null;

  return (
    <div className="bg-[#000000] text-[#F5F5F7] min-h-screen">
      <LandingNavbar
        onScrollTo={scrollTo}
        scrolled={scrolled}
        ctaLabel="Parla con la demo"
        ctaTarget="demo"
        navLinks={NAV_LINKS}
      />

      {/* Breadcrumb */}
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <p className="text-xs text-gray-500 font-mono">/assistente</p>
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
              AI Customer Service
            </span>
            <h1 className="hero-h1 font-display text-[#F5F5F7] mb-6">
              I tuoi clienti chiamano.
              <span className="text-accent"> L'AI risponde — meglio di un umano.</span>
            </h1>
            <p className="font-body text-xl text-gray-400 leading-relaxed mb-8 max-w-xl">
              Un assistente virtuale che conosce la tua azienda, risponde alle domande, prenota appuntamenti e gestisce richieste — 24/7, in italiano perfetto.
            </p>
            <button
              onClick={() => scrollTo('demo')}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-white font-display font-semibold rounded-lg hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Parla adesso con una demo live
              <ArrowRight size={18} />
            </button>
          </motion.div>

          {/* Demo Chat */}
          <motion.div
            id="demo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border border-white/10 bg-[#1A1A1A] shadow-lg overflow-hidden"
          >
            <div className="bg-navy px-4 py-3 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <MessageCircle size={16} className="text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-display font-semibold">Assistente AI</p>
                <p className="text-white/60 text-[10px]">Online ora</p>
              </div>
            </div>
            <div className="px-4 py-2">
              <div className="flex flex-wrap gap-1.5 py-2">
                {SECTORS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setActiveSector(s)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                      activeSector === s
                        ? 'bg-accent text-white'
                        : 'bg-white/10 text-gray-400 hover:bg-white/20'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="px-4 pb-4 max-h-[360px] overflow-y-auto space-y-3">
              {CHAT_CONVERSATIONS[activeSector].map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-accent text-white rounded-br-md'
                        : 'bg-[#0A0A0A] text-gray-300 rounded-bl-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROBLEMA */}
      <ProblemSection
        calcRequests={calcRequests}
        setCalcRequests={setCalcRequests}
        calcValue={calcValue}
        setCalcValue={setCalcValue}
        calcResult={calcResult}
      />

      {/* SOLUZIONE */}
      <SolutionSection />

      {/* COME FUNZIONA */}
      <HowItWorks />

      {/* NUMERI */}
      <NumbersSection />

      {/* PER CHI È */}
      <TargetSection targets={TARGETS} activeSector={activeSector} setActiveSector={setActiveSector} chatConversations={CHAT_CONVERSATIONS} />

      {/* SOCIAL PROOF */}
      <TestimonialsSection testimonials={TESTIMONIALS} />

      {/* OBIEZIONI */}
      <FaqSection items={FAQ_ITEMS} openFaq={openFaq} setOpenFaq={setOpenFaq} />

      {/* CTA FINALE */}
      <LandingFooter
        headline="Il prossimo cliente che ti scrive alle 22 non deve aspettare fino a domani mattina."
        subtext="Configurazione in 30 minuti. Nessun contratto. Puoi disattivarla quando vuoi."
        ctaLabel="Attiva la demo gratuita per la tua azienda"
        ctaTarget="demo"
        onScrollTo={scrollTo}
      />
    </div>
  );
}

/* ────── Sub-components ────── */

function ProblemSection({ calcRequests, setCalcRequests, calcValue, setCalcValue, calcResult }: {
  calcRequests: string; setCalcRequests: (v: string) => void;
  calcValue: string; setCalcValue: (v: string) => void;
  calcResult: number | null;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const paragraphs = [
    'Ogni giorno perdi clienti che non riesci a gestire.',
    'Squilla il telefono mentre sei con un altro cliente. Arriva un messaggio WhatsApp alle 22. Una email rimane senza risposta per tre giorni.',
    'Un potenziale cliente che voleva solo sapere il prezzo — se ne va da un competitor che ha risposto in 2 minuti.',
    'Non è colpa tua. Non puoi essere ovunque.\nMa il problema costa. Ogni mese.',
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
              className="whitespace-pre-line"
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
            Calcola quanto perdi
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Richieste/settimana senza risposta immediata</label>
              <input
                type="number"
                min="0"
                value={calcRequests}
                onChange={(e) => setCalcRequests(e.target.value)}
                placeholder="es. 10"
                className="w-full rounded-lg border border-white/10 bg-[#0A0A0A] px-4 py-3 text-sm text-[#F5F5F7] placeholder-gray-500 focus:border-accent focus:ring-1 focus:ring-accent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Valore medio di un cliente &euro;</label>
              <input
                type="number"
                min="0"
                value={calcValue}
                onChange={(e) => setCalcValue(e.target.value)}
                placeholder="es. 200"
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
              <p className="font-body text-gray-400 mb-1">Stai perdendo circa</p>
              <p className="font-display font-bold text-3xl text-accent">&euro;{calcResult.toLocaleString('it-IT')}</p>
              <p className="font-body text-gray-400 mt-1">al mese in clienti non gestiti.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function SolutionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const points = [
    'Risponde su WhatsApp, sul sito, via email',
    'Conosce i tuoi servizi, prezzi, orari',
    'Prenota appuntamenti nel tuo calendario',
    'Scala le situazioni complesse solo a te',
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
          Il tuo assistente AI risponde al posto tuo — sempre.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="font-body text-lg text-gray-400 mb-8 max-w-xl"
        >
          Risponde in secondi. Non in ore. Tu la mattina apri il telefono e trovi tutto già gestito.
        </motion.p>
        <div className="grid md:grid-cols-2 gap-4">
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
      icon: Shield,
      title: 'Lo configuriamo con le tue info',
      desc: 'Servizi, prezzi, FAQ, orari, tono di voce. In 30 minuti è pronto.',
    },
    {
      num: '02',
      icon: MessageCircle,
      title: 'Lo attivi sui tuoi canali',
      desc: 'Sito web, WhatsApp Business, email. Dove sono già i tuoi clienti.',
    },
    {
      num: '03',
      icon: CheckCircle,
      title: 'Lui risponde. Tu lavori.',
      desc: 'Ogni mattina ricevi un report. Intervieni solo quando serve davvero.',
    },
  ];

  const timeline = [
    { time: '23:14', event: 'Cliente scrive su WhatsApp' },
    { time: '23:14', event: 'Risposta in 8 secondi' },
    { time: '23:15', event: 'Appuntamento prenotato' },
    { time: '07:30', event: 'Tu lo vedi il mattino dopo' },
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
          Pronto in 30 minuti. Attivo 24/7.
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

        {/* Timeline */}
        <div className="mt-16 rounded-2xl border border-white/10 bg-[#1A1A1A] p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.15em] text-accent font-display font-semibold mb-6">
            Una notte tipica
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

function NumbersSection() {
  const cards = [
    { value: '-40%', text: 'I tempi di risposta ai clienti dopo l\'implementazione' },
    { value: '+35%', text: 'La soddisfazione cliente media nelle PMI che hanno adottato assistenti AI' },
    { value: '8 sec', text: 'Il tempo medio di risposta. Un umano ci mette ore.' },
    { value: '€0', text: 'Di straordinari, contributi, ferie, malattia' },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-y border-white/10 bg-white/50">
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

function TargetSection({ targets, activeSector, setActiveSector, chatConversations }: {
  targets: typeof TARGETS;
  activeSector: Sector;
  setActiveSector: (s: Sector) => void;
  chatConversations: typeof CHAT_CONVERSATIONS;
}) {
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
          Funziona per il tuo settore.
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <div key={i} className="border border-white/10 rounded-xl overflow-hidden bg-white">
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
