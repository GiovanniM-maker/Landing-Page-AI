import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Linkedin, Mail, Instagram, ChevronDown, FileText, BarChart3 } from 'lucide-react';
import LandingNavbar from '../components/landing/LandingNavbar';
import LandingFooter from '../components/landing/LandingFooter';

const NAV_LINKS = [
  { label: 'Come funziona', id: 'come-funziona' },
  { label: 'Cosa facciamo', id: 'cosa-facciamo' },
  { label: 'Pricing', id: 'pricing' },
  { label: 'FAQ', id: 'faq' },
];

const MARQUEE_ITEMS = [
  'LinkedIn', 'Instagram', 'Newsletter', 'Blog & SEO', 'Pubblicazione gestita', 'Piano editoriale', 'Tone of voice', 'Zero costi nascosti',
];

const DELIVERABLES = [
  { icon: Linkedin, title: 'Post LinkedIn', desc: '2-3 post a settimana, nel tuo tono di voce, su argomenti che posizionano la tua expertise' },
  { icon: Instagram, title: 'Caption Instagram', desc: 'Contenuti visuali e caption pronte, inclusa indicazione per grafiche e caroselli' },
  { icon: Mail, title: 'Newsletter settimanale', desc: 'Email pronta da inviare, formattata, con oggetto ottimizzato per l\'apertura' },
  { icon: FileText, title: 'Articolo blog SEO', desc: 'Un articolo mensile ottimizzato per portare traffico organico sul tuo sito' },
  { icon: BarChart3, title: 'Report mensile', desc: 'Performance dei contenuti, cosa ha funzionato, cosa ottimizziamo il mese dopo' },
];

const STORY_LINES = [
  '«Dovremmo fare qualcosa su LinkedIn questa settimana»',
  'Si apre un documento Word',
  'Si fissa il cursore lampeggiante per venti minuti',
  'Si apre LinkedIn «per ispirarsi»',
  'Due ore dopo: zero pubblicato',
  '«La prossima settimana lo facciamo per forza»',
];

const STEPS = [
  { num: '01', title: 'Ci racconti chi sei', desc: 'Una call di 30 minuti. Tono di voce, settore, competitor, obiettivi. Ti facciamo le domande giuste, tu non devi preparare niente.', time: '30 minuti · una volta sola' },
  { num: '02', title: 'Costruiamo il sistema', desc: 'Impostiamo la pipeline: fonti di contenuto, calendario editoriale, formati, canali. L\'audit strategico definisce la tua voce e il posizionamento. Costo fisso: €500.', time: 'Prima settimana' },
  { num: '03', title: 'Pubblichiamo ogni settimana', desc: 'Da quel momento: noi produciamo, tu (opzionalmente) approvi. Contenuti pubblicati, calendario pieno, profilo attivo. Tu guardi i risultati.', time: 'Ogni settimana, in autonomia' },
];

const MATH_ROWS = [
  { label: 'Copywriter junior (part-time)', val: '€1.500/mese' },
  { label: 'Social media manager', val: '€1.200/mese' },
  { label: 'Strumenti AI e scheduling', val: '€150/mese' },
  { label: 'Tempo interno di supervisione', val: '€400/mese' },
];

