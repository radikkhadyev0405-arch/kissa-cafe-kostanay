import { Plus } from 'lucide-react';
import { SmartImage } from './SmartImage';
import { Daisy } from './Decor';
import { useCart } from '../context/CartContext';
import { sandwiches } from '../data/menu';
import { formatMacrosGrams } from '../utils/macros';

export function Sandwiches() {
  const { addItem } = useCart();

  const handleAdd = (s: { id: string; name: string; price: number }) => {
    addItem({
      key: `sandwich-${s.id}`,
      type: 'sandwich',
      name: `Сэндвич: ${s.name}`,
      details: 'сэндвич',
      price: s.price,
    });
  };

  return (
    <section className="relative overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-20">
      <Daisy className="absolute left-2 top-10 w-16 opacity-60 animate-floaty sm:w-24" />
      <Daisy className="absolute right-4 bottom-10 w-14 opacity-50 animate-wiggle sm:w-20" />

      <div className="relative mx-auto max-w-5xl">
        <div className="text-center">
          <span className="inline-block rounded-full bg-kissa-lime px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-kissa-green">
            Сэндвичи
          </span>
          <h2 className="mt-4 font-display text-3xl font-black uppercase text-kissa-green sm:text-4xl lg:text-5xl">
            Свежие сэндвичи
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {sandwiches.map((s, i) => (
            <article
              key={s.id}
              className="group overflow-hidden rounded-kissa-lg bg-kissa-pink-light shadow-kissa transition-transform hover:-translate-y-2 hover:shadow-kissa-lg"
              style={{ animation: `slideUp 0.4s ease-out ${i * 0.1}s both` }}
            >
              <div className="relative overflow-hidden">
                <SmartImage
                  src={s.image}
                  alt={s.name}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute left-3 top-3 rounded-full bg-kissa-pink px-3 py-1 text-xs font-bold uppercase text-white shadow-kissa">
                  {s.tag}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-extrabold uppercase text-kissa-green">{s.name}</h3>
                <p className="mt-1 text-xs font-semibold text-kissa-olive">
                  {formatMacrosGrams(s.macros)}
                </p>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <p className="font-display text-2xl font-black text-kissa-pink">{s.price} ₸</p>
                  <button
                    onClick={() => handleAdd(s)}
                    className="flex items-center gap-1 rounded-full bg-kissa-pink px-4 py-2 text-sm font-bold text-white transition-transform hover:scale-105 active:scale-95"
                    aria-label={`Добавить в корзину: ${s.name}`}
                  >
                    <Plus size={16} strokeWidth={3} />
                    В корзину
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
