import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, FileText } from 'lucide-react';
import { isConsumerEmail } from '../data/simulatorMock';

const bullets = [
  'Punteggi medi di completezza per settore',
  'I 5 attributi che impattano di più sulla conversione',
  'Case study Eataly: da 35/100 a 89/100',
  'Checklist operativa per il tuo team',
];

export default function LeadMagnet() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (isConsumerEmail(email)) {
      setError(
        'Per personalizzare l\'analisi sulla tua azienda abbiamo bisogno della tua email aziendale.'
      );
      return;
    }
    const payload = {
      email,
      azione: 'lead_magnet',
      timestamp: new Date().toISOString(),
    };
    // TODO: webhook o API per download
    console.log('Lead magnet payload:', payload);
    setSuccess('Report inviato. Controlla la tua casella tra pochi minuti.');
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAF8] border-t border-gray-100">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[3/4] max-h-[400px] rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden flex items-center justify-center">
              <div className="p-8 text-center">
                <FileText className="mx-auto text-navy/40 mb-4" size={64} />
                <div className="font-display font-bold text-navy text-lg">Benchmark 2026</div>
                <div className="font-body text-gray-500 text-sm mt-1">Product Enrichment</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink mb-3">
              Benchmark 2026: Product Enrichment per settore
            </h2>
            <p className="font-body text-gray-600 mb-6">
              Come si posizionano le schede prodotto nel tuo settore rispetto ai top performer.
            </p>
            <ul className="space-y-3 mb-8">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 font-body">
                  <Check className="shrink-0 text-accent" size={20} />
                  {b}
                </li>
              ))}
            </ul>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="nome@tuaazienda.it"
                className="flex-1 min-h-[44px] px-4 py-3 rounded-lg border border-gray-300 bg-white text-ink placeholder-gray-400 focus:border-accent focus:ring-1 focus:ring-accent font-body"
                required
              />
              <button
                type="submit"
                className="min-h-[44px] px-6 py-3 bg-accent text-white font-display font-semibold rounded-lg hover:bg-accent-hover transition-colors shrink-0"
              >
                Scarica il report gratuito
              </button>
            </form>
            {error && <p className="mt-2 text-accent text-sm">{error}</p>}
            {!error && success && <p className="mt-2 text-green-700 text-sm">{success}</p>}
            <p className="mt-3 text-xs text-gray-500">
              Nessun invio promozionale non richiesto. Usiamo i dati solo per inviarti il report.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
