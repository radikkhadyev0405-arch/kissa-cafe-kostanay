import { useMemo, useState } from 'react';
import { Check, Sparkles, MessageCircle, ShoppingCart, AlertTriangle } from 'lucide-react';
import { SmartImage } from './SmartImage';
import { Daisy, Starfish } from './Decor';
import { useCart } from '../context/CartContext';
import { bowlBuilder, cafeInfo } from '../data/menu';
import { whatsappSingleLink, buildBowlOrderMessage } from '../utils/cart';

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

  const bowlName = 'Боул';
  const hasAllergen = sauce?.id === 'nut' || withTopping;

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

  const handleWhatsApp = () => {
    if (!base) return;
    const msg = buildBowlOrderMessage({ name: bowlName, details: bowlDetails, price: total });
    window.open(whatsappSingleLink(msg), '_blank', 'noopener,noreferrer');
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
                <button
                  key={f.id}
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
                <button
                  key={s.id}
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
              );
            })}
          </div>
        </div>

        {/* Final touch — toggle */}
        <div className="mt-8 rounded-kissa bg-kissa-lime p-4 shadow-kissa">
          <label className="flex cursor-pointer items-start gap-3">
            <button
              type="button"
              role="switch"
              aria-checked={withTopping}
              onClick={() => setWithTopping(!withTopping)}
              className={`relative mt-0.5 h-7 w-12 flex-shrink-0 rounded-full transition-colors ${
                withTopping ? 'bg-kissa-pink' : 'bg-gray-300'
              }`}
              aria-label="Посыпка из орехов и семян"
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${
                  withTopping ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <div className="flex-1">
              <p className="flex items-center gap-2 font-semibold text-kissa-green">
                <Sparkles size={18} className="text-kissa-pink" />
                <span className="font-display font-extrabold uppercase">Финальный штрих —</span>
              </p>
              <p className="mt-0.5 text-sm font-semibold text-kissa-green">Посыпка из смеси орехов и семян</p>
              <p className="mt-1 text-xs text-kissa-green/70">
                Содержит орехи. Если у вас аллергия, отключите и напишите нам в WhatsApp.
              </p>
            </div>
          </label>
        </div>

        {(hasAllergen) && (
          <p className="mt-3 text-center text-xs text-kissa-olive">
            При аллергиях и особых пожеланиях уточняйте состав в{' '}
            <a href={whatsappInfoLink} target="_blank" rel="noopener noreferrer" className="underline">
              WhatsApp
            </a>
          </p>
        )}

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
                {withTopping ? 'из смеси орехов и семян' : 'без посыпки'}
              </p>
            </div>
          )}

          <div className="mt-5 flex flex-col items-center justify-between gap-4 border-t-2 border-kissa-pink-light pt-5 sm:flex-row">
            <div>
              <p className="text-xs font-bold uppercase text-kissa-olive">Итого</p>
              <p className="font-display text-3xl font-black text-kissa-pink">
                {total > 0 ? `${total} ₸` : '— ₸'}
              </p>
            </div>
            <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row">
              <button
                onClick={handleAddToCart}
                disabled={!base}
                className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3.5 font-bold transition-transform sm:flex-none ${
                  base
                    ? 'bg-kissa-pink text-white shadow-kissa hover:scale-105 active:scale-95'
                    : 'cursor-not-allowed bg-gray-200 text-gray-400'
                }`}
              >
                <ShoppingCart size={18} />
                В корзину
              </button>
              <button
                onClick={handleWhatsApp}
                disabled={!base}
                className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3.5 font-bold transition-transform sm:flex-none ${
                  base
                    ? 'bg-kissa-green text-white shadow-kissa hover:scale-105 active:scale-95'
                    : 'cursor-not-allowed bg-gray-200 text-gray-400'
                }`}
              >
                <MessageCircle size={18} />
                Заказать в WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
