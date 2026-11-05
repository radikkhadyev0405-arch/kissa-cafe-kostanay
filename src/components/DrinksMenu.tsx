import { useState } from 'react';
import { Plus } from 'lucide-react';
import { SmartImage } from './SmartImage';
import { Starfish } from './Decor';
import { MatchaModal } from './MatchaModal';
import { useCart } from '../context/CartContext';
import { drinkCategories, type DrinkItem } from '../data/menu';

export function DrinksMenu() {
  const { addItem } = useCart();
  const [active, setActive] = useState(drinkCategories[0].id);
  const [matchaItem, setMatchaItem] = useState<{ id: string; name: string; price: number } | null>(null);

  const current = drinkCategories.find((c) => c.id === active)!;

  const handleAdd = (catId: string, item: { id: string; name: string; price: number }) => {
    if (catId === 'matcha') {
      setMatchaItem({ id: item.id, name: item.name, price: item.price });
      return;
    }
    const volume = catId === 'coffee' || catId === 'tea' ? '350 мл' : '500 мл';
    addItem({
      key: `drink-${item.id}`,
      type: 'drink',
      name: item.name,
      details: volume,
      price: item.price,
    });
  };

  return (
    <section id="menu" className="relative overflow-hidden bg-kissa-cream px-4 py-14 sm:px-6 sm:py-20">
      <Starfish className="absolute left-2 top-10 w-16 opacity-60 animate-floaty sm:w-24" />

      <div className="relative mx-auto max-w-5xl">
        <div className="text-center">
          <span className="inline-block rounded-full bg-kissa-lime px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-kissa-green">
            Меню напитков
          </span>
          <h2 className="mt-4 font-display text-3xl font-black uppercase text-kissa-green sm:text-4xl lg:text-5xl">
            Выбери свой напиток
          </h2>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {drinkCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`rounded-full px-5 py-2.5 font-bold transition-all ${
                active === cat.id
                  ? 'bg-kissa-pink text-white shadow-kissa scale-105'
                  : 'bg-white text-kissa-green hover:bg-kissa-pink-light'
              }`}
              aria-pressed={active === cat.id}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <p className="mt-4 text-center text-sm font-semibold text-kissa-olive">
          {current.volume}
        </p>

        <div key={active} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {current.items.map((item: DrinkItem, i) => (
            <article
              key={item.id}
              className="group flex gap-4 overflow-hidden rounded-kissa bg-white p-4 shadow-kissa transition-transform hover:-translate-y-1 hover:shadow-kissa-lg"
              style={{ animation: `slideUp 0.4s ease-out ${i * 0.06}s both` }}
            >
              <SmartImage
                src={item.image}
                alt={item.name}
                className="h-24 w-24 flex-shrink-0 rounded-2xl object-cover"
              />
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="font-display text-base font-extrabold leading-tight text-kissa-green sm:text-lg">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-kissa-olive">
                    {item.kcal} ккал
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="font-display text-xl font-black text-kissa-pink">
                    {item.price} ₸
                  </p>
                  <button
                    onClick={() => handleAdd(active, item)}
                    className="flex items-center gap-1 rounded-full bg-kissa-pink px-3 py-1.5 text-xs font-bold text-white transition-transform hover:scale-105 active:scale-95"
                    aria-label={`Добавить в корзину: ${item.name}`}
                  >
                    <Plus size={14} strokeWidth={3} />
                    В корзину
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {matchaItem && (
        <MatchaModal
          open={!!matchaItem}
          onClose={() => setMatchaItem(null)}
          drinkId={matchaItem.id}
          drinkName={matchaItem.name}
          price={matchaItem.price}
        />
      )}
    </section>
  );
}
