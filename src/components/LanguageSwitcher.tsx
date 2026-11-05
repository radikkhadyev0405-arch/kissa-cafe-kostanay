import { useI18n } from '../context/I18nContext';
import type { Locale } from '../i18n/translations';

const LOCALES: { id: Locale; label: string }[] = [
  { id: 'ru', label: 'RU' },
  { id: 'kk', label: 'KZ' },
  { id: 'en', label: 'EN' },
];

interface LanguageSwitcherProps {
  className?: string;
  compact?: boolean;
}

export function LanguageSwitcher({ className = '', compact = false }: LanguageSwitcherProps) {
  const { locale, setLocale } = useI18n();

  return (
    <div
      className={`flex items-center gap-0.5 rounded-full bg-white/90 p-1 shadow-sm ${className}`}
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((l) => (
        <button
          key={l.id}
          onClick={() => setLocale(l.id)}
          className={`rounded-full px-2.5 py-1 text-xs font-bold transition-all ${
            locale === l.id
              ? 'bg-kissa-pink text-white'
              : 'text-kissa-green hover:bg-kissa-pink-light'
          }`}
          aria-pressed={locale === l.id}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
