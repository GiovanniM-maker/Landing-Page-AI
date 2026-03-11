import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

type LandingFooterProps = {
  headline: string;
  subtext?: string;
  ctaLabel: string;
  ctaTarget: string;
  onScrollTo: (id: string) => void;
};

export default function LandingFooter({ headline, subtext, ctaLabel, ctaTarget, onScrollTo }: LandingFooterProps) {
  return (
    <footer className="bg-navy text-white">
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-bold text-3xl sm:text-4xl max-w-2xl mx-auto mb-6"
        >
          {headline}
        </motion.h2>
        {subtext && (
          <p className="text-white/65 text-sm mb-8 max-w-xl mx-auto">
            {subtext}
          </p>
        )}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => onScrollTo(ctaTarget)}
            className="inline-flex items-center gap-2 min-h-[48px] px-8 py-3.5 bg-accent text-white font-display font-semibold rounded-lg hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            {ctaLabel}
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </section>
      <div className="py-6 px-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
        <span className="text-white/70 text-sm">&copy; 2026 Auiki</span>
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