const FAQ_ITEMS = [
  {
    q: 'Dovete avere accesso ai nostri profili social?',
    a: 'Dipende da voi. Offriamo due modalità: gestione completa con accesso ai vostri account (pubblichiamo noi direttamente), oppure modalità bozze dove vi consegniamo tutto pronto e pubblicate voi in autonomia. La maggior parte dei clienti sceglie le bozze il primo mese e poi passa alla gestione completa una volta vista la qualità.',
  },
  {
    q: 'I contenuti suonano "fatti dall\'AI"?',
    a: 'No, e questa è la parte che ci distingue da un tool generico. L\'audit iniziale serve esattamente a calibrare il tono di voce, il lessico, le posizioni che volete prendere, gli argomenti che volete evitare. Usiamo l\'AI come strumento di produzione, ma ogni contenuto passa da una revisione umana prima di uscire. Il risultato suona come voi, non come ChatGPT.',
  },
  {
    q: 'Perché il contratto minimo di 3 mesi?',
    a: 'Il contenuto non si calibra in un mese. Le prime 4-6 settimane servono per trovare il ritmo, capire cosa funziona con il vostro pubblico, e ottimizzare il piano editoriale. Chi ha provato con un mese solo non ha mai visto i risultati. Non perché il servizio non funzioni, ma perché i contenuti hanno bisogno di tempo per costruire autorevolezza e reach. Il minimo di 3 mesi è una garanzia per entrambe le parti.',
  },
  {
    q: 'Cosa succede dopo i 3 mesi?',
    a: 'Rinnovo mensile, senza vincoli. Potete continuare mese per mese, fermarvi quando volete, o ridiscutere il piano se le esigenze cambiano. Nessuna penale, nessun rinnovo automatico silenzioso.',
  },
  {
    q: 'Possiamo approvare i contenuti prima della pubblicazione?',
    a: 'Assolutamente sì. Tutti i contenuti vengono condivisi in anticipo, via Google Docs, Notion, o qualsiasi strumento usiate già. Potete approvare, chiedere modifiche o pubblicare direttamente. Se preferite non essere coinvolti, pubblichiamo in autonomia. La scelta è vostra e può cambiare mese per mese.',
  },
  {
    q: '€500/mese sembra poco per tutto questo. Perché?',
    a: 'Perché usiamo strumenti AI per la produzione, il che abbassa drasticamente il tempo umano necessario. Un nostro operatore gestisce più clienti in parallelo. Il che significa che il costo per cliente è sostenibile. Non stiamo tagliando sulla qualità: stiamo ottimizzando il processo. Il prezzo è basso rispetto al mercato, ma è sostenibile per noi perché il sistema è efficiente.',
  },
];

const TESTIMONIALS = [
  {
    quote: 'Prima pubblicavamo un post al mese, se andava bene. Ora usciamo tre volte a settimana su LinkedIn e la newsletter va ogni giovedì. I clienti ci scrivono dicendo che ci vedono ovunque.',
    name: 'Marco R.',
    role: 'Marketing Manager',
    company: 'Studio Associato · Verona',
  },
  {
    quote: 'Ho provato a farlo con ChatGPT ma il risultato sembrava scritto da un robot. Questo invece parla come me. In tre mesi ho ricevuto 8 richieste di contatto da LinkedIn che non avrei mai avuto.',
    name: 'Elena B.',
    role: 'Founder',
    company: 'Agenzia Digital · Torino',
  },
];

