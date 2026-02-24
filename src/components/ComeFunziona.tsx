import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileInput, Settings, CheckCircle } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: FileInput,
    title: 'Ci mandi i dati grezzi',
    desc: 'Un file Excel, un export dal PIM, o un accesso al tuo catalogo.',
  },
  {
    num: '02',
    icon: Settings,
    title: 'Il sistema li processa',
    desc: 'Arricchimento attributi, SEO, formattazione HTML, tone of voice su misura.',
  },
  {
    num: '03',
    icon: CheckCircle,
    title: 'Ricevi schede pronte',
    desc: 'File pronto per l\'importazione nel tuo PIM. Zero lavoro manuale.',
  },
];

export default function ComeFunziona() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="come-funziona" ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAF8]">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 md:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="absolute top-6 right-6 font-display font-bold text-4xl text-navy/10">
                {step.num}
              </span>
              <div className="mb-4 text-navy">
                <step.icon size={28} strokeWidth={1.8} />
              </div>
              <h3 className="font-display font-bold text-lg text-ink mb-2">{step.title}</h3>
              <p className="font-body text-gray-600 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-gray-500 mt-10 font-body"
        >
          In media consegniamo un catalogo completo in 48 ore.
        </motion.p>
      </div>
    </section>
  );
}
