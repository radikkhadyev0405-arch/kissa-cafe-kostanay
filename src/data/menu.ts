// Данные меню KISSA. Цены в тенге (₸).
// Единственный источник правды: все цены, названия и контакты берутся отсюда.

export interface CafeInfo {
  name: string;
  city: string;
  address: string;
  addressShort: string;
  hours: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  instagramHandle: string;
  about: string;
}

export interface DrinkItem {
  id: string;
  name: string;
  price: number;
  kcal: number | string;
  image: string | null;
}

export interface DrinkCategory {
  id: string;
  label: string;
  volume: string;
  requiresChoice?: boolean;
  items: DrinkItem[];
}

export interface BowlBase {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface BowlFiller {
  id: string;
  name: string;
}

export interface BowlSauce {
  id: string;
  name: string;
  allergen?: string;
}

export interface BowlBuilderData {
  bases: BowlBase[];
  fillers: BowlFiller[];
  sauces: BowlSauce[];
  topping: string;
}

export interface Sandwich {
  id: string;
  name: string;
  price: number;
  image: string;
  tag: string;
}

export const cafeInfo: CafeInfo = {
  name: 'KISSA',
  city: 'Костанай, Казахстан',
  address: 'Костанай, ул. Абая 123, блок 2',
  addressShort: 'Костанай, Абая 123',
  hours: 'Ежедневно 08:00–22:00',
  phone: '+7 700 462 25 00',
  whatsapp: '77004622500',
  instagram: 'https://instagram.com/kissa_cafe_kst',
  instagramHandle: '@kissa_cafe_kst',
  about: 'KISSA — от японского 喫茶 («чайная»)',
};

export const combo = {
  price: 2990,
  title: 'Боул с курицей + кофе',
  description: 'Боул с курицей + кофе на выбор (американо, латте или капучино). Каждый день с 8:00 до 12:00.',
  image: '/images/combo.jpg',
  coffees: ['Американо', 'Латте', 'Капучино'] as string[],
};

export const drinkCategories: DrinkCategory[] = [
  {
    id: 'matcha',
    label: 'Матча',
    volume: '500 мл холодная / 350 мл горячая',
    requiresChoice: true,
    items: [
      { id: 'matcha-latte', name: 'Матча латте', price: 1400, kcal: 156, image: '/images/matcha-latte.jpg' },
      { id: 'matcha-banana', name: 'Матча банан', price: 1750, kcal: 246, image: '/images/matcha-banana.jpg' },
      { id: 'matcha-anchan', name: 'Матча анчан', price: 1750, kcal: 290, image: '/images/matcha-anchan.jpg' },
      { id: 'matcha-strawberry', name: 'Матча клубника', price: 1750, kcal: 230, image: '/images/matcha-strawberry.jpg' },
    ],
  },
  {
    id: 'coffee',
    label: 'Кофе',
    volume: '350 мл',
    items: [
      { id: 'americano', name: 'Американо', price: 990, kcal: '2–5', image: '/images/latte.jpg' },
      { id: 'latte', name: 'Латте', price: 1290, kcal: 145, image: '/images/latte.jpg' },
      { id: 'cappuccino', name: 'Капучино', price: 1390, kcal: 145, image: '/images/cappuccino.jpg' },
      { id: 'raf', name: 'Раф', price: 1500, kcal: 330, image: '/images/cappuccino.jpg' },
      { id: 'mocaccino', name: 'Мокачино', price: 1690, kcal: 331, image: '/images/cappuccino.jpg' },
      { id: 'hot-chocolate', name: 'Горячий шоколад', price: 1500, kcal: 331, image: '/images/cappuccino.jpg' },
    ],
  },
  {
    id: 'cold',
    label: 'Холодные',
    volume: '500 мл',
    items: [
      { id: 'matcha-tonic', name: 'Матча тоник', price: 1750, kcal: 100, image: '/images/matcha-latte.jpg' },
      { id: 'espresso-tonic', name: 'Эспрессо-тоник', price: 1750, kcal: 60, image: '/images/latte.jpg' },
      { id: 'ice-americano', name: 'Айс американо', price: 1100, kcal: 15, image: '/images/latte.jpg' },
      { id: 'ice-latte', name: 'Айс латте', price: 1390, kcal: 174, image: '/images/latte.jpg' },
      { id: 'ice-cappuccino', name: 'Айс капучино', price: 1490, kcal: 174, image: '/images/cappuccino.jpg' },
    ],
  },
  {
    id: 'smoothie',
    label: 'Смузи',
    volume: '500 мл',
    items: [
      { id: 'smoothie-tropical', name: 'Тропический', price: 1890, kcal: 398, image: '/images/smoothie-tropical.jpg' },
      { id: 'smoothie-raspberry', name: 'Малиновый', price: 1890, kcal: 497, image: '/images/smoothie-raspberry.jpg' },
      { id: 'smoothie-berry', name: 'Ягодный', price: 1890, kcal: 225, image: '/images/smoothie-berry.jpg' },
    ],
  },
  {
    id: 'tea',
    label: 'Чай',
    volume: '350 мл',
    items: [
      { id: 'tea-raspberry-lemon', name: 'Малина-лимон', price: 990, kcal: 98, image: null },
      { id: 'tea-orange-ginger', name: 'Апельсин-имбирь', price: 990, kcal: 53, image: null },
      { id: 'tea-sea-buckthorn', name: 'Облепиха-маракуйя', price: 990, kcal: 53, image: null },
    ],
  },
];

export const bowlBuilder: BowlBuilderData = {
  bases: [
    { id: 'chicken', name: 'Курица су-вид', price: 2690, image: '/images/bowl-chicken.jpg' },
    { id: 'shrimp', name: 'Креветка отварная', price: 3290, image: '/images/bowl-shrimp.jpg' },
  ],
  fillers: [
    { id: 'chickpea', name: 'Криспи нут' },
    { id: 'cucumber', name: 'Огурцы' },
    { id: 'cabbage', name: 'Красная капуста' },
    { id: 'cherry', name: 'Помидоры черри' },
    { id: 'corn', name: 'Кукуруза' },
    { id: 'enoki', name: 'Грибы эноки' },
    { id: 'quail-eggs', name: 'Перепелиные яйца' },
    { id: 'sweet-potato', name: 'Батат' },
    { id: 'edamame', name: 'Бобы эдамаме' },
    { id: 'pepper', name: 'Перец' },
    { id: 'broccoli', name: 'Брокколи' },
    { id: 'cauliflower', name: 'Цветная капуста' },
  ],
  sauces: [
    { id: 'nut', name: 'Ореховый', allergen: 'содержит орехи' },
    { id: 'chili', name: 'Сладкий чили' },
    { id: 'teriyaki', name: 'Терияки' },
    { id: 'wasabi', name: 'Мусс васаби' },
    { id: 'honey-mustard', name: 'Медово-горчичный' },
    { id: 'soy', name: 'Соевый' },
  ],
  topping: 'Посыпка из смеси орехов и семян',
};

export const sandwiches: Sandwich[] = [
  { id: 'sandwich-spicy-tuna', name: 'Острый тунец', price: 1900, image: '/images/sandwich-tuna.jpg', tag: 'Острое' },
  { id: 'sandwich-classic-tuna', name: 'Классический тунец', price: 1900, image: '/images/sandwich-tuna.jpg', tag: 'Хит' },
  { id: 'sandwich-chicken', name: 'С курицей', price: 1900, image: '/images/sandwich-chicken.jpg', tag: 'Классика' },
];
