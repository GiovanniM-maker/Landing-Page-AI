import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const metrics = [
  { value: 15000, suffix: '+', label: 'Referenze processate' },
  { value: 80, suffix: '%', label: 'Tempo risparmiato' },
  { value: 48, suffix: 'h', label: 'Per un catalogo completo' },
  { value: 0, label: 'Eataly Italia', isText: true },
];

function useCountUp(end: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

function Metric({ value, suffix, label, isText }: { value: number; suffix?: string; label: string; isText?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const count = useCountUp(value, 1500, inView && !isText);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="font-display font-bold text-2xl sm:text-3xl text-ink">
        {isText ? label : `${count.toLocaleString('it-IT')}${suffix ?? ''}`}
      </div>
      <div className="mt-1 text-sm text-gray-500 font-body">
        {isText ? 'Cliente enterprise' : label}
      </div>
    </motion.div>
  );
}

export default function MetricsBar() {
  return (
    <section id="metriche" className="py-16 bg-gray-50/80 border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {metrics.map((m, i) => (
            <Metric
              key={i}
              value={m.value}
              suffix={m.suffix}
              label={m.label}
              isText={m.value === 0 && m.label === 'Eataly Italia'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
