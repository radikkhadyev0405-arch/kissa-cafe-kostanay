import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Modal } from './Modal';
import { useCart } from '../context/CartContext';
import { useI18n } from '../context/I18nContext';
import type { LocalizedText } from '../data/menu';

interface MatchaModalProps {
  open: boolean;
  onClose: () => void;
  drinkId: string;
  drinkName: LocalizedText;
  price: number;
}

type Variant = 'cold' | 'hot';

export function MatchaModal({ open, onClose, drinkId, drinkName, price }: MatchaModalProps) {
  const { t } = useI18n();
  const { addItem } = useCart();
  const [variant, setVariant] = useState<Variant | null>(null);

  const handleClose = () => {
    setVariant(null);
    onClose();
  };

  const handleAdd = () => {
    if (!variant) return;
    const isCold = variant === 'cold';
    const details: LocalizedText = isCold
      ? { ru: 'холодная 500 мл', kk: 'салқын 500 мл', en: 'cold 500 ml' }
      : { ru: 'горячая 350 мл', kk: 'ыстық 350 мл', en: 'hot 350 ml' };
    addItem({
      key: `${drinkId}-${variant}`,
      type: 'drink',
      name: drinkName,
      details,
      ruName: drinkName.ru,
      ruDetails: isCold ? 'холодная 500 мл' : 'горячая 350 мл',
      price,
    });
    handleClose();
  };

  const options = [
    { id: 'cold' as Variant, label: t.matcha.cold, volume: t.matcha.coldVolume },
    { id: 'hot' as Variant, label: t.matcha.hot, volume: t.matcha.hotVolume },
  ];

  return (
    <Modal open={open} onClose={handleClose} title={drinkName.ru}>
      <p className="mb-4 text-sm text-kissa-olive">{t.matcha.chooseVariant}. {t.matcha.samePrice}</p>

      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => {
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
        {t.matcha.addToCart} · {price} ₸
      </button>
    </Modal>
  );
}
