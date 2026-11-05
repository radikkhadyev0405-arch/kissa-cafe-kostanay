import { useEffect, useState } from 'react';
import { Clock, AlertTriangle, Sparkles } from 'lucide-react';
import { SmartImage } from './SmartImage';
import { Daisy } from './Decor';
import { ComboModal } from './ComboModal';
import { combo as comboData } from '../data/menu';
import { isComboAvailable } from '../utils/comboTime';

export function ComboBanner() {
  const [modalOpen, setModalOpen] = useState(false);
  const [available, setAvailable] = useState(isComboAvailable());

  useEffect(() => {
    setAvailable(isComboAvailable());
    const id = window.setInterval(() => setAvailable(isComboAvailable()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="combo" className="relative overflow-hidden bg-kissa-lime px-4 py-14 sm:px-6 sm:py-20">
      <Daisy className="absolute right-6 top-6 w-16 opacity-70 animate-wiggle sm:w-24" />
      <Daisy className="absolute left-4 bottom-8 w-12 opacity-60 animate-floaty sm:w-20" />

      <div className="relative mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-[1fr_1.2fr]">
        <div className="relative mx-auto w-full max-w-xs">
          <div className="absolute -inset-2 rounded-kissa-lg bg-kissa-pink opacity-30 blur-lg" />
          <div className="relative overflow-hidden rounded-kissa-lg shadow-kissa">
            <SmartImage
              src={comboData.image}
              alt={comboData.title}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>

        <div className="text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-kissa-pink px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
            <Clock size={14} /> Каждый день 8:00–12:00
          </span>
          <h2 className="mt-4 font-display text-3xl font-black uppercase text-kissa-green sm:text-4xl">
            Комбо {comboData.price} ₸
          </h2>
          <p className="mt-3 text-lg font-semibold text-kissa-green sm:text-xl">
            {comboData.title}
          </p>
          <p className="mt-2 text-base text-kissa-green/80">
            {comboData.description}
          </p>

          <div className="mt-6 flex flex-col items-center gap-2 md:items-start">
            {available ? (
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-kissa-pink px-7 py-3.5 font-bold text-white shadow-kissa-lg transition-transform hover:scale-105 active:scale-95"
              >
                <Sparkles size={18} />
                Выбрать комбо
              </button>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-full bg-gray-300 px-7 py-3.5 font-bold text-gray-600">
                <AlertTriangle size={18} />
                Комбо доступно с 8:00 до 12:00
              </div>
            )}
            <p className="text-xs font-semibold text-kissa-olive">
              Комбо доступно с 8:00 до 12:00
            </p>
          </div>
        </div>
      </div>

      <ComboModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
