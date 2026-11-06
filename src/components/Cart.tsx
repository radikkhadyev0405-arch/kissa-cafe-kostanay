import { useEffect, useMemo, useRef, useState } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, MessageCircle, AlertTriangle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useI18n } from '../context/I18nContext';
import { isComboAvailable } from '../utils/comboTime';
import { whatsappOrderLink } from '../utils/cart';

export function Cart() {
  const { t, locale } = useI18n();
  const { items, total, count, isOpen, openCart, closeCart, removeItem, removeCombos, changeQty, clear, bump, toast } = useCart();
  const [comment, setComment] = useState('');
  const [nowAvailable, setNowAvailable] = useState(isComboAvailable());
  const [comboRemovedMsg, setComboRemovedMsg] = useState(false);
  const lastAvailableRef = useRef(isComboAvailable());

  // Re-check combo availability every minute; auto-remove combos when window closes
  useEffect(() => {
    const check = () => {
      const avail = isComboAvailable();
      setNowAvailable(avail);
      lastAvailableRef.current = avail;
    };
    check();
    const id = window.setInterval(check, 60_000);
    return () => window.clearInterval(id);
  }, []);

  // We need setItems from context to auto-remove; use removeCombos instead
  // Separate effect: when availability flips to false, auto-remove combos
  useEffect(() => {
    if (!nowAvailable) {
      const hasCombo = items.some((i) => i.type === 'combo');
      if (hasCombo) {
        removeCombos();
        setComboRemovedMsg(true);
      }
    }
  }, [nowAvailable, items, removeCombos]);

  // Re-check on open
  useEffect(() => {
    if (isOpen) {
      const avail = isComboAvailable();
      setNowAvailable(avail);
      if (!avail) {
        const hasCombo = items.some((i) => i.type === 'combo');
        if (hasCombo) {
          removeCombos();
          setComboRemovedMsg(true);
        }
      }
    }
  }, [isOpen, items, removeCombos]);

  const hasCombo = items.some((i) => i.type === 'combo');
  const comboBlocked = hasCombo && !nowAvailable;

  const checkoutLink = useMemo(
    () => (comboBlocked ? null : whatsappOrderLink(items, comment)),
    [items, comment, comboBlocked]
  );

  if (count === 0 && !isOpen) return null;

  return (
    <>
      {count > 0 && !isOpen && (
        <button
          onClick={openCart}
          className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-kissa-pink px-5 py-3.5 font-bold text-white shadow-kissa-lg transition-transform hover:scale-105 active:scale-95 ${
            bump ? 'animate-pop' : ''
          }`}
          aria-label={`${t.cart.title}: ${count} ${t.cart.items}, ${total} ₸`}
        >
          <ShoppingBag size={22} />
          <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-1.5 text-sm text-kissa-pink">
            {count}
          </span>
          <span className="font-display text-base font-black">{total} ₸</span>
        </button>
      )}

      {toast && !isOpen && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-kissa-green px-5 py-2.5 text-sm font-bold text-white shadow-kissa-lg">
          {toast}
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/40"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed z-[70] flex max-h-full flex-col bg-kissa-cream shadow-kissa-lg transition-transform duration-300 ${
          isOpen ? 'translate-y-0 translate-x-0' : 'translate-y-full sm:translate-x-full sm:translate-y-0'
        } inset-x-0 bottom-0 max-h-[90vh] rounded-t-kissa-lg sm:inset-y-0 sm:right-0 sm:left-auto sm:w-[420px] sm:max-h-none sm:rounded-l-kissa-lg`}
        role="dialog"
        aria-label={t.cart.title}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b-2 border-kissa-pink-light p-5">
          <h2 className="font-display text-lg font-black uppercase text-kissa-green">{t.cart.title}</h2>
          <button
            onClick={closeCart}
            className="rounded-full p-2 text-kissa-green transition-colors hover:bg-kissa-pink-light"
            aria-label={t.cart.close}
          >
            <X size={22} />
          </button>
        </div>

        {comboRemovedMsg && (
          <div className="mx-4 mt-4 flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-sm font-semibold text-amber-700">
            <AlertTriangle size={18} className="mt-0.5 flex-shrink-0" />
            {t.cart.comboRemoved}
            <button
              onClick={() => setComboRemovedMsg(false)}
              className="ml-auto flex-shrink-0 text-amber-700 hover:text-amber-900"
              aria-label={t.cart.close}
            >
              <X size={16} />
            </button>
          </div>
        )}

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <ShoppingBag size={48} className="text-kissa-pink-light" />
            <p className="font-semibold text-kissa-green">{t.cart.empty}</p>
            <button
              onClick={closeCart}
              className="mt-2 rounded-full bg-kissa-pink px-5 py-2.5 font-bold text-white"
            >
              {t.cart.backToMenu}
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
                        {item.name[locale]}
                      </p>
                      <p className="mt-0.5 text-xs text-kissa-olive">{item.details[locale]}</p>
                      <p className="mt-1 font-display text-base font-black text-kissa-pink">
                        {item.price * item.qty} ₸
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.key)}
                      className="rounded-full p-1.5 text-kissa-green/50 transition-colors hover:bg-kissa-pink-light hover:text-kissa-pink"
                      aria-label={`${t.cart.remove}: ${item.name[locale]}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => changeQty(item.key, -1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-kissa-pink-light text-kissa-pink transition-transform active:scale-90"
                        aria-label={t.cart.decrease}
                      >
                        <Minus size={16} strokeWidth={3} />
                      </button>
                      <span className="w-6 text-center font-bold text-kissa-green">{item.qty}</span>
                      <button
                        onClick={() => changeQty(item.key, 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-kissa-pink text-white transition-transform active:scale-90"
                        aria-label={t.cart.increase}
                      >
                        <Plus size={16} strokeWidth={3} />
                      </button>
                    </div>
                    <span className="text-xs text-kissa-olive">{item.price} ₸ × {item.qty}</span>
                  </div>
                </div>
              ))}

              <button
                onClick={clear}
                className="w-full rounded-full border-2 border-kissa-pink-light py-2.5 text-sm font-bold text-kissa-green/70 transition-colors hover:border-kissa-pink hover:text-kissa-pink"
              >
                {t.cart.clear}
              </button>
            </div>

            <div className="border-t-2 border-kissa-pink-light p-4">
              {comboBlocked && (
                <div className="mb-3 flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-sm font-semibold text-amber-700">
                  <AlertTriangle size={18} className="mt-0.5 flex-shrink-0" />
                  {t.cart.comboBlocked}
                </div>
              )}

              <label className="mb-1 block text-xs font-bold uppercase text-kissa-olive">
                {t.cart.comment}
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={2}
                placeholder={t.cart.commentPlaceholder}
                className="mb-3 w-full resize-none rounded-2xl border-2 border-kissa-pink-light bg-white px-3 py-2 text-sm text-kissa-green placeholder:text-kissa-green/40 focus:border-kissa-pink focus:outline-none"
              />

              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-bold uppercase text-kissa-olive">{t.cart.total}</span>
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
                  {t.cart.checkout}
                </a>
              ) : (
                <button
                  disabled
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gray-300 py-3.5 font-bold text-gray-500"
                >
                  <MessageCircle size={20} />
                  {t.cart.checkout}
                </button>
              )}

              <p className="mt-2 text-center text-xs text-kissa-olive">
                {t.cart.checkoutNote}
              </p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
