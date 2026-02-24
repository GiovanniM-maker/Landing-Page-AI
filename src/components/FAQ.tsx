import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/simulatorMock';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-[680px] mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-navy font-display font-semibold mb-10">
          Domande frequenti
        </p>
        <div className="space-y-2">
          {FAQ_ITEMS.map((faq, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl overflow-hidden bg-white"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-display font-semibold text-ink hover:bg-gray-50 transition-colors min-h-[44px]"
                aria-expanded={openIndex === i}
              >
                {faq.q}
                <ChevronDown
                  className={`shrink-0 text-gray-400 transition-transform ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                  size={20}
                />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 pt-0 font-body text-gray-600 leading-relaxed border-t border-gray-100">
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
