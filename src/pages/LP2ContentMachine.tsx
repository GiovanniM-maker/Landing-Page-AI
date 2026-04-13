import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Linkedin, Mail, Instagram, FileText, BarChart3 } from 'lucide-react';
import LandingNavbar from '../components/landing/LandingNavbar';
import MainFooter from '../components/landing/MainFooter';

const NAV_LINKS = [
  { label: 'Come funziona', id: 'come-funziona' },
  { label: 'Cosa facciamo', id: 'cosa-facciamo' },
  { label: 'Pricing', id: 'pricing' },
];

const MARQUEE_ITEMS = [
  'LinkedIn', 'Instagram', 'Newsletter', 'Blog & SEO', 'Pubblicazione gestita', 'Piano editoriale', 'Tone of voice', 'Zero costi nascosti',
];

const DELIVERABLES = [
  { icon: Linkedin, title: 'Post LinkedIn', desc: '2-3 uscite settimanali nel tuo tono di voce, per mantenere la rete attiva e posizionare la tua competenza.' },
  { icon: Instagram, title: 'Caption Instagram', desc: 'Testi pronti e indicazioni chiare (per grafiche e caroselli) per un feed ordinato e coerente.' },
  { icon: Mail, title: 'Newsletter settimanale', desc: 'Un appuntamento fisso pronto da inviare, impaginato bene, per farsi leggere dai tuoi contatti.' },
  { icon: FileText, title: 'Articolo blog SEO', desc: 'Un approfondimento mensile per mantenere il sito vivo e farti trovare più facilmente su Google.' },
  { icon: BarChart3, title: 'Report mensile', desc: 'Dati essenziali e sinceri per capire cosa funziona e misurare concretamente il nostro lavoro.' },
];

const STORY_LINES = [
  '«Questa settimana dobbiamo uscire su LinkedIn»',
  'Si apre un documento vuoto a fine giornata',
  'Le urgenze operative prendono il sopravvento',
  'Due ore dopo: zero contenuti prodotti',
  '«Mettiamolo in agenda per la prossima settimana»',
];

const STEPS = [
  { num: '01', title: 'Ci racconti chi sei', desc: 'Una call di 30 minuti. Il tuo settore, il tuo pubblico, i tuoi obiettivi. Noi facciamo le domande giuste, tu porti solo la tua esperienza sul campo.', time: '30 minuti · una volta sola' },
  { num: '02', title: 'Impostiamo il lavoro', desc: 'Definiamo la rotta: fonti, calendario, canali. L\'Audit Strategico fissa subito il posizionamento corretto della tua azienda. Costo fisso: €500.', time: 'Prima settimana' },
  { num: '03', title: 'Pubblichiamo per te', desc: 'Da quel momento il sistema è attivo: noi produciamo settimanalmente i contenuti, tu (se vuoi) li approvi. Canali curati, continuità garantita. Tu misuri i risultati.', time: 'Ogni settimana, in autonomia' },
];

const MATH_ROWS = [
  { label: 'Copywriter junior (part-time)', val: '€1.500/mese' },
  { label: 'Social media manager', val: '€1.200/mese' },
  { label: 'Strumenti professionali', val: '€150/mese' },
  { label: 'Tempo speso internamente', val: '€400/mese' },
];

const LEAD_WEBHOOK_URL = "https://giovannimavilla.app.n8n.cloud/webhook/f5d0fd75-8c72-4c61-8029-cd6c46832039";

