import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import {
  SECTORS,
  SECTOR_EXAMPLES,
  MOCK_RESULT,
  isConsumerEmail,
  getSectorSlug,
} from '../data/simulatorMock';

type SimState = 'idle' | 'processing' | 'result' | 'gate' | 'unlocked';

const LOADING_MESSAGES = [
  { text: 'Analisi della struttura in corso...', duration: 1500 },
  { text: 'Verifica attributi SEO...', duration: 1500 },
  { text: 'Confronto benchmark di settore...', duration: 1500 },
  { text: 'Generazione report...', duration: 1000 },
];

function ScoreCircle({ score, max = 100 }: { score: number; max?: number }) {
  const pct = score / max;
  const color =
    score < 40 ? '#DC2626' : score <= 60 ? '#D4763C' : '#16A34A';
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference * (1 - pct);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-40 h-40 mx-auto"
    >
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-gray-200"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-mono font-bold text-2xl text-ink"
        >
          {score}/{max}
        </motion.span>
      </div>
      <p className="text-center text-sm text-gray-500 mt-2">Punteggio di completezza</p>
    </motion.div>
  );
}

type SimulatorProps = {
  ctaVariant: 'a' | 'b';
};

export default function Simulator({ ctaVariant }: SimulatorProps) {
  const [state, setState] = useState<SimState>('idle');
  const [sector, setSector] = useState<string>('Fashion');
  const [inputMode, setInputMode] = useState<'text' | 'url'>('text');
  const [inputValue, setInputValue] = useState('');
  const [loadingStep, setLoadingStep] = useState(0);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const primaryCta =
    ctaVariant === 'b' ? 'Scopri il gap del tuo catalogo' : 'Analizza la mia scheda';

  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    setState('processing');
    setLoadingStep(0);
    let elapsed = 0;
    LOADING_MESSAGES.forEach((msg, i) => {
      setTimeout(() => setLoadingStep(i), elapsed);
      elapsed += msg.duration;
    });
    setTimeout(() => setState('result'), 5500);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    if (isConsumerEmail(email)) {
      setEmailError(
        'Per personalizzare l\'analisi sulla tua azienda abbiamo bisogno della tua email aziendale.'
      );
      return;
    }
    setState('unlocked');
    const payload = {
      email,
      settore: getSectorSlug(sector),
      azione: 'simulatore',
      prodotto_inserito: inputValue,
      timestamp: new Date().toISOString(),
    };
    // TODO: collegare webhook n8n
    console.log('Webhook payload:', payload);
  };

  return (
    <section
      id="simulatore"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-navy scroll-mt-20"
    >
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-bold text-3xl sm:text-4xl text-white text-center mb-3"
        >
          Prova il motore sulla tua scheda prodotto
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-white/80 font-body text-lg mb-12"
        >
          Inserisci una scheda reale. Ricevi analisi, punteggio e versione arricchita in 10 secondi.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl overflow-hidden"
        >
          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {state === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <p className="text-white/70 text-sm font-display font-medium mb-2">Settore</p>
                    <div className="flex flex-wrap gap-2">
                      {SECTORS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSector(s)}
                          className={`min-h-[44px] px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            sector === s
                              ? 'bg-accent text-white scale-105'
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setInputValue(SECTOR_EXAMPLES[sector as keyof typeof SECTOR_EXAMPLES] ?? '')}
                      className="mt-3 text-xs text-accent underline underline-offset-4"
                    >
                      Usa un esempio per {sector}
                    </button>
                  </div>

                  <div>
                    <div className="flex gap-1 mb-2">
                      <button
                        type="button"
                        onClick={() => setInputMode('text')}
                        className={`min-h-[44px] px-4 py-2 rounded-lg text-sm font-medium ${
                          inputMode === 'text'
                            ? 'bg-white text-navy'
                            : 'text-white/70 hover:text-white'
                        }`}
                      >
                        Incolla il testo della tua scheda
                      </button>
                      <button
                        type="button"
                        onClick={() => setInputMode('url')}
                        className={`hidden sm:inline-flex min-h-[44px] px-4 py-2 rounded-lg text-sm font-medium ${
                          inputMode === 'url'
                            ? 'bg-white text-navy'
                            : 'text-white/70 hover:text-white'
                        }`}
                      >
                        Incolla URL
                      </button>
                    </div>
                    {inputMode === 'text' ? (
                      <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Es: Giacca invernale uomo in lana merino. Colore: blu navy. Taglia: S-XL. Lavaggio a mano. Made in Italy. Collezione Inverno 2026."
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/40 font-body text-sm resize-y min-h-[120px] focus:border-accent focus:ring-1 focus:ring-accent"
                      />
                    ) : (
                      <input
                        type="url"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="https://www.tuosito.com/prodotto/giacca-lana-merino"
                        className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/40 font-body text-sm focus:border-accent focus:ring-1 focus:ring-accent"
                      />
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full min-h-[48px] py-3.5 bg-accent text-white font-display font-semibold rounded-xl hover:bg-accent-hover hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                  >
                    {primaryCta}
                    <span aria-hidden>→</span>
                  </button>
                </motion.div>
              )}

              {state === 'processing' && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-8 space-y-6"
                >
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-accent rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 5.5, ease: 'linear' }}
                    />
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={loadingStep}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center text-white/90 font-body"
                    >
                      {LOADING_MESSAGES[loadingStep]?.text ?? '...'}
                    </motion.p>
                  </AnimatePresence>
                </motion.div>
              )}

              {(state === 'result' || state === 'gate' || state === 'unlocked') && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <ScoreCircle score={MOCK_RESULT.score} max={MOCK_RESULT.maxScore} />

                  <div className="space-y-3">
                    {MOCK_RESULT.areas.map((area, i) => (
                      <motion.div
                        key={area.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10"
                      >
                        {area.status === 'red' ? (
                          <AlertCircle className="shrink-0 text-red-400" size={20} />
                        ) : (
                          <AlertTriangle className="shrink-0 text-amber-400" size={20} />
                        )}
                        <span className="text-white font-medium text-sm">{area.name}</span>
                        <span className="text-white/60 text-sm ml-auto">{area.value}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <p className="text-white/70 text-sm mb-2">Confronto con il settore</p>
                    <div className="relative h-12 bg-white/10 rounded-lg flex items-center px-2">
                      <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center px-2">
                        <div
                          className="absolute w-3 h-3 rounded-full bg-accent border-2 border-white shadow-lg z-10 transition-all duration-500"
                          style={{ left: `${MOCK_RESULT.benchmark.you}%`, transform: 'translateX(-50%)' }}
                        />
                        <div
                          className="absolute w-0.5 h-6 bg-white/40 rounded"
                          style={{ left: `${MOCK_RESULT.benchmark.sectorAvg}%`, transform: 'translateX(-50%)' }}
                        />
                        <div
                          className="absolute w-0.5 h-6 bg-white/40 rounded"
                          style={{ left: `${MOCK_RESULT.benchmark.topPerformer}%`, transform: 'translateX(-50%)' }}
                        />
                      </div>
                      <div className="absolute left-0 right-0 bottom-0 flex justify-between px-1 text-[10px] text-white/70 -mb-5">
                        <span>Tu: {MOCK_RESULT.benchmark.you}</span>
                        <span>Media: {MOCK_RESULT.benchmark.sectorAvg}</span>
                        <span>Top: {MOCK_RESULT.benchmark.topPerformer}</span>
                      </div>
                    </div>
                  </div>

                  {/* Versione arricchita */}
                  <div className="pt-6 border-t border-white/10">
                    <h3 className="font-display font-bold text-white mb-4">
                      Versione arricchita dal motore Auiki
                    </h3>
                    <div className="relative rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                      <div className="p-4 font-body text-sm text-white/90 space-y-3">
                        <div className="font-display font-semibold text-white">
                          {MOCK_RESULT.enriched.title}
                        </div>
                        <pre className="font-mono text-xs text-white/70 whitespace-pre-wrap">
                          {MOCK_RESULT.enriched.htmlStructure}
                        </pre>
                        <ul className="list-disc list-inside space-y-1 text-white/80">
                          {MOCK_RESULT.enriched.attributes.slice(0, 2).map((a, i) => (
                            <li key={i}>{a}</li>
                          ))}
                          {state === 'unlocked' ? (
                            MOCK_RESULT.enriched.attributes.slice(2).map((a, i) => (
                              <li key={i}>{a}</li>
                            ))
                          ) : (
                            <div className="relative pt-4">
                              <div className="blur-md select-none pointer-events-none space-y-1 list-disc list-inside">
                                {MOCK_RESULT.enriched.attributes.slice(2).map((a, i) => (
                                  <li key={i}>{a}</li>
                                ))}
                                <p className="text-white/70 pt-2">Meta description:</p>
                                <p className="text-white/80 italic">{MOCK_RESULT.enriched.metaDescription}</p>
                              </div>
                              <div
                                className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy/90 pointer-events-none"
                                aria-hidden
                              />
                            </div>
                          )}
                        </ul>
                        {state === 'unlocked' && (
                          <>
                            <p className="text-white/70 pt-2">Meta description:</p>
                            <p className="text-white/80 italic">{MOCK_RESULT.enriched.metaDescription}</p>
                          </>
                        )}
                      </div>

                      {state === 'gate' && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 flex items-center justify-center bg-navy/80 rounded-xl"
                        >
                          <div className="w-full max-w-sm mx-4 p-6 rounded-xl bg-white/10 border border-white/20">
                            <div className="flex justify-center mb-3">
                              <Lock className="text-accent" size={32} />
                            </div>
                            <p className="text-white font-display font-semibold text-center mb-1">
                              La tua scheda e a 47/100. Vuoi vedere come arriva a 89?
                            </p>
                            <p className="text-white/80 text-sm text-center mb-4">
                              La versione arricchita e pronta. Inserisci la tua email aziendale e ricevi il
                              report completo.
                            </p>
                            <form onSubmit={handleEmailSubmit} className="space-y-3">
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                  setEmailError('');
                                }}
                                placeholder="nome@tuaazienda.it"
                                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/40 text-sm focus:border-accent focus:ring-1 focus:ring-accent"
                                required
                              />
                              {emailError && (
                                <p className="text-accent text-sm">{emailError}</p>
                              )}
                              {!emailError && (
                                <p className="text-white/60 text-xs">
                                  Usiamo i tuoi dati solo per inviarti il report richiesto.
                                </p>
                              )}
                              <button
                                type="submit"
                                className="w-full py-3 bg-accent text-white font-display font-semibold rounded-lg hover:bg-accent-hover transition-colors"
                              >
                                Sblocca il risultato completo →
                              </button>
                            </form>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {state === 'result' && (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        onClick={() => setState('gate')}
                        className="mt-4 w-full py-3 border-2 border-accent text-accent font-display font-semibold rounded-xl hover:bg-accent hover:text-white transition-colors flex items-center justify-center gap-2"
                      >
                        <Lock size={18} />
                        Sblocca l'analisi completa
                      </motion.button>
                    )}
                  </div>

                  {state === 'unlocked' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl bg-green-500/20 border border-green-400/30 p-6 text-center"
                    >
                      <CheckCircle2 className="mx-auto text-green-400 mb-2" size={40} />
                      <p className="text-white font-display font-semibold mb-1">
                        Riceverai l'analisi dettagliata via email entro pochi minuti.
                      </p>
                      <p className="text-white/80 text-sm mb-4">
                        Hai visto cosa abbiamo fatto con un solo prodotto. Immagina cosa possiamo fare con il tuo intero catalogo.
                      </p>
                      <div className="text-left max-w-xl mx-auto mb-4 text-sm text-white/85 space-y-1">
                        <p>Agenda call (20 min):</p>
                        <p>1) Diagnosi punti critici sul tuo catalogo.</p>
                        <p>2) Stima tempi e impatto operativo.</p>
                        <p>3) Piano pilota su un campione reale.</p>
                      </div>
                      {/* TODO: embed Calendly */}
                      <a
                        href="#calendly"
                        className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 bg-accent text-white font-display font-semibold rounded-lg hover:bg-accent-hover transition-colors"
                      >
                        Prenota una Discovery Call di 20 minuti
                      </a>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