export default function LP2ContentMachine() {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
        ctaLabel="Prenota una call"
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
            <span className="inline-block px-3 py-1 text-xs font-medium text-accent border border-accent/30 rounded-full mb-6">
              Servizio gestito · AI + Umano
            </span>
            <h1 className="hero-h1 font-body text-[#F5F5F7] mb-6">
              Il tuo reparto contenuti.
              <br />
              <span className="text-accent">Già attivo.</span>
              <span className="block mt-2 text-2xl sm:text-3xl text-accent">€500 / mese.</span>
            </h1>
            <p className="font-body text-lg text-gray-400 leading-relaxed mb-8 max-w-xl">
              Costruiamo la tua pipeline di contenuti <strong className="text-gray-300">da zero</strong>, la gestiamo ogni settimana e pubblichiamo per te su LinkedIn, Instagram, newsletter e blog.
              <br /><br />
              Tu non tocchi niente. Noi non ci fermiamo.
            </p>
            <button
              onClick={() => scrollTo('contatti')}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-white font-body font-semibold rounded-lg hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Prenota la call gratuita
              <ArrowRight size={18} />
            </button>
            <p className="mt-8 text-xs text-gray-500 font-mono">// Nessun impegno nella call · Setup incluso · Minimo 3 mesi</p>
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
            <p className="font-body text-sm text-gray-400 mb-6">al mese · contratto minimo 3 mesi</p>
            <ul className="space-y-3 font-body text-sm text-gray-300">
              {['Piano editoriale mensile personalizzato', 'Contenuti per LinkedIn, Instagram, newsletter, blog', 'Pubblicazione gestita ogni settimana', 'Revisione + feedback continuo', 'Report mensile di performance', 'Supporto diretto via WhatsApp'].map((item, i) => (
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

      {/* IL PROBLEMA */}
      <section id="problema" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-accent font-body font-semibold mb-6">
                Il problema
              </p>
              <blockquote className="font-body text-2xl sm:text-3xl font-medium text-[#F5F5F7] italic border-l-2 border-accent pl-8 mb-8 leading-relaxed">
                Sai già che dovresti pubblicare di più. Ma tu hai un'azienda da mandare avanti.
              </blockquote>
              <div className="space-y-4 font-body text-gray-400 leading-relaxed">
                <p>Non hai tempo di imparare prompt, feed RSS, calendari editoriali e strumenti AI. <strong className="text-gray-300">E non dovresti farlo.</strong></p>
                <p>Intanto il tuo competitor pubblica ogni giorno su LinkedIn. Appare più autorevole. Intercetta i clienti che sarebbero tuoi.</p>
                <p>Non è un problema di idee. Non è un problema di tempo. <strong className="text-gray-300">È un problema di esecuzione. E l'esecuzione si delega.</strong></p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-6">
                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-mono mb-4">// Ogni settimana, in ogni azienda italiana</p>
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
                <p className="font-body text-xl sm:text-2xl font-medium text-[#F5F5F7] leading-relaxed">
                  Un dipendente che spreca 3 ore a settimana sui contenuti ti costa
                  <span className="text-accent"> oltre €3.000 l'anno.</span>
                </p>
                <p className="text-sm text-gray-500 mt-3">Per molto meno, tu smetti di pensarci.</p>
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
              Tre passi.<br /><span className="text-accent">Zero competenze richieste.</span>
            </h2>
            <p className="font-body text-gray-400 max-w-xl">Non ti diamo un tool da imparare. Ti costruiamo un sistema e lo gestiamo noi.</p>
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
                Ogni settimana,<br /><span className="text-accent">senza che tu ci pensi.</span>
              </h2>
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
                <h3 className="font-body font-bold text-lg text-[#F5F5F7] mb-6">Quanto costa farlo internamente?</h3>
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
                    <span className="font-body font-semibold text-[#F5F5F7]">Con Auiki</span>
                    <span className="font-body font-bold text-2xl text-accent">€500/mese</span>
                  </div>
                </div>
                <p className="mt-6 text-sm text-gray-500 italic leading-relaxed">
                  €2.750 di differenza mensile. €33.000 l'anno. Abbastanza per assumere qualcuno che fa altro.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-body font-semibold mb-3">Pricing</p>
            <h2 className="font-body font-bold text-3xl sm:text-4xl text-[#F5F5F7] mb-4">
              Due voci.<br /><span className="text-accent">Nessuna sorpresa.</span>
            </h2>
            <p className="font-body text-gray-400 max-w-xl">Setup una volta sola. Poi un costo fisso ogni mese. Non ci sono costi nascosti, scatti tariffari, o rincari.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
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
              <p className="font-body text-sm text-gray-400 mb-4">pagamento unico prima di iniziare</p>
              <p className="font-mono text-xs text-accent mb-6">// Non si ripete · Incluso nella firma del contratto</p>
              <div className="h-px bg-white/10 mb-6" />
              <p className="font-body text-gray-300 italic mb-6">Non è un onboarding tecnico. È una consulenza strategica che resta tua anche se poi non continuassi.</p>
              <ul className="space-y-2 mb-6 font-body text-sm text-gray-300">
                {['Call di 60 minuti approfondita', 'Analisi dei canali esistenti', 'Definizione del tono di voce e posizionamento', 'Benchmark competitor su 3 canali', 'Piano editoriale del primo mese', 'Documento strategico consegnato in PDF'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent">·</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button onClick={() => scrollTo('contatti')} className="w-full py-4 border border-white/20 text-[#F5F5F7] font-body font-semibold rounded-lg hover:bg-white/5 transition-all">
                Inizia dall'Audit →
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
              <p className="font-body text-sm text-gray-400 mb-4">al mese · contratto minimo 3 mesi</p>
              <p className="font-mono text-xs text-accent mb-6">// Il servizio continuo. Dalla seconda settimana in poi.</p>
              <div className="h-px bg-white/10 mb-6" />
              <p className="font-body text-gray-300 italic mb-6">Ogni settimana produciamo e pubblichiamo. Tu hai accesso a tutto, puoi approvare o lasciar fare.</p>
              <ul className="space-y-2 mb-6 font-body text-sm text-gray-300">
                {['2-3 post LinkedIn a settimana', 'Caption Instagram + indicazioni grafiche', 'Newsletter settimanale pronta da inviare', '1 articolo blog SEO al mese', 'Pubblicazione gestita (o bozze se preferisci)', 'Report mensile performance', 'Supporto WhatsApp diretto'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent">·</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button onClick={() => scrollTo('contatti')} className="w-full py-4 bg-accent text-white font-body font-semibold rounded-lg hover:bg-accent-hover transition-all">
                Prenota la call gratuita →
              </button>
              <p className="text-center text-xs text-gray-500 mt-3">La call è gratuita e senza impegno</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-white/10 bg-[#1A1A1A] p-6 flex flex-col sm:flex-row justify-between items-center gap-4"
          >
            <div>
              <p className="font-body font-semibold text-[#F5F5F7]">Investimento totale · Primi 3 mesi</p>
              <p className="text-sm text-gray-400">Audit una tantum + 3 mesi di gestione completa</p>
            </div>
            <p className="font-body font-bold text-3xl text-accent">€2.000 <span className="text-base font-normal text-gray-400">totali</span></p>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.2em] text-accent font-body font-semibold mb-10"
          >
            Cosa dicono
          </motion.p>
          <h2 className="font-body font-bold text-3xl text-[#F5F5F7] mb-12">
            Chi ha smesso<br /><span className="text-accent">di rimandare.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-white/10 bg-[#1A1A1A] p-6"
              >
                <p className="font-body text-gray-300 leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center font-body font-bold text-accent text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-body font-semibold text-[#F5F5F7]">{t.name}</p>
                    <p className="font-mono text-xs text-gray-500">{t.role} · {t.company}</p>
                  </div>
                </div>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#000000]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-body font-semibold mb-3">Domande frequenti</p>
            <h2 className="font-body font-bold text-3xl text-[#F5F5F7]">
              Quello che<br /><span className="text-accent">tutti chiedono.</span>
            </h2>
          </motion.div>
          <div className="space-y-2">
            {FAQ_ITEMS.map((faq, i) => (
              <div
                key={i}
                className="border border-white/10 rounded-xl overflow-hidden bg-[#1A1A1A]"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-body font-semibold text-[#F5F5F7] hover:bg-white/5 transition-colors min-h-[44px]"
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

      {/* CTA FINALE */}
      <div id="contatti">
        <LandingFooter
        headline="Il tuo competitor pubblica già. Tu quando inizi?"
        subtext="Prima call gratuita. Nessun impegno. Se non è la soluzione giusta per te, te lo diciamo in quella call."
        ctaLabel="Prenota la call gratuita"
        ctaTarget="contatti"
        onScrollTo={scrollTo}
      />
      </div>
    </div>
  );
}
