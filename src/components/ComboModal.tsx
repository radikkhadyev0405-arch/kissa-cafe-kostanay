import { useState } from 'react';
import { Clock, AlertTriangle, Check } from 'lucide-react';
import { Modal } from './Modal';
import { useCart } from '../context/CartContext';
import { combo as comboData } from '../data/menu';
import { isComboAvailable } from '../utils/comboTime';
import { useI18n } from '../context/I18nContext';

interface ComboModalProps {
  open: boolean;
  onClose: () => void;
}

export function ComboModal({ open, onClose }: ComboModalProps) {
  const { t, locale } = useI18n();
  const { addItem } = useCart();
  const [selectedCoffeeId, setSelectedCoffeeId] = useState<string | null>(null);
  const available = isComboAvailable();

  const handleClose = () => {
    setSelectedCoffeeId(null);
    onClose();
  };

  const handleAdd = () => {
    const coffee = comboData.coffees.find((c) => c.id === selectedCoffeeId);
    if (!coffee || !available) return;
    const ruCoffeeName = coffee.name.ru;
    addItem({
      key: `combo-${coffee.id}`,
      type: 'combo',
      name: { ru: t.combo.comboCartName(ruCoffeeName), kk: t.combo.comboCartName(coffee.name.kk), en: t.combo.comboCartName(coffee.name.en) },
      details: { ru: t.combo.comboCartDetails(ruCoffeeName), kk: t.combo.comboCartDetails(coffee.name.kk), en: t.combo.comboCartDetails(coffee.name.en) },
      ruName: `Комбо: боул с курицей + ${ruCoffeeName.toLowerCase()}`,
      ruDetails: `Боул с курицей + ${ruCoffeeName} · только с 8:00 до 12:00`,
      price: comboData.price,
      comboRestricted: true,
    });
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title={`${t.combo.title} ${comboData.price} ₸`}>
      {!available && (
        <div className="mb-4 flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-sm font-semibold text-amber-700">
          <AlertTriangle size={18} className="mt-0.5 flex-shrink-0" />
          {t.combo.onlyTime}
        </div>
      )}

      <p className="mb-4 text-sm font-semibold text-kissa-green">
        {t.combo.chooseCoffee}
      </p>

      <div className="space-y-2.5">
        {comboData.coffees.map((coffee) => {
          const selected = selectedCoffeeId === coffee.id;
          return (
            <button
              key={coffee.id}
              onClick={() => setSelectedCoffeeId(coffee.id)}
              disabled={!available}
              className={`flex w-full items-center justify-between rounded-kissa border-2 p-4 text-left transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
                selected
                  ? 'border-kissa-pink bg-kissa-pink-light'
                  : 'border-kissa-pink-light bg-white hover:bg-kissa-pink-light/50'
              }`}
              aria-pressed={selected}
            >
              <span className="font-display text-sm font-extrabold uppercase text-kissa-green">
                {coffee.name[locale]}
              </span>
              {selected && (
                <Check size={20} className="text-kissa-pink" strokeWidth={3} />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-kissa-olive">
        <Clock size={14} /> {t.combo.onlyTime}
      </div>

      <button
        onClick={handleAdd}
        disabled={!selectedCoffeeId || !available}
        className={`mt-5 flex w-full items-center justify-center gap-2 rounded-full py-3.5 font-bold transition-transform ${
          selectedCoffeeId && available
            ? 'bg-kissa-pink text-white shadow-kissa hover:scale-[1.02] active:scale-95'
            : 'cursor-not-allowed bg-gray-200 text-gray-400'
        }`}
      >
        {t.combo.addToCart} · {comboData.price} ₸
      </button>
    </Modal>
  );
}
