import React, { memo } from 'react';

const RemodelingProcessSection = memo(function RemodelingProcessSection({ steps }) {
  return (
    <section className="pt-14 md:pt-16 lg:pt-20" aria-label="Our Remodeling Process">
      <div className="container mx-auto px-4">
        <h2 className="mb-10 text-center font-['Playfair_Display'] text-3xl font-bold text-[#1c1c1c] lg:text-4xl">
          Our Remodeling Process
        </h2>
      </div>
      <div className="bg-[#1c1c1c] px-4 py-14 md:py-16 lg:py-20">
        <div className="container mx-auto px-0 lg:px-4">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col gap-2.5 rounded-lg bg-[#232323] p-4">
                <span className="font-['Playfair_Display'] text-8xl font-semibold leading-none text-[rgba(255,255,255,0.1)]">
                  {step}
                </span>
                <div className="flex flex-col gap-1.5 text-white">
                  <h3 className="font-['Playfair_Display'] text-xl font-bold leading-7">{title}</h3>
                  <p className="font-['Lato'] text-base leading-6">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

RemodelingProcessSection.displayName = 'RemodelingProcessSection';

export default RemodelingProcessSection;
