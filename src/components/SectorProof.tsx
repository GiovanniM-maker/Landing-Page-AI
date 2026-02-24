import { useState } from 'react';
import { motion } from 'framer-motion';
import { SECTOR_RESULTS } from '../data/simulatorMock';

export default function SectorProof() {
  const [active, setActive] = useState(0);
  const current = SECTOR_RESULTS[active];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.2em] text-navy font-display font-semibold mb-3"
        >
          Risultati per settore
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-bold text-3xl text-ink mb-8"
        >
          Funziona nel tuo contesto operativo.
        </motion.h2>

        <div className="flex flex-wrap gap-2 mb-6">
          {SECTOR_RESULTS.map((item, i) => (
            <button
              key={item.sector}
              type="button"
              onClick={() => setActive(i)}
              className={`min-h-[44px] px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                active === i
                  ? 'bg-navy text-white border border-navy'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {item.sector}
            </button>
          ))}
        </div>

        <motion.div
          key={current.sector}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-gray-200 bg-white p-6 grid md:grid-cols-3 gap-5"
        >
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">Volume processato</p>
            <p className="font-display font-bold text-xl text-navy">{current.products}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">Attributi arricchiti</p>
            <p className="text-sm text-gray-600 font-body">{current.attrs}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">Tempo consegna</p>
            <p className="font-mono font-bold text-xl text-accent">{current.time}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
