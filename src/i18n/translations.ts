export type Locale = 'ru' | 'kk' | 'en';

export interface Translation {
  // Header / nav
  nav: {
    menu: string;
    bowlBuilder: string;
    combo: string;
    contacts: string;
  };
  whatsappBtn: string;
  writeWhatsApp: string;
  openMenu: string;
  closeMenu: string;

  // Hero
  hero: {
    location: string;
    title: string;
    subtitle: string;
    viewMenu: string;
    instagram: string;
    writeWhatsApp: string;
    hoursBadge: string;
    openNow: string;
    closedNow: string;
    comboUntil: string;
  };

  // Combo
  combo: {
    everyday: string;
    chooseCombo: string;
    availableTimes: string;
    title: string;
    description: string;
    chooseCoffee: string;
    onlyTime: string;
    addToCart: string;
  };

  // Drinks menu
  drinks: {
    sectionLabel: string;
    heading: string;
    kcal: string;
    addToCart: string;
  };

  // Matcha modal
  matcha: {
    chooseVariant: string;
    samePrice: string;
    cold: string;
    hot: string;
    coldVolume: string;
    hotVolume: string;
    addToCart: string;
  };

  // Bowl builder
  bowl: {
    sectionLabel: string;
    heading: string;
    description: string;
    step1: string;
    step2: string;
    step3: string;
    finalTouch: string;
    withTopping: string;
    withoutTopping: string;
    toppingAllergy: string;
    allergyNote: string;
    allergyWhatsApp: string;
    yourBowl: string;
    chooseBase: string;
    base: string;
    fillers: string;
    noFillers: string;
    sauce: string;
    topping: string;
    withToppingShort: string;
    withoutToppingShort: string;
    approx: string;
    withoutToppingNote: string;
    total: string;
    addToCart: string;
  };

  // Sandwiches
  sandwiches: {
    sectionLabel: string;
    heading: string;
    addToCart: string;
  };

  // Contacts
  contacts: {
    sectionLabel: string;
    heading: string;
    hours: string;
    address: string;
    phone: string;
    howToFind: string;
    openIn2gis: string;
    kz: string;
  };

  // Footer
  footer: {
    about: string;
    tagline: string;
  };

  // Cart
  cart: {
    title: string;
    close: string;
    empty: string;
    backToMenu: string;
    remove: string;
    decrease: string;
    increase: string;
    clear: string;
    comment: string;
    commentPlaceholder: string;
    total: string;
    checkout: string;
    checkoutNote: string;
    comboWarning: string;
    comboBlocked: string;
    comboItemWarning: string;
    addedToCart: string;
    itemCount: (n: number) => string;
  };

  // Macros units
  macros: {
    kcal: string;
    protein: string;
    fat: string;
    carbs: string;
    grams: string;
  };

  // Sandwich tags
  tags: {
    spicy: string;
    hit: string;
    classic: string;
  };

  // Drink volumes
  volumes: {
    coffee: string;
    cold: string;
    matchaChoice: string;
    cold500: string;
    hot350: string;
  };

  // Combo cart details
  comboCartName: (coffee: string) => string;
  comboCartDetails: (coffee: string) => string;

  // Page meta
  meta: {
    title: string;
    description: string;
  };
}

