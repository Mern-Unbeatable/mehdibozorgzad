import React, { memo } from 'react';
import { BadgeCheck, Check } from 'lucide-react';

const CommitmentSection = memo(({ offers }) => (
  <section className="py-4 pb-14 md:pb-16 lg:pb-20">
    <div className="container mx-auto px-4">
      <div className="rounded-2xl border border-[#bdbcbc] p-8 lg:p-12">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 text-center">
            <p className="text-sm uppercase tracking-[4.2px] text-[#57534d]">Our Commitment</p>
            <h2 className="font-['Playfair_Display'] text-3xl font-semibold leading-tight text-[#0f172b] md:text-4xl">
              American Carpet &amp; Flooring Offers:
            </h2>
          </div>
          <div className="flex flex-col divide-y divide-[#e2e8f0]">
            {offers.map((item) => (
              <div key={item} className="flex items-center gap-4 py-4">
                <BadgeCheck className="h-5 w-5 shrink-0 text-[#0f172b]" aria-hidden="true" />
                <p className="text-base leading-7 text-[#314158]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
));

CommitmentSection.displayName = 'CommitmentSection';

export default CommitmentSection;
