import React, { memo } from 'react';
import { Check } from 'lucide-react';

const FilterCheckbox = memo(({ checked, onChange, label }) => (
  <button
    type="button"
    role="checkbox"
    aria-checked={checked}
    onClick={onChange}
    className="flex items-center gap-2 cursor-pointer w-full text-left"
  >
    <span
      className={`shrink-0 size-4.5 rounded-sm border flex items-center justify-center transition-colors ${
        checked ? 'bg-[#5627ff] border-[#5627ff]' : 'bg-white border-black'
      }`}
      aria-hidden="true"
    >
      {checked && <Check size={11} color="white" strokeWidth={3} aria-hidden="true" />}
    </span>
    <span
      className={`font-['Lato'] font-medium text-base leading-none whitespace-nowrap ${
        checked ? 'text-[#1f1b18]' : 'text-[#0d0b0a]'
      }`}
    >
      {label}
    </span>
  </button>
));

FilterCheckbox.displayName = 'FilterCheckbox';

export default FilterCheckbox;
