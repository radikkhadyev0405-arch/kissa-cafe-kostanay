import { cafeInfo } from '../data/menu';

export interface CartItem {
  key: string;           // уникальный идентификатор позиции (id + опции)
  type: 'drink' | 'bowl' | 'combo' | 'sandwich';
  name: string;          // отображаемое название
  details: string;       // объём / температура / состав
  price: number;         // цена за единицу в ₸
  qty: number;
  comboRestricted?: boolean; // true, если позиция — комбо (проверять время)
}

export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.price * i.qty, 0);
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.qty, 0);
}

export function buildOrderMessage(items: CartItem[], comment: string): string {
  const lines: string[] = ['Здравствуйте! Хочу сделать заказ:', ''];

  items.forEach((item, idx) => {
    const num = idx + 1;
    const total = item.price * item.qty;
    lines.push(`${num}. ${item.name}, ${item.details} × ${item.qty} — ${total} ₸`);
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

export function buildBowlOrderMessage(
  bowl: { name: string; details: string; price: number }
): string {
  const lines = [
    'Здравствуйте! Хочу заказать боул:',
    '',
    `${bowl.name}, ${bowl.details} — ${bowl.price} ₸`,
    '',
    'Уточните, пожалуйста, наличие и время.',
  ];
  return lines.join('\n');
}

export function whatsappOrderLink(items: CartItem[], comment: string): string {
  const text = encodeURIComponent(buildOrderMessage(items, comment));
  return `https://wa.me/${cafeInfo.whatsapp}?text=${text}`;
}

export function whatsappSingleLink(message: string): string {
  return `https://wa.me/${cafeInfo.whatsapp}?text=${encodeURIComponent(message)}`;
}
