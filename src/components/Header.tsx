import { useEffect, useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { cafeInfo } from '../data/menu';

const navLinks = [
  { href: '#menu', label: 'Меню' },
  { href: '#bowl', label: 'Собери боул' },
  { href: '#combo', label: 'Комбо' },
  { href: '#contacts', label: 'Контакты' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const whatsappLink = `https://wa.me/${cafeInfo.whatsapp}?text=${encodeURIComponent('Здравствуйте! Хочу сделать заказ в KISSA')}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-kissa' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-1.5" aria-label="KISSA — на главную">
          <span className="font-display text-2xl font-black uppercase tracking-tight text-kissa-pink">
            KISSA
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
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

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-full bg-kissa-pink px-5 py-2.5 font-bold text-white shadow-kissa transition-transform hover:scale-105 active:scale-95 md:flex"
        >
          <MessageCircle size={18} />
          WhatsApp
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-full bg-kissa-pink p-2.5 text-white md:hidden"
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-kissa-pink-light bg-white/95 backdrop-blur-md md:hidden">
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
            <li>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-kissa bg-kissa-pink px-4 py-3 font-bold text-white"
              >
                <MessageCircle size={18} />
                Написать в WhatsApp
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
