import { cafeInfo, type LocalizedText } from '../data/menu';
import type { Locale } from '../i18n/translations';

export interface CartItem {
  key: string;
  type: 'drink' | 'bowl' | 'combo' | 'sandwich';
  name: LocalizedText;       // displayed name (translated per locale)
  details: LocalizedText;    // displayed details (translated per locale)
  ruName: string;            // Russian name for WhatsApp message
  ruDetails: string;         // Russian details for WhatsApp message
  price: number;
  qty: number;
  comboRestricted?: boolean;
}

export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.price * i.qty, 0);
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.qty, 0);
}

// WhatsApp order message is ALWAYS in Russian (read by staff)
export function buildOrderMessage(items: CartItem[], comment: string): string {
  const lines: string[] = ['Здравствуйте! Хочу сделать заказ:', ''];

  items.forEach((item, idx) => {
    const num = idx + 1;
    const total = item.price * item.qty;
    lines.push(`${num}. ${item.ruName}, ${item.ruDetails} × ${item.qty} — ${total} ₸`);
  });

  lines.push('');
  lines.push(`Итого: ${cartTotal(items)} ₸`);
  if (comment.trim()) {
    lines.push(`Комментарий: ${comment.trim()}`);
  }
  lines.push('');
  lines.push('Уточните, пожалуйста, наличие и время.');

  return lines.join('\n');
}

export function whatsappOrderLink(items: CartItem[], comment: string): string {
  const text = encodeURIComponent(buildOrderMessage(items, comment));
  return `https://wa.me/${cafeInfo.whatsapp}?text=${text}`;
}

export function whatsappSingleLink(message: string): string {
  return `https://wa.me/${cafeInfo.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function loc(text: LocalizedText, locale: Locale): string {
  return text[locale];
}
