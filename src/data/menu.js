// Данные меню KISSA. Цены в тенге (₸).
// Единственный источник правды: все цены, названия и контакты берутся отсюда.
// (TypeScript-версия с типами находится в menu.ts — компоненты импортируют оттуда.
//  Этот файл — для удобства редактирования владельцем без TypeScript.)

export const cafeInfo = {
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
  gis2Url: 'https://2gis.kz/kostanaj/firm/70000001117552175?m=63.62727%2C53.205353%2F16',
};

export const combo = {
  price: 2990,
  title: 'Боул с курицей + кофе',
  description: 'Боул с курицей + кофе на выбор (американо, латте или капучино). Каждый день с 8:00 до 12:00.',
  image: '/images/combo.jpg',
  coffees: ['Американо', 'Латте', 'Капучино'],
};

export const drinkCategories = [
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

export const bowlBuilder = {
  bases: [
    { id: 'chicken', name: 'Курица су-вид', price: 2690, image: '/images/bowl-chicken.jpg', macros: { kcal: 58, protein: 12, fat: 1, carbs: 0.2 } },
    { id: 'shrimp', name: 'Креветка отварная', price: 3290, image: '/images/bowl-shrimp.jpg', macros: { kcal: 50, protein: 12, fat: 0.2, carbs: 0 } },
  ],
  fillers: [
    { id: 'chickpea', name: 'Криспи нут', macros: { kcal: 48, protein: 3, fat: 0.9, carbs: 7 } },
    { id: 'cucumber', name: 'Огурцы', macros: { kcal: 4, protein: 0.2, fat: 0.08, carbs: 0 } },
    { id: 'cabbage', name: 'Красная капуста', macros: { kcal: 8, protein: 0.2, fat: 0.1, carbs: 1.5 } },
    { id: 'cherry', name: 'Помидоры черри', macros: { kcal: 10.5, protein: 0.72, fat: 0.11, carbs: 2.15 } },
    { id: 'broccoli', name: 'Брокколи', macros: { kcal: 5, protein: 0.3, fat: 0, carbs: 1 } },
    { id: 'cauliflower', name: 'Цветная капуста', macros: { kcal: 9, protein: 0.75, fat: 0.09, carbs: 1.62 } },
    { id: 'corn', name: 'Кукуруза', macros: { kcal: 17.4, protein: 0.66, fat: 0.12, carbs: 3.36 } },
    { id: 'enoki', name: 'Грибы эноки', macros: { kcal: 15, protein: 0.8, fat: 0.1, carbs: 2 } },
    { id: 'quail-eggs', name: 'Перепелиные яйца', macros: { kcal: 39, protein: 3.4, fat: 2.7, carbs: 0.45 } },
    { id: 'sweet-potato', name: 'Батат' },
    { id: 'edamame', name: 'Бобы эдамаме' },
    { id: 'pepper', name: 'Перец' },
  ],
  sauces: [
    { id: 'nut', name: 'Ореховый', allergen: 'содержит орехи', macros: { kcal: 83, protein: 1, fat: 8, carbs: 1 } },
    { id: 'chili', name: 'Сладкий чили', macros: { kcal: 39, protein: 0.1, fat: 0.1, carbs: 9.4 } },
    { id: 'teriyaki', name: 'Терияки', macros: { kcal: 36, protein: 0, fat: 0, carbs: 9 } },
    { id: 'wasabi', name: 'Мусс васаби', macros: { kcal: 51, protein: 0.7, fat: 5, carbs: 1 } },
    { id: 'honey-mustard', name: 'Медово-горчичный', macros: { kcal: 75, protein: 0.3, fat: 7, carbs: 3.5 } },
    { id: 'soy', name: 'Соевый', macros: { kcal: 10, protein: 1.2, fat: 0, carbs: 2 } },
  ],
  topping: 'Посыпка из смеси орехов и семян',
};

export const sandwiches = [
  { id: 'sandwich-spicy-tuna', name: 'Острый тунец', price: 1900, image: '/images/sandwich-tuna.jpg', tag: 'Острое', macros: { kcal: 275.1, protein: 18, fat: 7, carbs: 44 } },
  { id: 'sandwich-classic-tuna', name: 'Классический тунец', price: 1900, image: '/images/sandwich-tuna.jpg', tag: 'Хит', macros: { kcal: 277.7, protein: 18.5, fat: 7, carbs: 47 } },
  { id: 'sandwich-chicken', name: 'С курицей', price: 1900, image: '/images/sandwich-chicken.jpg', tag: 'Классика', macros: { kcal: 393.9, protein: 23.85, fat: 7.5, carbs: 44.1 } },
];
