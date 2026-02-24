import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';

type FooterCTAProps = {
  onScrollTo: (id: string) => void;
  ctaVariant: 'a' | 'b';
};

export default function FooterCTA({ onScrollTo, ctaVariant }: FooterCTAProps) {
  const primaryCta =
    ctaVariant === 'b' ? 'Scopri il gap del catalogo' : 'Prova il simulatore';

  return (
    <footer className="bg-navy text-white">
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-bold text-3xl sm:text-4xl max-w-2xl mx-auto mb-10"
        >
          Vuoi vedere cosa possiamo fare con il tuo catalogo?
        </motion.h2>
        <p className="text-white/65 text-sm mb-8">
          Questo mese stiamo aprendo audit completi a un numero limitato di team enterprise.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => onScrollTo('simulatore')}
            className="inline-flex items-center gap-2 min-h-[48px] px-8 py-3.5 bg-accent text-white font-display font-semibold rounded-lg hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            {primaryCta}
            <ArrowRight size={18} />
          </button>
          <a
            href="#calendly"
            className="inline-flex items-center gap-2 min-h-[48px] px-8 py-3.5 border-2 border-white text-white font-display font-semibold rounded-lg hover:bg-white hover:text-navy transition-colors"
          >
            <Calendar size={18} />
            Prenota una Discovery Call
          </a>
        </motion.div>
      </section>
      <div className="py-6 px-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
        <span className="text-white/70 text-sm">© 2026 Auiki</span>
        <a
          href="#privacy"
          className="text-white/70 text-sm hover:text-white transition-colors"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
}
