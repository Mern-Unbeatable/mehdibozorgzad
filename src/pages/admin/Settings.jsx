import { useState, useCallback, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import AdminModal from '../../components/layout/admin/AdminModal';
import ConfirmDeleteModal from '../../components/layout/admin/ConfirmDeleteModal';
import toast from 'react-hot-toast';

const SECTIONS = [
  { key: 'categories', label: 'Category', addLabel: 'Add Category' },
  { key: 'brands', label: 'Brand', addLabel: 'Add Brand' },
  { key: 'formats', label: 'Format', addLabel: 'Add Format' },
  { key: 'colors', label: 'Color', addLabel: 'Add Color' },
  { key: 'shades', label: 'Shade', addLabel: 'Add Shade' },
  { key: 'fibers', label: 'Fiber', addLabel: 'Add Fiber' },
  { key: 'species', label: 'Species', addLabel: 'Add Species' },
  { key: 'installationMethods', label: 'Installation Method', addLabel: 'Add Installation Method' },
];

const Settings = () => {
  const { loading, settings, loadSettings, addItem, deleteItem } = useSettings();

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const [addModal, setAddModal] = useState(null);
  const [addValue, setAddValue] = useState('');
  const [addLoading, setAddLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleAdd = useCallback(async () => {
    if (!addModal || !addValue.trim()) return;

    setAddLoading(true);

    try {
      const { error } = await addItem(addModal.sectionKey, addValue.trim());

      if (error) {
        toast.error(error);
        return;
      }

      toast.success(`${addModal.label} added`);
      setAddModal(null);
      setAddValue('');
    } finally {
      setAddLoading(false);
    }
  }, [addModal, addValue, addItem]);

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return;

    setDeleteLoading(true);
    try {
      const { error } = await deleteItem(deleteTarget.sectionKey, deleteTarget.item.id);

      if (error) {
        toast.error(error);
        return;
      }

      toast.success('Item deleted');
      setDeleteTarget(null);
    } finally {
      setDeleteLoading(false);
    }
  }, [deleteTarget, deleteItem]);

  return (
    <section className="space-y-8">
      <div>
        <h1 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-2xl sm:text-3xl leading-tight">
          Settings
        </h1>
        <p className="mt-1 text-base font-['Lato'] text-[#696664]">
          Manage tags and classification data for your catalogue.
        </p>
      </div>

      {loading && <p className="text-base font-['Lato'] text-[#696664]">Loading...</p>}

      {!loading &&
        SECTIONS.map(({ key, label, addLabel }) => {
          const items = settings[key] ?? [];
          return (
            <div
              key={key}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-lg">
                  {label}
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setAddModal({ sectionKey: key, label });
                    setAddValue('');
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0d0b0a] hover:bg-[#1f1b18] text-white rounded-full text-sm font-medium font-['Lato'] transition-colors cursor-pointer"
                >
                  <Plus size={15} aria-hidden="true" />
                  {addLabel}
                </button>
              </div>
              {items.length === 0 && (
                <p className="text-base font-['Lato'] text-[#696664]">
                  No {label.toLowerCase()} tags yet.
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E9E8E8] text-[#0d0b0a] rounded-full text-sm font-['Lato']"
                  >
                    {item.name}
                    <button
                      type="button"
                      onClick={() => setDeleteTarget({ sectionKey: key, item })}
                      className="text-[#696664] hover:text-red-600 transition-colors cursor-pointer"
                      aria-label={`Remove ${item.name}`}
                    >
                      <X size={13} aria-hidden="true" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          );
        })}

      <AdminModal
        open={!!addModal}
        onClose={() => setAddModal(null)}
        title={`Add ${addModal?.label ?? ''}`}
      >
        <div className="space-y-4">
          <input
            type="text"
            value={addValue}
            onChange={(e) => setAddValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder={`Enter ${addModal?.label?.toLowerCase() ?? ''} name`}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-base font-['Lato'] text-[#0d0b0a] focus:outline-none focus:ring-2 focus:ring-[#0d0b0a]/20 focus:border-[#0d0b0a]"
          />
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => setAddModal(null)}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-base font-['Lato'] text-[#4C4946] hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAdd}
              disabled={addLoading || !addValue.trim()}
              className="px-5 py-2.5 rounded-xl bg-[#0d0b0a] hover:bg-[#1f1b18] text-white text-base font-medium font-['Lato'] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {addLoading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </div>
      </AdminModal>

      <ConfirmDeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleteLoading}
        itemLabel={`the ${deleteTarget?.item?.name ?? 'item'}`}
      />
    </section>
  );
};

export default Settings;
