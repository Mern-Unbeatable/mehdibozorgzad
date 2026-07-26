import React, { memo } from 'react';

const SectionHeading = memo(function SectionHeading({ title, desc, center = true }) {
  return (
    <div className={`flex flex-col gap-3 ${center ? 'items-center text-center' : 'items-start'}`}>
      <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#1c1c1c] lg:text-4xl">
        {title}
      </h2>
      {desc && <p className="max-w-xl font-['Lato'] text-base md:text-lg leading-6 text-[#777]">{desc}</p>}
    </div>
  );
});

SectionHeading.displayName = 'SectionHeading';

export default SectionHeading;