export const translations: Record<Locale, Translation> = {
  ru: {
    nav: { menu: 'Меню', bowlBuilder: 'Собери боул', combo: 'Комбо', contacts: 'Контакты' },
    whatsappBtn: 'WhatsApp',
    writeWhatsApp: 'Написать в WhatsApp',
    openMenu: 'Открыть меню',
    closeMenu: 'Закрыть меню',

    hero: {
      location: 'Костанай · Казахстан',
      title: 'Your perfect drink is waiting at KISSA',
      subtitle: 'От любимой матчи до классического кофе. Смузи, боулы и сэндвичи.',
      viewMenu: 'Смотреть меню',
      instagram: 'Instagram',
      writeWhatsApp: 'Написать в WhatsApp',
      hoursBadge: 'Работаем ежедневно 08:00–22:00',
      openNow: 'Открыто сейчас',
      closedNow: 'Сейчас закрыто',
      comboUntil: 'Комбо до 12:00',
    },

    combo: {
      everyday: 'Каждый день 8:00–12:00',
      chooseCombo: 'Выбрать комбо',
      availableTimes: 'Комбо доступно с 8:00 до 12:00',
      title: 'Боул с курицей + кофе',
      description: 'Боул с курицей + кофе на выбор (американо, латте или капучино). Каждый день с 8:00 до 12:00.',
      chooseCoffee: 'Боул с курицей + кофе на выбор:',
      onlyTime: 'Комбо доступно с 8:00 до 12:00',
      addToCart: 'Добавить в корзину',
    },

    drinks: {
      sectionLabel: 'Меню напитков',
      heading: 'Выбери свой напиток',
      kcal: 'ккал',
      addToCart: 'В корзину',
    },

    matcha: {
      chooseVariant: 'Выбери вариант напитка',
      samePrice: 'Цена одинаковая.',
      cold: 'Холодная',
      hot: 'Горячая',
      coldVolume: '500 мл',
      hotVolume: '350 мл',
      addToCart: 'Добавить в корзину',
    },

    bowl: {
      sectionLabel: 'Конструктор боула',
      heading: 'Собери свой боул',
      description: 'Выбери основу, добавь любимые наполнители и соус. Цена = цена основы, наполнители и соусы входят.',
      step1: 'Выбери основу',
      step2: 'Добавь всё, что любишь',
      step3: 'Выбери соус',
      finalTouch: 'Финальный штрих: посыпка из смеси орехов и семян',
      withTopping: '🥜 С посыпкой',
      withoutTopping: 'Без посыпки',
      toppingAllergy: 'Посыпка содержит орехи. При аллергии выберите «Без посыпки» (цена не меняется).',
      allergyNote: 'При аллергиях и особых пожеланиях уточняйте состав в',
      allergyWhatsApp: 'WhatsApp',
      yourBowl: 'Твой боул',
      chooseBase: 'Выбери основу, чтобы начать собирать боул.',
      base: 'Основа:',
      fillers: 'Наполнители:',
      noFillers: 'не выбраны',
      sauce: 'Соус:',
      topping: 'Посыпка:',
      withToppingShort: 'с посыпкой',
      withoutToppingShort: 'без посыпки',
      approx: 'Примерно:',
      withoutToppingNote: 'без учёта посыпки',
      total: 'Итого',
      addToCart: 'Добавить в корзину',
    },

    sandwiches: {
      sectionLabel: 'Сэндвичи',
      heading: 'Свежие сэндвичи',
      addToCart: 'В корзину',
    },

    contacts: {
      sectionLabel: 'Контакты',
      heading: 'Ждём тебя в KISSA',
      hours: 'Режим работы',
      address: 'Адрес',
      phone: 'Телефон',
      howToFind: 'Как нас найти',
      openIn2gis: 'Открыть в 2ГИС',
      kz: 'Казахстан',
    },

    footer: {
      about: 'KISSA — от японского 喫茶 («чайная»)',
      tagline: 'Матча · Смузи · Боулы · Сэндвичи · Костанай',
    },

    cart: {
      title: 'Корзина',
      close: 'Закрыть корзину',
      empty: 'Корзина пуста',
      backToMenu: 'Вернуться к меню',
      remove: 'Удалить',
      decrease: 'Уменьшить',
      increase: 'Увеличить',
      clear: 'Очистить корзину',
      comment: 'Комментарий к заказу',
      commentPlaceholder: 'Особые пожелания, аллергии, время…',
      total: 'Итого',
      checkout: 'Оформить заказ в WhatsApp',
      checkoutNote: 'Заказ уточняется в WhatsApp, оплата на сайте не требуется',
      comboWarning: 'Комбо доступно только с 8:00 до 12:00',
      comboBlocked: 'В корзине есть комбо, но сейчас оно недоступно. Удалите комбо, чтобы оформить заказ.',
      comboItemWarning: 'Комбо доступно только с 8:00 до 12:00',
      addedToCart: 'Добавлено в корзину',
      itemCount: (n: number) => `Корзина: ${n} позиций,`,
    },

    macros: { kcal: 'ккал', protein: 'Б', fat: 'Ж', carbs: 'У', grams: '' },

    tags: { spicy: 'Острое', hit: 'Хит', classic: 'Классика' },

    volumes: {
      coffee: '350 мл',
      cold: '500 мл',
      matchaChoice: '500 мл холодная / 350 мл горячая',
      cold500: 'холодная 500 мл',
      hot350: 'горячая 350 мл',
    },

    comboCartName: (coffee: string) => `Комбо: боул с курицей + ${coffee.toLowerCase()}`,
    comboCartDetails: (coffee: string) => `Боул с курицей + ${coffee} · только с 8:00 до 12:00`,

    meta: {
      title: 'KISSA — матча, смузи, боулы и сэндвичи в Костанае',
      description: 'KISSA — кофейня в Костанае. Матча, кофе, смузи, боулы и сэндвичи. Комбо 2990 ₸ каждый день с 8:00 до 12:00. Собери свой боул онлайн.',
    },
  },

  kk: {
    nav: { menu: 'Мәзір', bowlBuilder: 'Боул жаса', combo: 'Комбо', contacts: 'Байланыс' },
    whatsappBtn: 'WhatsApp',
    writeWhatsApp: 'WhatsApp-қа жазу',
    openMenu: 'Мәзірді ашу',
    closeMenu: 'Мәзірді жабу',

    hero: {
      location: 'Қостанай · Қазақстан',
      title: 'Your perfect drink is waiting at KISSA',
      subtitle: 'Сүйікті матчадан классикалық кофеға дейін. Смузи, боулдар және сэндвичтер.',
      viewMenu: 'Мәзірді қарау',
      instagram: 'Instagram',
      writeWhatsApp: 'WhatsApp-қа жазу',
      hoursBadge: 'Күн сайын 08:00–22:00 жұмыс істейміз',
      openNow: 'Қазір ашық',
      closedNow: 'Қазір жабық',
      comboUntil: 'Комбо 12:00-ге дейін',
    },

    combo: {
      everyday: 'Күн сайын 8:00-ден 12:00-ге дейін',
      chooseCombo: 'Комбо таңда',
      availableTimes: 'Комбо 8:00-ден 12:00-ге дейін қолжетімді',
      title: 'Тауық еті қосылған боул + кофе',
      description: 'Тауық еті қосылған боул + кофе таңдауыңызша (американо, латте немесе капучино). Күн сайын 8:00-ден 12:00-ге дейін.',
      chooseCoffee: 'Тауық еті қосылған боул + кофе таңдаңыз:',
      onlyTime: 'Комбо 8:00-ден 12:00-ге дейін қолжетімді',
      addToCart: 'Себетке қосу',
    },

    drinks: {
      sectionLabel: 'Сусындар мәзірі',
      heading: 'Өз сусыныңды таңда',
      kcal: 'ккал',
      addToCart: 'Себетке',
    },

    matcha: {
      chooseVariant: 'Сусын түрін таңда',
      samePrice: 'Бағасы бірдей.',
      cold: 'Салқын',
      hot: 'Ыстық',
      coldVolume: '500 мл',
      hotVolume: '350 мл',
      addToCart: 'Себетке қосу',
    },

    bowl: {
      sectionLabel: 'Боул конструкторы',
      heading: 'Өз боулыңды жаса',
      description: 'Негізді таңда, ұнататын қоспалар мен тұздықты қос. Бағасы = негіздің бағасы, қоспалар мен тұздық кіреді.',
      step1: 'Негізді таңда',
      step2: 'Ұнататыныңды қос',
      step3: 'Тұздық таңда',
      finalTouch: 'Соңғы түйін: жаңғақ пен тұқым қоспасынан себу',
      withTopping: '🥜 Себумен',
      withoutTopping: 'Себусіз',
      toppingAllergy: 'Себу құрамында жаңғақ бар. Аллергия болса, «Себусіз» таңдаңыз (бағасы өзгермейді).',
      allergyNote: 'Аллергия және арнайы өтініштер бойынша құрамды',
      allergyWhatsApp: 'WhatsApp',
      yourBowl: 'Сенің боулың',
      chooseBase: 'Боул жасау үшін негізді таңда.',
      base: 'Негіз:',
      fillers: 'Қоспалар:',
      noFillers: 'таңдалмады',
      sauce: 'Тұздық:',
      topping: 'Себу:',
      withToppingShort: 'себумен',
      withoutToppingShort: 'себусіз',
      approx: 'Шамамен:',
      withoutToppingNote: 'себусіз есептегенде',
      total: 'Барлығы',
      addToCart: 'Себетке қосу',
    },

    sandwiches: {
      sectionLabel: 'Сэндвичтер',
      heading: 'Жаңа сэндвичтер',
      addToCart: 'Себетке',
    },

    contacts: {
      sectionLabel: 'Байланыс',
      heading: 'KISSA-да күтеміз',
      hours: 'Жұмыс уақыты',
      address: 'Мекенжай',
      phone: 'Телефон',
      howToFind: 'Бізді қалай табуға болады',
      openIn2gis: '2ГИС-те ашу',
      kz: 'Қазақстан',
    },

    footer: {
      about: 'KISSA — жапондыық 喫茶 сөзінен («шайхана»)',
      tagline: 'Матча · Смузи · Боулдар · Сэндвичтер · Қостанай',
    },

    cart: {
      title: 'Себет',
      close: 'Себетті жабу',
      empty: 'Себет бос',
      backToMenu: 'Мәзірге оралу',
      remove: 'Жою',
      decrease: 'Азайту',
      increase: 'Көбейту',
      clear: 'Себетті тазалау',
      comment: 'Тапсырыс туралы пікір',
      commentPlaceholder: 'Арнайы өтініштер, аллергия, уақыт…',
      total: 'Барлығы',
      checkout: 'Тапсырысты WhatsApp-да рәсімдеу',
      checkoutNote: 'Тапсырыс WhatsApp-да нақтыланады, сайтта төлем қажет емес',
      comboWarning: 'Комбо тек 8:00-ден 12:00-ге дейін қолжетімді',
      comboBlocked: 'Себетте комбо бар, бірақ қазір қолжетімді емес. Тапсырыс беру үшін комбоны жойыңыз.',
      comboItemWarning: 'Комбо тек 8:00-ден 12:00-ге дейін қолжетімді',
      addedToCart: 'Себетке қосылды',
      itemCount: (n: number) => `Себет: ${n} дана,`,
    },

    macros: { kcal: 'ккал', protein: 'Б', fat: 'Ж', carbs: 'Ұ', grams: '' },

    tags: { spicy: 'Ыстық', hit: 'Хит', classic: 'Классика' },

    volumes: {
      coffee: '350 мл',
      cold: '500 мл',
      matchaChoice: '500 мл салқын / 350 мл ыстық',
      cold500: 'салқын 500 мл',
      hot350: 'ыстық 350 мл',
    },

    comboCartName: (coffee: string) => `Комбо: тауық еті қосылған боул + ${coffee.toLowerCase()}`,
    comboCartDetails: (coffee: string) => `Тауық еті қосылған боул + ${coffee} · тек 8:00-ден 12:00-ге дейін`,

    meta: {
      title: 'KISSA — Қостанайда матча, смузи, боулдар және сэндвичтер',
      description: 'KISSA — Қостанайдағы кофейня. Матча, кофе, смузи, боулдар және сэндвичтер. Комбо 2990 ₸ күн сайын 8:00-ден 12:00-ге дейін. Боулыңды онлайн жаса.',
    },
  },

  en: {
    nav: { menu: 'Menu', bowlBuilder: 'Build a bowl', combo: 'Combo', contacts: 'Contacts' },
    whatsappBtn: 'WhatsApp',
    writeWhatsApp: 'Message on WhatsApp',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',

    hero: {
      location: 'Kostanay · Kazakhstan',
      title: 'Your perfect drink is waiting at KISSA',
      subtitle: 'From your favorite matcha to a classic coffee. Smoothies, bowls and sandwiches.',
      viewMenu: 'View menu',
      instagram: 'Instagram',
      writeWhatsApp: 'Message on WhatsApp',
      hoursBadge: 'Open daily 08:00–22:00',
      openNow: 'Open now',
      closedNow: 'Currently closed',
      comboUntil: 'Combo until 12:00',
    },

    combo: {
      everyday: 'Every day 8:00–12:00',
      chooseCombo: 'Choose combo',
      availableTimes: 'Combo available from 8:00 to 12:00',
      title: 'Chicken bowl + coffee',
      description: 'Chicken bowl + coffee of choice (americano, latte or cappuccino). Every day from 8:00 to 12:00.',
      chooseCoffee: 'Chicken bowl + choose your coffee:',
      onlyTime: 'Combo available from 8:00 to 12:00',
      addToCart: 'Add to cart',
    },

    drinks: {
      sectionLabel: 'Drinks menu',
      heading: 'Choose your drink',
      kcal: 'kcal',
      addToCart: 'Add',
    },

    matcha: {
      chooseVariant: 'Choose your variant',
      samePrice: 'Price is the same.',
      cold: 'Cold',
      hot: 'Hot',
      coldVolume: '500 ml',
      hotVolume: '350 ml',
      addToCart: 'Add to cart',
    },

    bowl: {
      sectionLabel: 'Bowl builder',
      heading: 'Build your bowl',
      description: 'Choose a base, add your favorite fillings and sauce. Price = base price, fillings and sauce included.',
      step1: 'Choose your base',
      step2: 'Add everything you love',
      step3: 'Choose your sauce',
      finalTouch: 'Final touch: nut & seed sprinkle',
      withTopping: '🥜 With sprinkle',
      withoutTopping: 'No sprinkle',
      toppingAllergy: 'Sprinkle contains nuts. If you have an allergy, choose "No sprinkle" (price stays the same).',
      allergyNote: 'For allergies and special requests, check ingredients on',
      allergyWhatsApp: 'WhatsApp',
      yourBowl: 'Your bowl',
      chooseBase: 'Choose a base to start building your bowl.',
      base: 'Base:',
      fillers: 'Fillings:',
      noFillers: 'none selected',
      sauce: 'Sauce:',
      topping: 'Sprinkle:',
      withToppingShort: 'with sprinkle',
      withoutToppingShort: 'no sprinkle',
      approx: 'Approx:',
      withoutToppingNote: 'excluding sprinkle',
      total: 'Total',
      addToCart: 'Add to cart',
    },

    sandwiches: {
      sectionLabel: 'Sandwiches',
      heading: 'Fresh sandwiches',
      addToCart: 'Add',
    },

    contacts: {
      sectionLabel: 'Contacts',
      heading: 'See you at KISSA',
      hours: 'Opening hours',
      address: 'Address',
      phone: 'Phone',
      howToFind: 'How to find us',
      openIn2gis: 'Open in 2GIS',
      kz: 'Kazakhstan',
    },

    footer: {
      about: 'KISSA — from Japanese 喫茶 ("tea house")',
      tagline: 'Matcha · Smoothies · Bowls · Sandwiches · Kostanay',
    },

    cart: {
      title: 'Cart',
      close: 'Close cart',
      empty: 'Cart is empty',
      backToMenu: 'Back to menu',
      remove: 'Remove',
      decrease: 'Decrease',
      increase: 'Increase',
      clear: 'Clear cart',
      comment: 'Order comment',
      commentPlaceholder: 'Special requests, allergies, time…',
      total: 'Total',
      checkout: 'Checkout on WhatsApp',
      checkoutNote: 'Order is confirmed on WhatsApp, no online payment needed',
      comboWarning: 'Combo is only available from 8:00 to 12:00',
      comboBlocked: 'Your cart has a combo, but it is currently unavailable. Remove the combo to checkout.',
      comboItemWarning: 'Combo is only available from 8:00 to 12:00',
      addedToCart: 'Added to cart',
      itemCount: (n: number) => `Cart: ${n} items,`,
    },

    macros: { kcal: 'kcal', protein: 'P', fat: 'F', carbs: 'C', grams: 'g' },

    tags: { spicy: 'Spicy', hit: 'Hit', classic: 'Classic' },

    volumes: {
      coffee: '350 ml',
      cold: '500 ml',
      matchaChoice: '500 ml cold / 350 ml hot',
      cold500: 'cold 500 ml',
      hot350: 'hot 350 ml',
    },

    comboCartName: (coffee: string) => `Combo: chicken bowl + ${coffee.toLowerCase()}`,
    comboCartDetails: (coffee: string) => `Chicken bowl + ${coffee} · only 8:00–12:00`,

    meta: {
      title: 'KISSA — matcha, smoothies, bowls and sandwiches in Kostanay',
      description: 'KISSA — a coffee shop in Kostanay. Matcha, coffee, smoothies, bowls and sandwiches. Combo 2990 ₸ every day 8:00–12:00. Build your bowl online.',
    },
  },
};
