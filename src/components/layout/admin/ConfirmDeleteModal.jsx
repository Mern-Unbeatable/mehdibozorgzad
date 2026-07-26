import { AlertTriangle } from 'lucide-react';
import AdminModal from './AdminModal';

/**
 * Professional delete confirmation modal.
 * Props:
 *  - open: boolean
 *  - onClose: () => void
 *  - onConfirm: () => void
 *  - loading: boolean
 *  - itemLabel: string (e.g. "this enquiry", "this product") — optional
 */
const ConfirmDeleteModal = ({
  open,
  onClose,
  onConfirm,
  loading = false,
  itemLabel = 'this item',
}) => (
  <AdminModal open={open} onClose={onClose} title="Confirm Deletion" maxWidth="max-w-md">
    <div className="flex flex-col items-center text-center gap-4">
      <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center shrink-0">
        <AlertTriangle size={28} className="text-red-500" aria-hidden="true" />
      </div>

      <div>
        <p className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-lg leading-snug">
          Are you sure you want to delete?
        </p>
        <p className="mt-1.5 text-base font-['Lato'] text-[#696664]">
          You are about to permanently delete {itemLabel}. This action cannot be undone.
        </p>
      </div>

      <div className="flex gap-3 w-full pt-1">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="flex-1 py-2.5 px-4 rounded-lg border border-[#0d0b0a] text-[#0d0b0a] text-base font-medium font-['Lato'] hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={loading}
          className="flex-1 py-2.5 px-4 rounded-lg bg-[#0d0b0a] text-white text-base font-medium font-['Lato'] hover:bg-[#1f1b18] transition-colors cursor-pointer disabled:opacity-70"
        >
          {loading ? 'Deleting…' : 'Delete'}
        </button>
      </div>
    </div>
  </AdminModal>
);

export default ConfirmDeleteModal;
