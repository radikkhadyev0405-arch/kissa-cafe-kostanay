import { useMemo, useState } from 'react';
import { Check, Sparkles, ShoppingCart } from 'lucide-react';
import { SmartImage } from './SmartImage';
import { Daisy, Starfish } from './Decor';
import { useCart } from '../context/CartContext';
import { bowlBuilder, cafeInfo } from '../data/menu';
import { formatMacros, sumMacros } from '../utils/macros';

export function BowlBuilder() {
  const { addItem } = useCart();
  const [baseId, setBaseId] = useState<string | null>(null);
  const [fillers, setFillers] = useState<string[]>([]);
  const [sauceId, setSauceId] = useState<string | null>(null);
  const [withTopping, setWithTopping] = useState(true);

  const base = bowlBuilder.bases.find((b) => b.id === baseId) || null;
  const selectedFillers = bowlBuilder.fillers.filter((f) => fillers.includes(f.id));
  const sauce = bowlBuilder.sauces.find((s) => s.id === sauceId) || null;

  const total = useMemo(() => (base ? base.price : 0), [base]);

  const toggleFiller = (id: string) => {
    setFillers((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const bowlDetails = useMemo(() => {
    const parts: string[] = [];
    if (base) parts.push(base.name.toLowerCase());
    selectedFillers.forEach((f) => parts.push(f.name.toLowerCase()));
    if (sauce) parts.push(sauce.name.toLowerCase());
    parts.push(withTopping ? 'с посыпкой' : 'без посыпки');
    return parts.join(', ');
  }, [base, selectedFillers, sauce, withTopping]);

  const bowlMacros = useMemo(() => {
    if (!base) return null;
    const items = [
      base.macros,
      ...selectedFillers.map((f) => f.macros),
      sauce?.macros,
    ];
    return sumMacros(items);
  }, [base, selectedFillers, sauce]);

  const bowlName = 'Боул';

  const handleAddToCart = () => {
    if (!base) return;
    addItem({
      key: `bowl-${base.id}-${fillers.join('-')}-${sauceId}-${withTopping}`,
      type: 'bowl',
      name: bowlName,
      details: bowlDetails,
      price: total,
    });
  };

  const whatsappInfoLink = `https://wa.me/${cafeInfo.whatsapp}?text=${encodeURIComponent('Здравствуйте! У меня вопрос по составу боула (аллергия).')}`;

  return (
    <section id="bowl" className="relative overflow-hidden bg-kissa-pink-light px-4 py-14 sm:px-6 sm:py-20">
      <Daisy className="absolute right-4 top-8 w-16 opacity-70 animate-floaty sm:w-24" />
      <Starfish className="absolute left-2 bottom-10 w-20 opacity-60 animate-wiggle sm:w-28" />

      <div className="relative mx-auto max-w-5xl">
        <div className="text-center">
          <span className="inline-block rounded-full bg-kissa-lime px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-kissa-green">
            Конструктор боула
          </span>
          <h2 className="mt-4 font-display text-3xl font-black uppercase text-kissa-green sm:text-4xl lg:text-5xl">
            Собери свой боул
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base text-kissa-green/80 sm:text-lg">
            Выбери основу, добавь любимые наполнители и соус. Цена = цена основы, наполнители и соусы входят.
          </p>
        </div>

        {/* Step 1 — Base */}
        <div className="mt-10">
          <h3 className="mb-4 flex items-center gap-3 font-display text-xl font-extrabold uppercase text-kissa-green sm:text-2xl">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-kissa-pink text-white">1</span>
            Выбери основу
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {bowlBuilder.bases.map((b) => {
              const selected = baseId === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => setBaseId(b.id)}
                  className={`group relative flex items-center gap-4 overflow-hidden rounded-kissa bg-white p-4 text-left shadow-kissa transition-all hover:-translate-y-1 hover:shadow-kissa-lg ${
                    selected ? 'ring-4 ring-kissa-pink' : ''
                  }`}
                >
                  <SmartImage
                    src={b.image}
                    alt={b.name}
                    className="h-20 w-20 flex-shrink-0 rounded-2xl object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-display text-base font-extrabold text-kissa-green sm:text-lg">{b.name}</p>
                    <p className="mt-1 font-display text-xl font-black text-kissa-pink">{b.price} ₸</p>
                    {b.macros && (
                      <p className="mt-0.5 text-xs font-semibold text-kissa-olive">{formatMacros(b.macros)}</p>
                    )}
                  </div>
                  {selected && (
                    <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-kissa-pink text-white animate-pop">
                      <Check size={16} strokeWidth={3} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2 — Fillers */}
        <div className="mt-10">
          <h3 className="mb-4 flex items-center gap-3 font-display text-xl font-extrabold uppercase text-kissa-green sm:text-2xl">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-kissa-pink text-white">2</span>
            Добавь всё, что любишь
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {bowlBuilder.fillers.map((f) => {
              const selected = fillers.includes(f.id);
              return (
                <span
                  key={f.id}
                  className="inline-flex flex-col items-start"
                >
                  <button
                    onClick={() => toggleFiller(f.id)}
                    className={`rounded-full px-4 py-2.5 text-sm font-bold transition-all ${
                      selected
                        ? 'bg-kissa-green text-white shadow-kissa scale-105'
                        : 'bg-white text-kissa-green shadow-kissa hover:bg-kissa-lime'
                    }`}
                    aria-pressed={selected}
                  >
                    {selected && <Check size={14} className="mr-1 inline" strokeWidth={3} />}
                    {f.name}
                  </button>
                  {f.macros && (
                    <span className="mt-0.5 px-2 text-[10px] font-semibold text-kissa-olive">
                      {formatMacros(f.macros)}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        </div>

        {/* Step 3 — Sauce */}
        <div className="mt-10">
          <h3 className="mb-4 flex items-center gap-3 font-display text-xl font-extrabold uppercase text-kissa-green sm:text-2xl">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-kissa-pink text-white">3</span>
            Выбери соус
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {bowlBuilder.sauces.map((s) => {
              const selected = sauceId === s.id;
              return (
                <span key={s.id} className="inline-flex flex-col items-start">
                  <button
                    onClick={() => setSauceId(s.id)}
                    className={`rounded-full px-4 py-2.5 text-sm font-bold transition-all ${
                      selected
                        ? 'bg-kissa-olive text-white shadow-kissa scale-105'
                        : 'bg-white text-kissa-green shadow-kissa hover:bg-kissa-lime'
                    }`}
                    aria-pressed={selected}
                  >
                    {selected && <Check size={14} className="mr-1 inline" strokeWidth={3} />}
                    {s.name}
                    {s.allergen && (
                      <span className="ml-1.5 text-[10px] font-semibold normal-case opacity-80">({s.allergen})</span>
                    )}
                  </button>
                  {s.macros && (
                    <span className="mt-0.5 px-2 text-[10px] font-semibold text-kissa-olive">
                      {formatMacros(s.macros)}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        </div>

        {/* Final touch — big choice buttons */}
        <div className="mt-8 rounded-kissa bg-kissa-lime p-4 shadow-kissa sm:p-5">
          <p className="flex items-center gap-2 font-display text-base font-extrabold uppercase text-kissa-green sm:text-lg">
            <Sparkles size={20} className="text-kissa-pink" />
            Финальный штрих: посыпка из смеси орехов и семян
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              onClick={() => setWithTopping(true)}
              className={`flex items-center justify-center gap-2 rounded-kissa border-2 py-4 font-display text-sm font-extrabold uppercase transition-all ${
                withTopping
                  ? 'border-kissa-pink bg-kissa-pink text-white shadow-kissa'
                  : 'border-kissa-pink-light bg-white text-kissa-green hover:bg-kissa-pink-light/50'
              }`}
              aria-pressed={withTopping}
            >
              {withTopping && <Check size={18} strokeWidth={3} />}
              🥜 С посыпкой
            </button>
            <button
              onClick={() => setWithTopping(false)}
              className={`flex items-center justify-center gap-2 rounded-kissa border-2 py-4 font-display text-sm font-extrabold uppercase transition-all ${
                !withTopping
                  ? 'border-kissa-pink bg-kissa-pink text-white shadow-kissa'
                  : 'border-kissa-pink-light bg-white text-kissa-green hover:bg-kissa-pink-light/50'
              }`}
              aria-pressed={!withTopping}
            >
              {!withTopping && <Check size={18} strokeWidth={3} />}
              Без посыпки
            </button>
          </div>

          <p className="mt-3 text-xs font-semibold text-kissa-green/70">
            Посыпка содержит орехи. При аллергии выберите «Без посыпки» (цена не меняется).
          </p>
        </div>

        <p className="mt-3 text-center text-xs text-kissa-olive">
          При аллергиях и особых пожеланиях уточняйте состав в{' '}
          <a href={whatsappInfoLink} target="_blank" rel="noopener noreferrer" className="underline">
            WhatsApp
          </a>
        </p>

        {/* Summary + actions */}
        <div className="mt-8 rounded-kissa-lg bg-white p-5 shadow-kissa-lg sm:p-6">
          <h3 className="font-display text-lg font-extrabold uppercase text-kissa-green">Твой боул</h3>
          {!base ? (
            <p className="mt-3 text-sm text-kissa-green/60">Выбери основу, чтобы начать собирать боул.</p>
          ) : (
            <div className="mt-3 space-y-1.5 text-sm sm:text-base">
              <p className="text-kissa-green"><span className="font-bold">Основа:</span> {base.name}</p>
              {selectedFillers.length > 0 ? (
                <p className="text-kissa-green"><span className="font-bold">Наполнители:</span> {selectedFillers.map((f) => f.name).join(', ')}</p>
              ) : (
                <p className="text-kissa-green/50"><span className="font-bold">Наполнители:</span> не выбраны</p>
              )}
              {sauce && <p className="text-kissa-green"><span className="font-bold">Соус:</span> {sauce.name}</p>}
              <p className="text-kissa-green">
                <span className="font-bold">Посыпка:</span>{' '}
                {withTopping ? 'с посыпкой' : 'без посыпки'}
              </p>
              {bowlMacros && (
                <div className="mt-2 rounded-xl bg-kissa-pink-light px-3 py-2">
                  <p className="text-xs font-bold text-kissa-green">
                    Примерно: {formatMacros(bowlMacros)}
                  </p>
                  <p className="mt-0.5 text-[10px] text-kissa-olive">без учёта посыпки</p>
                </div>
              )}
            </div>
          )}

          <div className="mt-5 flex flex-col items-center justify-between gap-4 border-t-2 border-kissa-pink-light pt-5 sm:flex-row">
            <div>
              <p className="text-xs font-bold uppercase text-kissa-olive">Итого</p>
              <p className="font-display text-3xl font-black text-kissa-pink">
                {total > 0 ? `${total} ₸` : '— ₸'}
              </p>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!base}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 font-bold transition-transform sm:w-auto ${
                base
                  ? 'bg-kissa-pink text-white shadow-kissa hover:scale-105 active:scale-95'
                  : 'cursor-not-allowed bg-gray-200 text-gray-400'
              }`}
            >
              <ShoppingCart size={18} />
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