export default function LP2ContentMachine() {
  const [scrolled, setScrolled] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [formSent, setFormSent] = useState(false);

  const validateEmail = (e: string) => {
    const v = e.trim().toLowerCase();
    if (!v || !v.includes("@")) return "Inserisci un'email valida.";
    const [local, domain] = v.split("@");
    if (!local || !domain || !domain.includes(".")) return "Inserisci un'email valida.";
    return "";
  };

  const submitLead = async () => {
    if (!firstName.trim()) return setEmailError("Inserisci il nome.");
    if (!lastName.trim()) return setEmailError("Inserisci il cognome.");
    const err = validateEmail(email);
    if (err) return setEmailError(err);
    setEmailError("");
    try {
      const res = await fetch(LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: firstName.trim(), cognome: lastName.trim(), email: email.trim().toLowerCase(), source: "contenuti" }),
      });
      if (!res.ok) throw new Error("Errore");
      setFormSent(true);
    } catch {
      setEmailError("Errore invio. Riprova.");
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#000000] text-[#F5F5F7] min-h-screen">
      <LandingNavbar
        onScrollTo={scrollTo}
        scrolled={scrolled}
        ctaLabel="Sentiamoci"
        ctaTarget="contatti"
        navLinks={NAV_LINKS}
      />

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
            <h1 className="hero-h1 font-body text-[#F5F5F7] mb-6">
              Creare contenuti è indispensabile.
              <br />
              <span className="text-accent">Ora è anche accessibile.</span>
              <span className="block mt-2 text-2xl sm:text-3xl text-accent">€500 / mese.</span>
            </h1>
            <p className="font-body text-lg text-gray-400 leading-relaxed mb-4 max-w-xl">
              Conosciamo le piccole e medie imprese. In fondo lo siamo anche noi. Sappiamo che metti tutta la tua energia nel tuo prodotto o nel tuo servizio.
            </p>
            <p className="font-body text-lg text-gray-400 leading-relaxed mb-4 max-w-xl">
              Ma nel 2026, se non ti racconti online, è come se non esistessi.
            </p>
            <p className="font-body text-lg text-gray-400 leading-relaxed mb-4 max-w-xl">
              Abbiamo unito la nostra competenza d'agenzia all'efficacia dell'AI, con un obiettivo semplice e diretto: darti una presenza digitale professionale e continua, a un budget sostenibile.
            </p>
            <p className="font-body text-lg font-semibold text-gray-300 mb-8 max-w-xl">
              Tu guidi l'azienda. Noi presidiamo i tuoi canali.
            </p>
            <button
              onClick={() => scrollTo('contatti')}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-white font-body font-semibold rounded-lg hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Possiamo anche sentirci subito
              <ArrowRight size={18} />
            </button>
          </motion.div>

          {/* Price card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border border-white/10 bg-[#1A1A1A] p-6 sm:p-8"
          >
            <p className="text-[10px] uppercase tracking-wider text-accent font-body font-semibold mb-4">
              Canone mensile
            </p>
            <p className="font-body font-bold text-5xl text-[#F5F5F7] mb-1">
              <span className="text-2xl text-accent align-top">€</span>500
            </p>
            <p className="font-body text-sm text-gray-400 mb-6">al mese · Iniziamo con 3 mesi?</p>
            <ul className="space-y-3 font-body text-sm text-gray-300">
              {['Piano editoriale mensile su misura', 'Contenuti per LinkedIn, Instagram, newsletter, blog', 'Pubblicazione gestita ogni settimana', 'Revisione e allineamento continuo', 'Report mensile sui risultati', 'Supporto diretto via WhatsApp'].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-accent">·</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                <p className="font-body font-semibold text-[#F5F5F7]">Audit Strategico</p>
                <p className="text-xs text-gray-500">Una tantum · Prima di iniziare</p>
              </div>
              <p className="font-body font-bold text-2xl text-accent">€500</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="py-4 border-y border-white/10 bg-[#0A0A0A] overflow-hidden">
        <div className="flex gap-0 animate-marquee whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 px-5 py-2 border-r border-white/10 font-mono text-xs text-gray-500">
              {item} <span className="text-accent">✓</span>
            </span>
          ))}
        </div>
      </div>

      {/* IL DIVARIO DA COLMARE */}
      <section id="problema" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-accent font-body font-semibold mb-6">
                Il divario da colmare
              </p>
              <h2 className="font-body font-bold text-3xl sm:text-4xl text-[#F5F5F7] mb-8 leading-tight">
                Comunicare costa.<br /><span className="text-accent">Non farlo costa di più.</span>
              </h2>
              <div className="space-y-4 font-body text-gray-400 leading-relaxed">
                <p>Delegare i social richiede budget che le PMI non sempre hanno. Farli internamente ruba tempo prezioso.</p>
                <p>Spesso sul mercato non vince il più bravo, ma chi presidia lo spazio digitale con più forza e costanza.</p>
                <p>Mentre tu sei assorbito a far girare l'azienda, i tuoi competitor usano i social per intercettare clienti e opportunità. Il gap aumenta e tu resti indietro, non certo perché non sai lavorare, ma perché non lo comunichi.</p>
                <p><strong className="text-gray-300">AUIKI ha messo a punto questo servizio per aiutarti a competere ad armi pari.</strong></p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-6">
                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-mono mb-4">// Lo scenario tipico, in ogni azienda</p>
                <div className="space-y-3 font-body text-sm text-gray-400">
                  {STORY_LINES.map((line, i) => (
                    <p key={i} className="flex items-start gap-2">
                      <span className="text-white/30">·</span>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-accent font-body font-semibold mb-3">Il costo reale</p>
                <p className="font-body text-lg text-gray-400 leading-relaxed">
                  Un team interno o un servizio d'agenzia classico richiedono investimenti dai <span className="text-accent font-semibold">€1.500 ai €3.000 al mese.</span>
                </p>
                <p className="text-sm text-gray-500 mt-3">Noi abbiamo ottimizzato il processo con l'AI per garantirti un presidio fisso, fatto bene, a €500/mese.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* COME FUNZIONA */}
      <section id="come-funziona" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-body font-semibold mb-3">Come funziona</p>
            <h2 className="font-body font-bold text-3xl sm:text-4xl text-[#F5F5F7] mb-4">
              Tre passi.<br /><span className="text-accent">Nessuna fatica.</span>
            </h2>
            <p className="font-body text-gray-400 max-w-xl">Nessun tool da studiare o manuale da leggere. Tu ci metti la competenza, al resto pensiamo noi.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-xl overflow-hidden">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#000000] p-8 hover:bg-[#0A0A0A] transition-colors"
              >
                <span className="font-body text-6xl font-bold text-accent/50 block mb-4">{step.num}</span>
                <h3 className="font-body font-bold text-lg text-[#F5F5F7] mb-3">{step.title}</h3>
                <p className="font-body text-sm text-gray-400 leading-relaxed mb-4">{step.desc}</p>
                <p className="font-mono text-xs text-accent">⟶ {step.time}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COSA FACCIAMO */}
      <section id="cosa-facciamo" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-accent font-body font-semibold mb-3">Cosa facciamo</p>
              <h2 className="font-body font-bold text-3xl text-[#F5F5F7] mb-4">
                Tu pensi al tuo lavoro.<br /><span className="text-accent">I contenuti lavorano per te.</span>
              </h2>
              <p className="font-body text-gray-400 mb-6">Un ecosistema di contenuti essenziale, solido e professionale, gestito interamente da noi.</p>
              <ul className="space-y-0">
                {DELIVERABLES.map((d, i) => (
                  <motion.li
                    key={d.title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-6 py-6 border-b border-white/10 last:border-0"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 text-accent">
                      <d.icon size={18} />
                    </div>
                    <div>
                      <p className="font-body font-semibold text-[#F5F5F7] mb-1">{d.title}</p>
                      <p className="font-body text-sm text-gray-400">{d.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-24"
            >
              <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-6">
                <h3 className="font-body font-bold text-lg text-[#F5F5F7] mb-6">Quanto costa la via standard?</h3>
                <div className="space-y-3">
                  {MATH_ROWS.map((r) => (
                    <div key={r.label} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                      <span className="font-body text-sm text-gray-400">{r.label}</span>
                      <span className="font-mono text-sm text-gray-300">{r.val}</span>
                    </div>
                  ))}
                  <div className="h-px bg-white/10 my-2" />
                  <div className="flex justify-between items-center py-2">
                    <span className="font-body text-sm text-gray-400">Totale stimato</span>
                    <span className="font-mono text-sm text-gray-300">~€3.250/mese</span>
                  </div>
                  <div className="h-px bg-white/10 my-2" />
                  <div className="flex justify-between items-center py-2">
                    <span className="font-body font-semibold text-[#F5F5F7]">Il presidio AUIKI</span>
                    <span className="font-body font-bold text-2xl text-accent">€500/mese</span>
                  </div>
                </div>
                <p className="mt-6 text-sm text-gray-500 italic leading-relaxed">
                  €2.750 risparmiati ogni mese. Ben €33.000 all'anno che restano in azienda, investiti sul tuo prodotto, mentre i tuoi canali continuano a lavorare.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* L'INVESTIMENTO */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-body font-semibold mb-3">L'investimento</p>
            <h2 className="font-body font-bold text-3xl sm:text-4xl text-[#F5F5F7] mb-4">
              Due voci.<br /><span className="text-accent">Nessuna sorpresa.</span>
            </h2>
            <p className="font-body text-gray-400 max-w-xl">Un costo iniziale per definire la strategia, un canone per il lavoro di tutti i giorni. Diciamo le cose come stanno.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-white/10 bg-[#1A1A1A] p-6 sm:p-8"
            >
              <p className="text-[10px] uppercase tracking-wider text-accent font-body font-semibold mb-4">Audit Strategico · Una tantum</p>
              <p className="font-body font-bold text-5xl text-[#F5F5F7] mb-1">
                <span className="text-2xl text-accent align-top">€</span>500
              </p>
              <p className="font-body text-sm text-gray-400 mb-4">Pagamento unico prima di iniziare. Non si ripete.</p>
              <div className="h-px bg-white/10 mb-6" />
              <p className="font-body text-gray-300 italic mb-6">È la mappa che guiderà il lavoro. Non è un semplice setup tecnico. È un momento di consulenza vera che fissa le basi del tuo brand sui social. Un documento strategico che resta di tua proprietà.</p>
              <ul className="space-y-2 mb-6 font-body text-sm text-gray-300">
                {['Call strategica di allineamento (60 min)', 'Analisi dei tuoi canali attuali', 'Definizione di posizionamento e tono di voce', 'Benchmark dei competitor su 3 canali', 'Piano editoriale del primo mese', 'Documento strategico consegnato in PDF'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent">·</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button onClick={() => scrollTo('contatti')} className="w-full py-4 border border-white/20 text-[#F5F5F7] font-body font-semibold rounded-lg hover:bg-white/5 transition-all">
                Partiamo con l'Audit? →
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-accent/30 bg-accent/5 p-6 sm:p-8"
            >
              <p className="text-[10px] uppercase tracking-wider text-accent font-body font-semibold mb-4">Gestione Completa · Mensile</p>
              <p className="font-body font-bold text-5xl text-[#F5F5F7] mb-1">
                <span className="text-2xl text-accent align-top">€</span>500
              </p>
              <p className="font-body text-sm text-gray-400 mb-4">Al mese · impegno minimo 3 mesi</p>
              <div className="h-px bg-white/10 mb-6" />
              <p className="font-body text-gray-300 italic mb-6">Il motore sempre acceso. Dalla seconda settimana in poi, la nostra agenzia produce e pubblica per te, assistita dalla tecnologia. Tu mantieni il controllo: puoi supervisionare ogni virgola o delegarci l'intera esecuzione.</p>
              <ul className="space-y-2 mb-6 font-body text-sm text-gray-300">
                {['2-3 post LinkedIn a settimana', 'Caption Instagram + direttive grafiche', 'Newsletter settimanale pronta da inviare', '1 articolo blog SEO al mese', 'Pubblicazione delegata (o invio bozze)', 'Report mensile sulle performance', 'Supporto costante e diretto via WhatsApp'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent">·</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button onClick={() => scrollTo('contatti')} className="w-full py-4 bg-accent text-white font-body font-semibold rounded-lg hover:bg-accent-hover transition-all">
                Sentiamoci →
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTATTI - Form email */}
      <section id="contatti" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-accent/30 bg-accent/5 p-8 sm:p-12 text-center"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-body font-semibold mb-3">Sentiamoci</p>
            <h2 className="font-body font-bold text-3xl sm:text-4xl text-[#F5F5F7] mb-4">
              Pronto a presidiare davvero<br /><span className="text-accent">i tuoi canali?</span>
            </h2>
            <p className="font-body text-gray-400 mb-8 max-w-lg mx-auto leading-relaxed">
              Una call di 30 minuti senza impegno. Capiamo se fa al caso tuo e ti diciamo onestamente se possiamo aiutarti.
            </p>

            {formSent ? (
              <div className="rounded-xl border border-accent/30 bg-accent/10 p-6">
                <p className="font-body font-semibold text-[#F5F5F7] text-lg">Ricevuto! Ti ricontattiamo a breve.</p>
              </div>
            ) : (
              <div className="max-w-md mx-auto text-left">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <input
                    value={firstName}
                    onChange={(e) => { setFirstName(e.target.value); setEmailError(""); }}
                    placeholder="Nome *"
                    className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[#1A1A1A] text-[#F5F5F7] font-body text-sm placeholder:text-gray-500 focus:border-accent focus:outline-none transition-colors"
                  />
                  <input
                    value={lastName}
                    onChange={(e) => { setLastName(e.target.value); setEmailError(""); }}
                    placeholder="Cognome *"
                    className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[#1A1A1A] text-[#F5F5F7] font-body text-sm placeholder:text-gray-500 focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
                <input
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                  placeholder="nome@tuaazienda.it *"
                  className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[#1A1A1A] text-[#F5F5F7] font-body text-sm placeholder:text-gray-500 focus:border-accent focus:outline-none transition-colors mb-4"
                />
                {emailError && <p className="text-accent text-sm mb-3">{emailError}</p>}
                <button
                  onClick={submitLead}
                  className="w-full py-4 bg-accent text-white font-body font-semibold rounded-lg hover:bg-accent-hover hover:scale-[1.01] active:scale-[0.99] transition-all"
                >
                  Possiamo anche sentirci subito →
                </button>
                <p className="text-center text-xs text-gray-500 mt-3">Nessun impegno. Ti rispondiamo entro 24 ore.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <div>
        <MainFooter />
      </div>
    </div>
  );
}
