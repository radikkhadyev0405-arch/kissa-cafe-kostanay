import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="w-full max-w-md rounded-t-kissa-lg bg-white p-5 shadow-kissa-lg sm:rounded-kissa-lg sm:p-6"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'slideUp 0.3s ease-out both' }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-extrabold uppercase text-kissa-green sm:text-xl">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-kissa-green transition-colors hover:bg-kissa-pink-light"
            aria-label="Закрыть"
          >
            <X size={22} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
