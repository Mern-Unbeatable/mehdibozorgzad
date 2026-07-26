import React, { memo } from 'react';

const ServiceCard = memo(function ServiceCard({ icon: Icon, title, desc }) {
  return (
    <div className="flex bg-[#FFFFFF] min-h-56 flex-col border border-[rgba(0,0,0,0.1)] bg-white p-6">
      <Icon size={28} className="mb-5 shrink-0 text-[#1c1c1c]" aria-hidden="true" />
      <h3 className="mb-3 font-['Playfair_Display'] text-lg md:text-xl font-bold leading-7 text-[#1c1c1c]">
        {title}
      </h3>
      <p className="font-['Lato'] text-base leading-6 text-[#777]">{desc}</p>
    </div>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;
