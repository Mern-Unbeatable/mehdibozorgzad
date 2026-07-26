import React, { memo } from 'react';
import { X } from 'lucide-react';

const FlooringMobileFiltersDrawer = memo(
  ({ isOpen, onClose, hasActiveFilters, onClearAll, filterGroups, filters, onToggle, FilterSidebar }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
        <button
          type="button"
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
          aria-label="Close filters"
        />
        <div className="relative ml-auto flex h-full w-80 max-w-full flex-col gap-6 overflow-y-auto bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-['Playfair_Display'] text-[28px] font-semibold text-[#0d0b0a]">
              Filters
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close filters"
              className="rounded p-2 transition-colors hover:bg-gray-100"
            >
              <X size={20} className="text-[#1c1916]" aria-hidden="true" />
            </button>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearAll}
              className="self-start font-['Lato'] text-sm text-[#5627ff] underline underline-offset-2 hover:text-[#3d0fcf]"
            >
              Clear all
            </button>
          )}

          <FilterSidebar filterGroups={filterGroups} filters={filters} onToggle={onToggle} />
        </div>
      </div>
    );
  },
);

FlooringMobileFiltersDrawer.displayName = 'FlooringMobileFiltersDrawer';

export default FlooringMobileFiltersDrawer;
