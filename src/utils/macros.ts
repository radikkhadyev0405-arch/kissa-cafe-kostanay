import type { Macros } from '../data/menu';

function fmt(n: number): string {
  return n.toFixed(1).replace('.', ',');
}

export function formatMacros(m: Macros): string {
  return `${fmt(m.kcal)} ккал · Б ${fmt(m.protein)} · Ж ${fmt(m.fat)} · У ${fmt(m.carbs)}`;
}

export function formatMacrosGrams(m: Macros): string {
  return `${fmt(m.kcal)} ккал · Б ${fmt(m.protein)} г · Ж ${fmt(m.fat)} г · У ${fmt(m.carbs)} г`;
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
