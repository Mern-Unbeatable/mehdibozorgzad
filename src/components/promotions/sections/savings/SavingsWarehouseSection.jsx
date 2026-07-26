import React, { memo } from 'react';

const SavingsWarehouseSection = memo(({ warehouseImage }) => (
  <section className="relative h-100 overflow-hidden">
    <img
      src={warehouseImage}
      alt="American Carpet & Flooring warehouse"
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)]" aria-hidden="true" />
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 text-center text-white">
      <h2 className="font-['Playfair_Display'] text-2xl font-semibold leading-normal lg:text-[44px]">
        See Inside Our Warehouse
      </h2>
      <p className="max-w-2xl font-['Lato'] text-sm leading-[29.25px] lg:text-[20px]">
        View the flooring options currently available in our warehouse.
      </p>
      <p className="max-w-2xl font-['Lato'] text-sm leading-[29.25px] lg:text-[20px]">
        Inventory changes often, so visit us or contact our team to check availability.
      </p>
    </div>
  </section>
));

SavingsWarehouseSection.displayName = 'SavingsWarehouseSection';

export default SavingsWarehouseSection;
