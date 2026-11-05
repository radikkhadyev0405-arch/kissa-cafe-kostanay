import { Instagram } from 'lucide-react';
import { cafeInfo } from '../data/menu';
import { useI18n } from '../context/I18nContext';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-kissa-green px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
        <span className="font-display text-3xl font-black uppercase text-white">KISSA</span>
        <p className="text-sm text-white/80">{t.footer.about}</p>
        <p className="text-sm text-white/80">{t.footer.tagline}</p>
        <a
          href={cafeInfo.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 font-bold text-white transition-colors hover:bg-white/20"
        >
          <Instagram size={18} />
          {cafeInfo.instagramHandle}
        </a>
        <p className="mt-2 text-xs text-white/60">© {new Date().getFullYear()} KISSA</p>
      </div>
    </footer>
  );
}
