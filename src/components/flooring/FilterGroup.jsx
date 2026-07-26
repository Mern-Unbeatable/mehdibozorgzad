import React, { memo } from 'react';
import FilterCheckbox from './FilterCheckbox';

const FilterGroup = memo(({ group, selected, onToggle }) => (
  <div className="flex flex-col gap-5 w-full">
    <p className="font-['Lato'] font-medium text-2xl text-[#1c1916] leading-none">{group.label}</p>
    <div className="flex flex-col gap-4 w-full">
      {group.options.map((option) => (
        <div key={option.id} className="pb-4 border-b border-[#e4e7e9]">
          <FilterCheckbox
            checked={selected.includes(option.id)}
            onChange={() => onToggle(group.id, option.id)}
            label={option.label}
          />
        </div>
      ))}
    </div>
  </div>
));

FilterGroup.displayName = 'FilterGroup';

export default FilterGroup;
