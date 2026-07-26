import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

/**
 * Animated modal following the Figma admin design pattern.
 * Backdrop: semi-transparent dark overlay.
 * Panel: white, rounded-xl, drop shadow, animated scale+fade.
 * Props:
 *  - open: boolean
 *  - onClose: () => void
 *  - title: string
 *  - children: ReactNode
 *  - maxWidth: string (tailwind class, default 'max-w-lg')
 */
const AdminModal = ({ open, onClose, title, children, maxWidth = 'max-w-lg' }) => {
  const overlayRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 animate-[fadeIn_0.15s_ease-out]"
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`relative w-full ${maxWidth} bg-white rounded-xl shadow-2xl animate-[modalIn_0.2s_ease-out] overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-xl leading-tight">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
};

export default AdminModal;
