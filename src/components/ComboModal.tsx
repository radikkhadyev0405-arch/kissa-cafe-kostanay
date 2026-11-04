import { useState } from 'react';
import { Clock, AlertTriangle, Check } from 'lucide-react';
import { Modal } from './Modal';
import { useCart } from '../context/CartContext';
import { combo as comboData, cafeInfo } from '../data/menu';
import { isComboAvailable } from '../utils/comboTime';

interface ComboModalProps {
  open: boolean;
  onClose: () => void;
}

export function ComboModal({ open, onClose }: ComboModalProps) {
  const { addItem } = useCart();
  const [selectedCoffee, setSelectedCoffee] = useState<string | null>(null);
  const available = isComboAvailable();

  const handleClose = () => {
    setSelectedCoffee(null);
    onClose();
  };

  const handleAdd = () => {
    if (!selectedCoffee || !available) return;
    addItem({
      key: `combo-${selectedCoffee}`,
      type: 'combo',
      name: `Комбо: боул с курицей + ${selectedCoffee.toLowerCase()}`,
      details: `Боул с курицей + ${selectedCoffee} · только с 8:00 до 12:00`,
      price: comboData.price,
      comboRestricted: true,
    });
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title={`Комбо ${comboData.price} ₸`}>
      {!available && (
        <div className="mb-4 flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-sm font-semibold text-amber-700">
          <AlertTriangle size={18} className="mt-0.5 flex-shrink-0" />
          Комбо доступно только с 8:00 до 12:00 по времени Костаная.
        </div>
      )}

      <p className="mb-4 text-sm font-semibold text-kissa-green">
        Боул с курицей + кофе на выбор:
      </p>

      <div className="space-y-2.5">
        {comboData.coffees.map((coffee) => {
          const selected = selectedCoffee === coffee;
          return (
            <button
              key={coffee}
              onClick={() => setSelectedCoffee(coffee)}
              disabled={!available}
              className={`flex w-full items-center justify-between rounded-kissa border-2 p-4 text-left transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
                selected
                  ? 'border-kissa-pink bg-kissa-pink-light'
                  : 'border-kissa-pink-light bg-white hover:bg-kissa-pink-light/50'
              }`}
              aria-pressed={selected}
            >
              <span className="font-display text-sm font-extrabold uppercase text-kissa-green">
                {coffee}
              </span>
              {selected && (
                <Check size={20} className="text-kissa-pink" strokeWidth={3} />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-kissa-olive">
        <Clock size={14} /> Только с 8:00 до 12:00 · {cafeInfo.hours}
      </div>

      <button
        onClick={handleAdd}
        disabled={!selectedCoffee || !available}
        className={`mt-5 flex w-full items-center justify-center gap-2 rounded-full py-3.5 font-bold transition-transform ${
          selectedCoffee && available
            ? 'bg-kissa-pink text-white shadow-kissa hover:scale-[1.02] active:scale-95'
            : 'cursor-not-allowed bg-gray-200 text-gray-400'
        }`}
      >
        Добавить в корзину · {comboData.price} ₸
      </button>
    </Modal>
  );
}
