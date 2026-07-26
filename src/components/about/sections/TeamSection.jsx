import React, { memo } from 'react';
import { Check, CircleCheckBig } from 'lucide-react';

const TeamSection = memo(({ teamItems }) => (
  <section className="py-4">
    <div className="container mx-auto px-4">
      <div className="rounded-2xl border border-[#bdbcbc] p-8 lg:p-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          <div className="flex flex-col gap-5 lg:w-1/2">
            <p className="text-sm uppercase tracking-[4.2px] text-[#57534d]">Excellence</p>
            <h2 className="font-['Playfair_Display'] text-[32px] font-semibold leading-tight text-[#0f172b] md:text-[40px]">
              Our Team
            </h2>
            <p className="text-base leading-7 text-[#314158]">
              Our team of flooring specialists and remodeling professionals brings decades of
              combined experience to every project. We stay current with the latest trends,
              materials, and installation techniques to ensure you receive the highest quality
              results.
            </p>
            <p className="text-base leading-7 text-[#314158]">
              From the moment you walk into our showroom to the final installation, you&apos;ll work
              with dedicated professionals who are committed to exceeding your expectations.
            </p>
          </div>
          <div className="flex flex-col gap-5 lg:w-1/2">
            <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#0f172b]">
              What sets us apart
            </h3>
            <div className="flex flex-col gap-4">
              {teamItems.map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <CircleCheckBig className="mt-1 h-5 w-5 shrink-0 text-[#0f172b]" aria-hidden="true" />
                  <p className="text-base leading-7 text-[#314158]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
));

TeamSection.displayName = 'TeamSection';

export default TeamSection;
