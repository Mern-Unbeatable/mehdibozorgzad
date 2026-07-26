import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { MoreVertical, Eye, Trash2, Pencil } from 'lucide-react';

const MENU_WIDTH = 176;
const MENU_HEIGHT = 140;
const MENU_GAP = 4;

const ActionDropdown = ({ onSeeDetails, onEdit, onDelete, seeDetailsLabel = 'See Details' }) => {
  const [open, setOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const updateMenuPosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUpward = spaceBelow < MENU_HEIGHT + MENU_GAP + 8;

    let top = openUpward ? rect.top - MENU_HEIGHT - MENU_GAP : rect.bottom + MENU_GAP;
    let left = rect.right - MENU_WIDTH;

    left = Math.max(8, Math.min(left, window.innerWidth - MENU_WIDTH - 8));
    top = Math.max(8, Math.min(top, window.innerHeight - MENU_HEIGHT - 8));

    setMenuStyle({
      position: 'fixed',
      top,
      left,
      width: MENU_WIDTH,
      zIndex: 9999,
    });
  }, []);

  const closeMenu = useCallback(() => setOpen(false), []);

  const toggleMenu = useCallback(() => {
    setOpen((current) => !current);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    updateMenuPosition();

    const handleOutsideClick = (event) => {
      const target = event.target;
      if (
        triggerRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }
      closeMenu();
    };

    const handleReposition = () => updateMenuPosition();

    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition, true);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition, true);
    };
  }, [open, closeMenu, updateMenuPosition]);

  const menu =
    open && menuStyle
      ? createPortal(
          <div
            ref={menuRef}
            style={menuStyle}
            className="rounded-xl border border-gray-100 bg-white shadow-lg overflow-hidden animate-[modalIn_0.15s_ease-out]"
            role="menu"
          >
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                closeMenu();
                onSeeDetails?.();
              }}
              className="flex w-full items-center gap-2.5 px-4 py-3 text-base font-['Lato'] text-[#0d0b0a] hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <Eye size={16} aria-hidden="true" className="text-[#696664]" />
              {seeDetailsLabel}
            </button>
            {onEdit ? (
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  closeMenu();
                  onEdit();
                }}
                className="flex w-full items-center gap-2.5 px-4 py-3 text-base font-['Lato'] text-[#0d0b0a] hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Pencil size={16} aria-hidden="true" className="text-[#696664]" />
                Edit
              </button>
            ) : null}
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                closeMenu();
                onDelete?.();
              }}
              className="flex w-full items-center gap-2.5 px-4 py-3 text-base font-['Lato'] text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <Trash2 size={16} aria-hidden="true" />
              Delete
            </button>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={toggleMenu}
        aria-label="Row actions"
        aria-haspopup="true"
        aria-expanded={open}
        className="p-1.5 rounded-lg text-[#696664] hover:text-[#0d0b0a] hover:bg-gray-100 transition-colors cursor-pointer"
      >
        <MoreVertical size={18} aria-hidden="true" />
      </button>
      {menu}
    </>
  );
};

export default ActionDropdown;
