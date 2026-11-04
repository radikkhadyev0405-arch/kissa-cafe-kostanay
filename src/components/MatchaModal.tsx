import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Modal } from './Modal';
import { useCart } from '../context/CartContext';

interface MatchaModalProps {
  open: boolean;
  onClose: () => void;
  drinkId: string;
  drinkName: string;
  price: number;
}

type Variant = 'cold' | 'hot';

export function MatchaModal({ open, onClose, drinkId, drinkName, price }: MatchaModalProps) {
  const { addItem } = useCart();
  const [variant, setVariant] = useState<Variant | null>(null);

  const handleClose = () => {
    setVariant(null);
    onClose();
  };

  const handleAdd = () => {
    if (!variant) return;
    const isCold = variant === 'cold';
    const details = isCold ? 'холодная 500 мл' : 'горячая 350 мл';
    addItem({
      key: `${drinkId}-${variant}`,
      type: 'drink',
      name: drinkName,
      details,
      price,
    });
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title={drinkName}>
      <p className="mb-4 text-sm text-kissa-olive">Выбери вариант напитка. Цена одинаковая.</p>

      <div className="grid grid-cols-2 gap-3">
        {[
          { id: 'cold' as Variant, label: 'Холодная', volume: '500 мл' },
          { id: 'hot' as Variant, label: 'Горячая', volume: '350 мл' },
        ].map((opt) => {
          const selected = variant === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setVariant(opt.id)}
              className={`rounded-kissa border-2 p-4 text-center transition-all ${
                selected
                  ? 'border-kissa-pink bg-kissa-pink-light'
                  : 'border-kissa-pink-light bg-white hover:bg-kissa-pink-light/50'
              }`}
              aria-pressed={selected}
            >
              <p className="font-display text-sm font-extrabold uppercase text-kissa-green">{opt.label}</p>
              <p className="mt-1 text-xs text-kissa-olive">{opt.volume}</p>
            </button>
          );
        })}
      </div>

      <button
        onClick={handleAdd}
        disabled={!variant}
        className={`mt-5 flex w-full items-center justify-center gap-2 rounded-full py-3.5 font-bold transition-transform ${
          variant
            ? 'bg-kissa-pink text-white shadow-kissa hover:scale-[1.02] active:scale-95'
            : 'cursor-not-allowed bg-gray-200 text-gray-400'
        }`}
      >
        <Plus size={18} strokeWidth={3} />
        Добавить в корзину · {price} ₸
      </button>
    </Modal>
  );
}
