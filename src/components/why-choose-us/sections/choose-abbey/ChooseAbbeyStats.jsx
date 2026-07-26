import React, { memo } from 'react';

const STATS = [
  { value: '25+', label: 'Years Experience' },
  { value: '10k+', label: 'Happy Customers' },
  { value: '100%', label: 'Satisfaction Rate' },
];

const ChooseAbbeyStats = memo(() => (
  <section className="bg-[#f9fafb] py-10 border-b border-[#e5e7eb]">
    <div className="container mx-auto px-4">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 text-center">
        {STATS.map(({ value, label }) => (
          <div key={label} className="flex flex-col gap-1">
            <p className="font-['Playfair_Display'] font-bold text-3xl text-[#0f172b]">{value}</p>
            <p className="text-base text-[#57534d]">{label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
));

ChooseAbbeyStats.displayName = 'ChooseAbbeyStats';

export default ChooseAbbeyStats;
