// Данные меню KISSA. Цены в тенге (₸).
// Единственный источник правды: все цены, названия и контакты берутся отсюда.
// name — объект {ru, kk, en}; отображаемый язык выбирается через i18n.

export interface LocalizedText {
  ru: string;
  kk: string;
  en: string;
}

export interface Macros {
  kcal: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface CafeInfo {
  name: string;
  city: string;
  address: LocalizedText;
  addressShort: string;
  hours: LocalizedText;
  phone: string;
  whatsapp: string;
  instagram: string;
  instagramHandle: string;
  gis2Url: string;
}

export interface DrinkItem {
  id: string;
  name: LocalizedText;
  price: number;
  kcal: number | string;
  image: string | null;
}

export interface DrinkCategory {
  id: string;
  label: LocalizedText;
  volume: LocalizedText;
  requiresChoice?: boolean;
  items: DrinkItem[];
}

export interface BowlBase {
  id: string;
  name: LocalizedText;
  price: number;
  image: string;
  macros?: Macros;
}

export interface BowlFiller {
  id: string;
  name: LocalizedText;
  macros?: Macros;
}

export interface BowlSauce {
  id: string;
  name: LocalizedText;
  allergen?: LocalizedText;
  macros?: Macros;
}

export interface BowlBuilderData {
  bases: BowlBase[];
  fillers: BowlFiller[];
  sauces: BowlSauce[];
  topping: LocalizedText;
}

export interface Sandwich {
  id: string;
  name: LocalizedText;
  price: number;
  image: string;
  tag: 'spicy' | 'hit' | 'classic';
  macros: Macros;
}

export const cafeInfo: CafeInfo = {
  name: 'KISSA',
  city: 'Костанай, Казахстан',
  address: { ru: 'Костанай, ул. Абая 123, блок 2', kk: 'Қостанай, Абай к-сі 123, 2 блок', en: 'Kostanay, Abai St 123, block 2' },
  addressShort: 'Костанай, Абая 123',
  hours: { ru: 'Ежедневно 08:00–22:00', kk: 'Күн сайын 08:00–22:00', en: 'Daily 08:00–22:00' },
  phone: '+7 700 462 25 00',
  whatsapp: '77004622500',
  instagram: 'https://instagram.com/kissa_cafe_kst',
  instagramHandle: '@kissa_cafe_kst',
  gis2Url: 'https://2gis.kz/kostanaj/firm/70000001117552175?m=63.62727%2C53.205353%2F16',
};

export const combo = {
  price: 2990,
  title: { ru: 'Боул с курицей + кофе', kk: 'Тауық еті қосылған боул + кофе', en: 'Chicken bowl + coffee' } as LocalizedText,
  description: {
    ru: 'Боул с курицей + кофе на выбор (американо, латте или капучино). Каждый день с 8:00 до 12:00.',
    kk: 'Тауық еті қосылған боул + кофе таңдауыңызша (американо, латте немесе капучино). Күн сайын 8:00-ден 12:00-ге дейін.',
    en: 'Chicken bowl + coffee of choice (americano, latte or cappuccino). Every day from 8:00 to 12:00.',
  } as LocalizedText,
  image: '/images/combo.jpg',
  // Coffee names for combo selection — Russian names used in WhatsApp message
  coffees: [
    { id: 'americano', name: { ru: 'Американо', kk: 'Американо', en: 'Americano' } as LocalizedText },
    { id: 'latte', name: { ru: 'Латте', kk: 'Латте', en: 'Latte' } as LocalizedText },
    { id: 'cappuccino', name: { ru: 'Капучино', kk: 'Капучино', en: 'Cappuccino' } as LocalizedText },
  ],
};

export const drinkCategories: DrinkCategory[] = [
  {
    id: 'matcha',
    label: { ru: 'Матча', kk: 'Матча', en: 'Matcha' },
    volume: { ru: '500 мл холодная / 350 мл горячая', kk: '500 мл салқын / 350 мл ыстық', en: '500 ml cold / 350 ml hot' },
    requiresChoice: true,
    items: [
      { id: 'matcha-latte', name: { ru: 'Матча латте', kk: 'Матча латте', en: 'Matcha latte' }, price: 1400, kcal: 156, image: '/images/matcha-latte.jpg' },
      { id: 'matcha-banana', name: { ru: 'Матча банан', kk: 'Банан қосылған матча', en: 'Matcha banana' }, price: 1750, kcal: 246, image: '/images/matcha-banana.jpg' },
      { id: 'matcha-anchan', name: { ru: 'Матча анчан', kk: 'Анчан қосылған матча', en: 'Matcha anchan' }, price: 1750, kcal: 290, image: '/images/matcha-anchan.jpg' },
      { id: 'matcha-strawberry', name: { ru: 'Матча клубника', kk: 'Құлпынай қосылған матча', en: 'Matcha strawberry' }, price: 1750, kcal: 230, image: '/images/matcha-strawberry.jpg' },
    ],
  },
  {
    id: 'coffee',
    label: { ru: 'Кофе', kk: 'Кофе', en: 'Coffee' },
    volume: { ru: '350 мл', kk: '350 мл', en: '350 ml' },
    items: [
      { id: 'americano', name: { ru: 'Американо', kk: 'Американо', en: 'Americano' }, price: 990, kcal: '2–5', image: '/images/latte.jpg' },
      { id: 'latte', name: { ru: 'Латте', kk: 'Латте', en: 'Latte' }, price: 1290, kcal: 145, image: '/images/latte.jpg' },
      { id: 'cappuccino', name: { ru: 'Капучино', kk: 'Капучино', en: 'Cappuccino' }, price: 1390, kcal: 145, image: '/images/cappuccino.jpg' },
      { id: 'raf', name: { ru: 'Раф', kk: 'Раф', en: 'Raf' }, price: 1500, kcal: 330, image: '/images/cappuccino.jpg' },
      { id: 'mocaccino', name: { ru: 'Мокачино', kk: 'Мокачино', en: 'Mocaccino' }, price: 1690, kcal: 331, image: '/images/cappuccino.jpg' },
      { id: 'hot-chocolate', name: { ru: 'Горячий шоколад', kk: 'Ыстық шоколад', en: 'Hot chocolate' }, price: 1500, kcal: 331, image: '/images/cappuccino.jpg' },
    ],
  },
  {
    id: 'cold',
    label: { ru: 'Холодные', kk: 'Салқын сусындар', en: 'Cold drinks' },
    volume: { ru: '500 мл', kk: '500 мл', en: '500 ml' },
    items: [
      { id: 'matcha-tonic', name: { ru: 'Матча тоник', kk: 'Матча тоник', en: 'Matcha tonic' }, price: 1750, kcal: 100, image: '/images/matcha-latte.jpg' },
      { id: 'espresso-tonic', name: { ru: 'Эспрессо-тоник', kk: 'Эспрессо-тоник', en: 'Espresso tonic' }, price: 1750, kcal: 60, image: '/images/latte.jpg' },
      { id: 'ice-americano', name: { ru: 'Айс американо', kk: 'Айс американо', en: 'Iced americano' }, price: 1100, kcal: 15, image: '/images/latte.jpg' },
      { id: 'ice-latte', name: { ru: 'Айс латте', kk: 'Айс латте', en: 'Iced latte' }, price: 1390, kcal: 174, image: '/images/latte.jpg' },
      { id: 'ice-cappuccino', name: { ru: 'Айс капучино', kk: 'Айс капучино', en: 'Iced cappuccino' }, price: 1490, kcal: 174, image: '/images/cappuccino.jpg' },
    ],
  },
  {
    id: 'smoothie',
    label: { ru: 'Смузи', kk: 'Смузи', en: 'Smoothies' },
    volume: { ru: '500 мл', kk: '500 мл', en: '500 ml' },
    items: [
      { id: 'smoothie-tropical', name: { ru: 'Тропический', kk: 'Тропикалық', en: 'Tropical' }, price: 1890, kcal: 398, image: '/images/smoothie-tropical.jpg' },
      { id: 'smoothie-raspberry', name: { ru: 'Малиновый', kk: 'Таңқурайлы', en: 'Raspberry' }, price: 1890, kcal: 497, image: '/images/smoothie-raspberry.jpg' },
      { id: 'smoothie-berry', name: { ru: 'Ягодный', kk: 'Жидекті', en: 'Berry' }, price: 1890, kcal: 225, image: '/images/smoothie-berry.jpg' },
    ],
  },
  {
    id: 'tea',
    label: { ru: 'Чай', kk: 'Шай', en: 'Tea' },
    volume: { ru: '350 мл', kk: '350 мл', en: '350 ml' },
    items: [
      { id: 'tea-raspberry-lemon', name: { ru: 'Малина-лимон', kk: 'Таңқурай-лимон', en: 'Raspberry-lemon' }, price: 990, kcal: 98, image: null },
      { id: 'tea-orange-ginger', name: { ru: 'Апельсин-имбирь', kk: 'Апельсин-зімбір', en: 'Orange-ginger' }, price: 990, kcal: 53, image: null },
      { id: 'tea-sea-buckthorn', name: { ru: 'Облепиха-маракуйя', kk: 'Шырғанақ-маракуйя', en: 'Sea buckthorn-passion fruit' }, price: 990, kcal: 53, image: null },
    ],
  },
];

export const bowlBuilder: BowlBuilderData = {
  bases: [
    { id: 'chicken', name: { ru: 'Курица су-вид', kk: 'Тауық еті су-вид', en: 'Sous-vide chicken' }, price: 2690, image: '/images/bowl-chicken.jpg', macros: { kcal: 58, protein: 12, fat: 1, carbs: 0.2 } },
    { id: 'shrimp', name: { ru: 'Креветка отварная', kk: 'Қайнатылған креветка', en: 'Boiled shrimp' }, price: 3290, image: '/images/bowl-shrimp.jpg', macros: { kcal: 50, protein: 12, fat: 0.2, carbs: 0 } },
  ],
  fillers: [
    { id: 'chickpea', name: { ru: 'Криспи нут', kk: 'Криспи ноқат', en: 'Crispy chickpea' }, macros: { kcal: 48, protein: 3, fat: 0.9, carbs: 7 } },
    { id: 'cucumber', name: { ru: 'Огурцы', kk: 'Қияр', en: 'Cucumber' }, macros: { kcal: 4, protein: 0.2, fat: 0.08, carbs: 0 } },
    { id: 'cabbage', name: { ru: 'Красная капуста', kk: 'Қызыл қырыққабат', en: 'Red cabbage' }, macros: { kcal: 8, protein: 0.2, fat: 0.1, carbs: 1.5 } },
    { id: 'cherry', name: { ru: 'Помидоры черри', kk: 'Черри қызанағы', en: 'Cherry tomatoes' }, macros: { kcal: 10.5, protein: 0.72, fat: 0.11, carbs: 2.15 } },
    { id: 'broccoli', name: { ru: 'Брокколи', kk: 'Брокколи', en: 'Broccoli' }, macros: { kcal: 5, protein: 0.3, fat: 0, carbs: 1 } },
    { id: 'cauliflower', name: { ru: 'Цветная капуста', kk: 'Гүлді қырыққабат', en: 'Cauliflower' }, macros: { kcal: 9, protein: 0.75, fat: 0.09, carbs: 1.62 } },
    { id: 'corn', name: { ru: 'Кукуруза', kk: 'Жүгері', en: 'Corn' }, macros: { kcal: 17.4, protein: 0.66, fat: 0.12, carbs: 3.36 } },
    { id: 'enoki', name: { ru: 'Грибы эноки', kk: 'Эноки саңырауқұлағы', en: 'Enoki mushrooms' }, macros: { kcal: 15, protein: 0.8, fat: 0.1, carbs: 2 } },
    { id: 'quail-eggs', name: { ru: 'Перепелиные яйца', kk: 'Бөдене жұмыртқасы', en: 'Quail eggs' }, macros: { kcal: 39, protein: 3.4, fat: 2.7, carbs: 0.45 } },
    { id: 'sweet-potato', name: { ru: 'Батат', kk: 'Тәтті картоп', en: 'Sweet potato' } },
    { id: 'edamame', name: { ru: 'Бобы эдамаме', kk: 'Эдамаме бұршағы', en: 'Edamame beans' } },
    { id: 'pepper', name: { ru: 'Перец', kk: 'Бұрыш', en: 'Bell pepper' } },
  ],
  sauces: [
    { id: 'nut', name: { ru: 'Ореховый', kk: 'Жаңғақты', en: 'Nut' }, allergen: { ru: 'содержит орехи', kk: 'жаңғақ бар', en: 'contains nuts' }, macros: { kcal: 83, protein: 1, fat: 8, carbs: 1 } },
    { id: 'chili', name: { ru: 'Сладкий чили', kk: 'Тәтті чили', en: 'Sweet chili' }, macros: { kcal: 39, protein: 0.1, fat: 0.1, carbs: 9.4 } },
    { id: 'teriyaki', name: { ru: 'Терияки', kk: 'Терияки', en: 'Teriyaki' }, macros: { kcal: 36, protein: 0, fat: 0, carbs: 9 } },
    { id: 'wasabi', name: { ru: 'Мусс васаби', kk: 'Васаби муссы', en: 'Wasabi mousse' }, macros: { kcal: 51, protein: 0.7, fat: 5, carbs: 1 } },
    { id: 'honey-mustard', name: { ru: 'Медово-горчичный', kk: 'Бал-қыша', en: 'Honey mustard' }, macros: { kcal: 75, protein: 0.3, fat: 7, carbs: 3.5 } },
    { id: 'soy', name: { ru: 'Соевый', kk: 'Соустық', en: 'Soy' }, macros: { kcal: 10, protein: 1.2, fat: 0, carbs: 2 } },
  ],
  topping: { ru: 'Посыпка из смеси орехов и семян', kk: 'Жаңғақ пен тұқым қоспасынан себу', en: 'Nut & seed sprinkle' },
};

export const sandwiches: Sandwich[] = [
  { id: 'sandwich-spicy-tuna', name: { ru: 'Острый тунец', kk: 'Ыстық тунец', en: 'Spicy tuna' }, price: 1900, image: '/images/sandwich-tuna.jpg', tag: 'spicy', macros: { kcal: 275.1, protein: 18, fat: 7, carbs: 44 } },
  { id: 'sandwich-classic-tuna', name: { ru: 'Классический тунец', kk: 'Классикалық тунец', en: 'Classic tuna' }, price: 1900, image: '/images/sandwich-tuna.jpg', tag: 'hit', macros: { kcal: 277.7, protein: 18.5, fat: 7, carbs: 47 } },
  { id: 'sandwich-chicken', name: { ru: 'С курицей', kk: 'Тауық етімен', en: 'With chicken' }, price: 1900, image: '/images/sandwich-chicken.jpg', tag: 'classic', macros: { kcal: 393.9, protein: 23.85, fat: 7.5, carbs: 44.1 } },
];
