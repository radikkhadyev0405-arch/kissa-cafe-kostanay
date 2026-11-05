import { useEffect, useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { cafeInfo } from '../data/menu';
import { useI18n } from '../context/I18nContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const whatsappLink = `https://wa.me/${cafeInfo.whatsapp}?text=${encodeURIComponent('Здравствуйте! Хочу сделать заказ в KISSA')}`;

  const navLinks = [
    { href: '#menu', label: t.nav.menu },
    { href: '#bowl', label: t.nav.bowlBuilder },
    { href: '#combo', label: t.nav.combo },
    { href: '#contacts', label: t.nav.contacts },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-kissa' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-1.5" aria-label="KISSA — на главную">
          <span className="font-display text-2xl font-black uppercase tracking-tight text-kissa-pink">
            KISSA
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 font-semibold text-kissa-green transition-colors hover:bg-kissa-pink-light hover:text-kissa-pink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-kissa-pink px-4 py-2.5 font-bold text-white shadow-kissa transition-transform hover:scale-105 active:scale-95 md:flex"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>

          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="rounded-full bg-kissa-pink p-2.5 text-white lg:hidden"
            aria-label={open ? t.closeMenu : t.openMenu}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-kissa-pink-light bg-white/95 backdrop-blur-md lg:hidden">
          <ul className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-kissa px-4 py-3 font-semibold text-kissa-green transition-colors hover:bg-kissa-pink-light"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-2 flex items-center justify-between gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex flex-1 items-center justify-center gap-2 rounded-kissa bg-kissa-pink px-4 py-3 font-bold text-white"
              >
                <MessageCircle size={18} />
                {t.writeWhatsApp}
              </a>
              <LanguageSwitcher />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
