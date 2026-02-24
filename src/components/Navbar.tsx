import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

type NavbarProps = {
  onScrollTo: (id: string) => void;
  scrolled: boolean;
};

const navLinks = [
  { label: 'Come funziona', id: 'come-funziona' },
  { label: 'Il Simulatore', id: 'simulatore' },
  { label: 'Risultati', id: 'metriche' },
];

export default function Navbar({ onScrollTo, scrolled }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAFAF8]/85 backdrop-blur-md border-b border-gray-200/60 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button
          onClick={() => onScrollTo('hero')}
          className="font-display font-bold text-lg tracking-[0.2em] text-ink hover:text-navy transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
          aria-label="Torna in cima"
        >
          AUIKI
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onScrollTo(link.id)}
              className="text-sm text-ink/80 hover:text-navy font-medium transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => onScrollTo('simulatore')}
            className="px-4 py-2.5 bg-accent text-white font-display font-semibold text-sm rounded-lg hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Prova con i tuoi prodotti
          </button>
        </div>

        <button
          className="md:hidden p-2 text-ink rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          onClick={() => setMobileOpen(true)}
          aria-label="Apri menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#FAFAF8] z-50 md:hidden"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <span className="font-display font-bold tracking-[0.2em] text-ink">AUIKI</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
                aria-label="Chiudi menu"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onScrollTo(link.id);
                    setMobileOpen(false);
                  }}
                  className="text-left py-3 text-ink font-medium border-b border-gray-100"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  onScrollTo('simulatore');
                  setMobileOpen(false);
                }}
                className="mt-4 py-3 px-4 bg-accent text-white font-display font-semibold rounded-lg"
              >
                Prova con i tuoi prodotti
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
