import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

type HeroProps = {
  onScrollTo: (id: string) => void;
  ctaVariant: 'a' | 'b';
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function Hero({ onScrollTo, ctaVariant }: HeroProps) {
  const primaryCta =
    ctaVariant === 'b' ? 'Scopri il gap del tuo catalogo' : 'Analizza la tua scheda prodotto';

  return (
    <section id="hero" className="min-h-[90vh] flex items-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="lg:max-w-[55%]"
        >
          <motion.span
            variants={item}
            className="inline-block px-3 py-1 text-xs font-medium text-navy border border-navy/30 rounded-full mb-6"
          >
            Case Study verificato: Eataly Italia
          </motion.span>
          <motion.h1
            variants={item}
            className="font-display font-bold text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.15] text-ink mb-6"
          >
            Ogni mese il tuo catalogo perde vendite.
            <span className="text-accent"> Ogni scheda incompleta</span> e fatturato lasciato sul tavolo.
          </motion.h1>
          <motion.p
            variants={item}
            className="font-body text-xl text-gray-600 leading-relaxed mb-8 max-w-xl"
          >
            Eataly partiva dallo stesso scenario su 15.000 referenze: tempi ridotti dell&apos;80%,
            schede pronte in 48 ore e team interno liberato dal lavoro ripetitivo.
          </motion.p>
          <motion.div variants={item} className="flex flex-wrap gap-4">
            <button
              onClick={() => onScrollTo('simulatore')}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-white font-display font-semibold rounded-lg hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {primaryCta}
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => onScrollTo('come-funziona')}
              className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-navy text-navy font-display font-semibold rounded-lg hover:bg-navy hover:text-white transition-colors"
            >
              <Play size={18} />
              Guarda come funziona
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          transition={{ delayChildren: 0.2, staggerChildren: 0.15 }}
          className="relative lg:pl-8"
        >
          {/* Card PRIMA - dietro, leggermente ruotata */}
          <motion.div
            variants={item}
            className="absolute right-0 top-4 w-[85%] max-w-md rounded-xl border border-gray-200 bg-white p-4 shadow-lg shadow-gray-200/60 -rotate-2"
            style={{ zIndex: 0 }}
          >
            <div className="text-[10px] uppercase tracking-wider text-gray-400 font-display font-semibold mb-3">Prima</div>
            <div className="font-mono text-xs text-gray-500 space-y-1">
              <div className="truncate">Nome: [vuoto]</div>
              <div className="truncate">Descrizione: Lorem ipsum dolor sit ame...</div>
              <div className="truncate">Attributi: 2/12</div>
              <div className="truncate">SEO: Non ottimizzato</div>
              <div className="text-gray-300">- - - - - - - - -</div>
              <div className="truncate">Tag: [mancanti]</div>
            </div>
          </motion.div>
          {/* Card DOPO - in primo piano */}
          <motion.div
            variants={item}
            className="relative w-[90%] max-w-md rounded-xl border border-gray-200 bg-white p-5 shadow-xl shadow-gray-300/50 mt-16 ml-0 lg:ml-8 rotate-1"
            style={{ zIndex: 1 }}
          >
            <div className="text-[10px] uppercase tracking-wider text-accent font-display font-semibold mb-3">Dopo</div>
            <div className="space-y-2">
              <div className="font-display font-semibold text-sm text-ink">Scheda completa · Punteggio 89/100</div>
              <div className="flex flex-wrap gap-1">
                <span className="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded">SEO</span>
                <span className="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded">Attributi</span>
                <span className="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded">HTML</span>
              </div>
              <div className="font-mono text-xs text-gray-600 pt-1 border-t border-gray-100">
                12 attributi · Meta description · Cross-selling
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
