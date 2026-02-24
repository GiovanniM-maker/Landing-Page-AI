import { motion } from 'framer-motion';

const cards = [
  {
    value: '3-5 settimane',
    text: 'Il tempo medio per mettere online una nuova collezione con processo manuale. Con un flusso strutturato: 48 ore.',
  },
  {
    value: '40% campi vuoti',
    text: 'La percentuale media di attributi incompleti in cataloghi complessi. Ogni campo mancante e un filtro che non converte.',
  },
  {
    value: '~15-30%',
    text: 'Impatto stimato di schede incomplete sulle conversioni: prodotti presenti, ma non trovati o non acquistati.',
  },
];

export default function CostOfInaction() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-y border-gray-100 bg-white/50">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.2em] text-navy font-display font-semibold mb-3"
        >
          Il costo nascosto
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-bold text-3xl text-ink mb-10 max-w-2xl"
        >
          Quanto ti costa il catalogo cosi com&apos;e?
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.article
              key={card.value}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-gray-200 bg-white p-6"
            >
              <p className="font-mono text-2xl font-bold text-accent mb-3">{card.value}</p>
              <p className="text-sm text-gray-600 leading-relaxed font-body">{card.text}</p>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 rounded-lg border-l-4 border-accent bg-orange-50/60 p-4 text-navy font-body leading-relaxed"
        >
          Se il tuo catalogo ha 10.000 referenze, anche un piccolo recupero di conversione puo
          trasformarsi in un impatto economico rilevante entro l&apos;anno.
        </motion.p>
      </div>
    </section>
  );
}
