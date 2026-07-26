import React, { memo } from 'react';

const CulinaryLuxurySection = memo(function CulinaryLuxurySection({ image }) {
  return (
    <section className="relative h-143 overflow-hidden" aria-label="Culinary Luxury">
      <img src={image} alt="Luxury kitchen interior" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.3)]" aria-hidden="true" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="flex flex-col gap-4">
              <h2 className="font-['Playfair_Display'] text-4xl font-semibold leading-tight text-white lg:text-[52px]">
                Culinary Luxury
              </h2>
              <p className="mx-auto max-w-lg font-['Lato'] text-base md:text-lg leading-6 text-[rgba(255,255,255,0.8)] lg:text-lg">
                Custom-designed kitchens that blend aesthetic brilliance with industrial-grade
                efficiency.
              </p>
            </div>
            <div className="flex items-center gap-12 rounded-xl bg-[rgba(0,0,0,0.5)] px-6 py-3 lg:gap-16">
              {[
                { label: 'Premium', sub: 'Material' },
                { label: 'Custom', sub: 'Design' },
                { label: 'Expert', sub: 'Installation' },
              ].map(({ label, sub }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <span className="font-['Lato'] text-2xl font-medium text-[rgba(255,204,0,0.8)]">
                    {label}
                  </span>
                  <span className="font-['Lato'] text-base text-[rgba(255,255,255,0.8)]">{sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

CulinaryLuxurySection.displayName = 'CulinaryLuxurySection';

export default CulinaryLuxurySection;
