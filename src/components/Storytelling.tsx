import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Storytelling() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const paragraphs = [
    'Se gestisci un catalogo con migliaia di referenze, conosci questo scenario.',
    'Ogni stagione arriva un file Excel con centinaia di nuovi prodotti. Il tuo team impiega settimane a scrivere le schede una per una. Quando finalmente vanno online, la stagione è già a metà.',
    'Il PIM è pieno di campi vuoti. Descrizioni copiate e incollate. Zero ottimizzazione SEO. I prodotti ci sono, ma non convertono.',
    'Hai provato a chiedere alla tua agenzia SEO di ottimizzare i testi. Ti hanno chiesto mesi e un budget che non avevi.',
    'Hai valutato tool generici. Il risultato era troppo generico — non conoscevano il tuo tone of voice, i tuoi attributi specifici, il formato del tuo PIM.',
    'Le aziende con cataloghi sopra le 5.000 referenze si dividono in due: chi ha strutturato il product enrichment e chi continua a pagare settimane di lavoro manuale.',
    'Quello che ti serve non è un altro tool.',
  ];

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6">
      <div className="max-w-[680px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
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
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: paragraphs.length * 0.06 }}
          className="mt-10 font-display font-bold text-2xl sm:text-3xl text-navy leading-snug"
        >
          È un sistema che conosce già il tuo settore, si adatta al tuo PIM, e ti restituisce schede pronte per vendere.
        </motion.p>
      </div>
    </section>
  );
}
