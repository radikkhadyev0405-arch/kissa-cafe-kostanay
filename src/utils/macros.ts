import type { Macros } from '../data/menu';
import type { Translation, Locale } from '../i18n/translations';

function fmt(n: number): string {
  return n.toFixed(1).replace('.', ',');
}

export function formatMacros(m: Macros, locale: Locale): string {
  const u = translations_macros(locale);
  return `${fmt(m.kcal)} ${u.kcal} · ${u.protein} ${fmt(m.protein)}${u.grams} · ${u.fat} ${fmt(m.fat)}${u.grams} · ${u.carbs} ${fmt(m.carbs)}${u.grams}`;
}

export function formatMacrosGrams(m: Macros, locale: Locale): string {
  const u = translations_macros(locale);
  const g = u.grams ? ` ${u.grams}` : '';
  return `${fmt(m.kcal)} ${u.kcal} · ${u.protein} ${fmt(m.protein)}${g} · ${u.fat} ${fmt(m.fat)}${g} · ${u.carbs} ${fmt(m.carbs)}${g}`;
}

export function sumMacros(items: (Macros | undefined)[]): Macros | null {
  const valid = items.filter((m): m is Macros => m != null);
  if (valid.length === 0) return null;
  return valid.reduce(
    (acc, m) => ({
      kcal: acc.kcal + m.kcal,
      protein: acc.protein + m.protein,
      fat: acc.fat + m.fat,
      carbs: acc.carbs + m.carbs,
    }),
    { kcal: 0, protein: 0, fat: 0, carbs: 0 }
  );
}

function translations_macros(locale: Locale) {
  // Avoid circular import: inline the macro labels
  const labels = {
    ru: { kcal: 'ккал', protein: 'Б', fat: 'Ж', carbs: 'У', grams: '' },
    kk: { kcal: 'ккал', protein: 'Б', fat: 'Ж', carbs: 'Ұ', grams: '' },
    en: { kcal: 'kcal', protein: 'P', fat: 'F', carbs: 'C', grams: 'g' },
  };
  return labels[locale];
}
