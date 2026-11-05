import { useEffect, useState } from 'react';
import { MessageCircle, Instagram, ArrowDown, Clock } from 'lucide-react';
import { SmartImage } from './SmartImage';
import { Starfish, Daisy } from './Decor';
import { cafeInfo } from '../data/menu';
import { useI18n } from '../context/I18nContext';
import { isCafeOpen } from '../utils/comboTime';

export function Hero() {
  const { t, locale } = useI18n();
  const whatsappLink = `https://wa.me/${cafeInfo.whatsapp}`;
  const [open, setOpen] = useState(isCafeOpen());

  useEffect(() => {
    setOpen(isCafeOpen());
    const id = window.setInterval(() => setOpen(isCafeOpen()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="top" className="relative overflow-hidden bg-kissa-pink px-4 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-24">
      <Daisy className="absolute left-[-30px] top-24 w-20 opacity-90 animate-floaty sm:w-28" />
      <Starfish className="absolute right-[-20px] top-40 w-24 opacity-90 animate-floaty sm:w-32" color="#fff" />
      <Daisy className="absolute right-8 bottom-8 w-16 opacity-80 animate-wiggle sm:w-24" />
      <Starfish className="absolute left-[-10px] bottom-32 w-16 opacity-80 animate-wiggle sm:w-20" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        <div className="text-center md:text-left">
          <span className="inline-block rounded-full bg-kissa-lime px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-kissa-green animate-pop">
            {t.hero.location}
          </span>

          {/* Hours badge + open/closed indicator */}
          <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-white/15 px-4 py-2 backdrop-blur-sm">
            <Clock size={16} className="text-white" />
            <span className="text-sm font-bold text-white">{t.hero.hoursBadge}</span>
            <span className="flex items-center gap-1.5 border-l border-white/30 pl-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${open ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}
                aria-hidden="true"
              />
              <span className="text-xs font-bold text-white">
                {open ? t.hero.openNow : t.hero.closedNow}
              </span>
            </span>
          </div>

          <h1 className="mt-5 font-display text-4xl font-black uppercase leading-[1.05] text-white text-balance sm:text-5xl lg:text-6xl">
            {t.hero.title}
          </h1>
          <p className="mx-auto mt-5 max-w-md text-lg font-semibold text-white sm:text-xl md:mx-0">
            {t.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
            <a
              href="#menu"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-kissa-pink shadow-kissa-lg transition-transform hover:scale-105 active:scale-95"
            >
              {t.hero.viewMenu}
              <ArrowDown size={18} />
            </a>
            <a
              href={cafeInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-kissa-green px-7 py-3.5 font-bold text-white transition-transform hover:scale-105 active:scale-95"
            >
              <Instagram size={18} />
              {t.hero.instagram}
            </a>
          </div>
          <div className="mt-8 flex items-center justify-center gap-4 text-white/90 md:justify-start">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline"
            >
              <MessageCircle size={16} /> {t.hero.writeWhatsApp}
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm md:max-w-none">
          <div className="absolute -inset-3 rounded-kissa-lg bg-kissa-lime opacity-60 blur-xl" />
          <div className="relative overflow-hidden rounded-kissa-lg shadow-kissa-lg">
            <SmartImage
              src="/images/hero.jpg"
              alt={locale === 'ru' ? 'Напитки и боулы кофейни KISSA' : locale === 'kk' ? 'KISSA кофейнясының сусындары мен боулдары' : 'KISSA coffee shop drinks and bowls'}
              label="KISSA"
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 rotate-[-8deg] rounded-kissa bg-white px-5 py-3 shadow-kissa-lg">
            <p className="font-display text-2xl font-black text-kissa-pink">2990 ₸</p>
            <p className="text-xs font-bold uppercase text-kissa-green">{t.hero.comboUntil}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
