import { useEffect, useMemo, useState } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, MessageCircle, AlertTriangle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { isComboAvailable } from '../utils/comboTime';
import { whatsappOrderLink } from '../utils/cart';
import { cafeInfo } from '../data/menu';

export function Cart() {
  const { items, total, count, isOpen, openCart, closeCart, removeItem, changeQty, clear, bump, toast } = useCart();
  const [comment, setComment] = useState('');
  const [nowAvailable, setNowAvailable] = useState(isComboAvailable());

  // Re-check combo availability every minute
  useEffect(() => {
    setNowAvailable(isComboAvailable());
    const id = window.setInterval(() => setNowAvailable(isComboAvailable()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  // Re-check on open
  useEffect(() => {
    if (isOpen) setNowAvailable(isComboAvailable());
  }, [isOpen]);

  const hasCombo = items.some((i) => i.type === 'combo');
  const comboBlocked = hasCombo && !nowAvailable;

  const checkoutLink = useMemo(
    () => (comboBlocked ? null : whatsappOrderLink(items, comment)),
    [items, comment, comboBlocked]
  );

  if (count === 0 && !isOpen) return null;

  return (
    <>
      {/* Floating button */}
      {count > 0 && !isOpen && (
        <button
          onClick={openCart}
          className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-kissa-pink px-5 py-3.5 font-bold text-white shadow-kissa-lg transition-transform hover:scale-105 active:scale-95 ${
            bump ? 'animate-pop' : ''
          }`}
          aria-label={`Корзина: ${count} позиций, ${total} ₸`}
        >
          <ShoppingBag size={22} />
          <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-1.5 text-sm text-kissa-pink">
            {count}
          </span>
          <span className="font-display text-base font-black">{total} ₸</span>
        </button>
      )}

      {/* Toast */}
      {toast && !isOpen && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-kissa-green px-5 py-2.5 text-sm font-bold text-white shadow-kissa-lg">
          {toast}
        </div>
      )}

      {/* Drawer overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/40"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed z-[70] flex max-h-full flex-col bg-kissa-cream shadow-kissa-lg transition-transform duration-300 ${
          isOpen ? 'translate-y-0 translate-x-0' : 'translate-y-full sm:translate-x-full sm:translate-y-0'
        } inset-x-0 bottom-0 max-h-[90vh] rounded-t-kissa-lg sm:inset-y-0 sm:right-0 sm:left-auto sm:w-[420px] sm:max-h-none sm:rounded-l-kissa-lg`}
        role="dialog"
        aria-label="Корзина"
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b-2 border-kissa-pink-light p-5">
          <h2 className="font-display text-lg font-black uppercase text-kissa-green">Корзина</h2>
          <button
            onClick={closeCart}
            className="rounded-full p-2 text-kissa-green transition-colors hover:bg-kissa-pink-light"
            aria-label="Закрыть корзину"
          >
            <X size={22} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <ShoppingBag size={48} className="text-kissa-pink-light" />
            <p className="font-semibold text-kissa-green">Корзина пуста</p>
            <button
              onClick={closeCart}
              className="mt-2 rounded-full bg-kissa-pink px-5 py-2.5 font-bold text-white"
            >
              Вернуться к меню
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {items.map((item) => (
                <div
                  key={item.key}
                  className="rounded-kissa bg-white p-3.5 shadow-kissa"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="font-display text-sm font-extrabold leading-tight text-kissa-green">
                        {item.name}
                      </p>
                      <p className="mt-0.5 text-xs text-kissa-olive">{item.details}</p>
                      <p className="mt-1 font-display text-base font-black text-kissa-pink">
                        {item.price * item.qty} ₸
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.key)}
                      className="rounded-full p-1.5 text-kissa-green/50 transition-colors hover:bg-kissa-pink-light hover:text-kissa-pink"
                      aria-label={`Удалить ${item.name}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => changeQty(item.key, -1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-kissa-pink-light text-kissa-pink transition-transform active:scale-90"
                        aria-label="Уменьшить"
                      >
                        <Minus size={16} strokeWidth={3} />
                      </button>
                      <span className="w-6 text-center font-bold text-kissa-green">{item.qty}</span>
                      <button
                        onClick={() => changeQty(item.key, 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-kissa-pink text-white transition-transform active:scale-90"
                        aria-label="Увеличить"
                      >
                        <Plus size={16} strokeWidth={3} />
                      </button>
                    </div>
                    <span className="text-xs text-kissa-olive">{item.price} ₸ × {item.qty}</span>
                  </div>

                  {item.comboRestricted && !nowAvailable && (
                    <div className="mt-2 flex items-start gap-1.5 rounded-xl bg-amber-50 p-2 text-xs font-semibold text-amber-700">
                      <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" />
                      Комбо доступно только с 8:00 до 12:00
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={clear}
                className="w-full rounded-full border-2 border-kissa-pink-light py-2.5 text-sm font-bold text-kissa-green/70 transition-colors hover:border-kissa-pink hover:text-kissa-pink"
              >
                Очистить корзину
              </button>
            </div>

            <div className="border-t-2 border-kissa-pink-light p-4">
              {comboBlocked && (
                <div className="mb-3 flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-sm font-semibold text-amber-700">
                  <AlertTriangle size={18} className="mt-0.5 flex-shrink-0" />
                  В корзине есть комбо, но сейчас оно недоступно. Удалите комбо, чтобы оформить заказ.
                </div>
              )}

              <label className="mb-1 block text-xs font-bold uppercase text-kissa-olive">
                Комментарий к заказу
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={2}
                placeholder="Особые пожелания, аллергии, время…"
                className="mb-3 w-full resize-none rounded-2xl border-2 border-kissa-pink-light bg-white px-3 py-2 text-sm text-kissa-green placeholder:text-kissa-green/40 focus:border-kissa-pink focus:outline-none"
              />

              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-bold uppercase text-kissa-olive">Итого</span>
                <span className="font-display text-2xl font-black text-kissa-pink">{total} ₸</span>
              </div>

              {checkoutLink ? (
                <a
                  href={checkoutLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-kissa-pink py-3.5 font-bold text-white shadow-kissa transition-transform hover:scale-[1.02] active:scale-95"
                >
                  <MessageCircle size={20} />
                  Оформить заказ в WhatsApp
                </a>
              ) : (
                <button
                  disabled
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gray-300 py-3.5 font-bold text-gray-500"
                >
                  <MessageCircle size={20} />
                  Оформить заказ в WhatsApp
                </button>
              )}

              <p className="mt-2 text-center text-xs text-kissa-olive">
                Заказ уточняется в WhatsApp, оплата на сайте не требуется
              </p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
