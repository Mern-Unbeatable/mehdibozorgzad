import React, { memo } from 'react';
import FilterGroup from './FilterGroup';

const FilterSidebar = memo(({ filterGroups, filters, onToggle }) => (
  <aside className="flex flex-col gap-8 w-full" aria-label="Product filters">
    <h2 className="font-['Playfair_Display'] font-semibold text-[28px] text-[#0d0b0a] leading-normal">
      Products
    </h2>
    {filterGroups.map((group) => (
      <FilterGroup
        key={group.id}
        group={group}
        selected={filters[group.id] || []}
        onToggle={onToggle}
      />
    ))}
  </aside>
));

FilterSidebar.displayName = 'FilterSidebar';

export default FilterSidebar;
