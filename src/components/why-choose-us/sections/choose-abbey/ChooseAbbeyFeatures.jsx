import React, { memo } from 'react';
import { Shield, Award, Star, Check, CircleCheck } from 'lucide-react';

const CHECKLIST = [
  'Quality Flooring',
  'Expert Installation',
  'Exceptional Service',
  'Industry Guarantees',
];

const FEATURES = [
  {
    icon: Shield,
    iconColor: 'text-[#2563eb]',
    label: 'Certified',
    desc: 'Industry certified installers',
    bg: 'bg-[#eff6ff]',
  },
  {
    icon: Award,
    iconColor: 'text-[#7c3aed]',
    label: 'Guaranteed',
    desc: '100% satisfaction promise',
    bg: 'bg-[#f5f3ff]',
  },
  {
    icon: Star,
    iconColor: 'text-[#d97706]',
    label: 'Rated 5-Star',
    desc: 'Top customer reviews',
    bg: 'bg-[#fefce8]',
  },
  {
    icon: Check,
    iconColor: 'text-[#16a34a]',
    label: 'Trusted',
    desc: 'Since 2001',
    bg: 'bg-[#f0fdf4]',
  },
];

const ChooseAbbeyFeatures = memo(() => (
  <section className="py-14 md:py-16 lg:py-20">
    <div className="container mx-auto px-4">
      <div className="border border-[#00000033] rounded-2xl p-8 lg:p-12">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          {/* Left */}
          <div className="lg:w-1/2 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="font-['Playfair_Display'] font-semibold text-[32px] md:text-[40px] leading-tight text-[#0f172b]">
                Why Choose Us?
              </h2>
              <p className="text-base md:text-lg text-[#57534d] font-normal font-['Lato']">
                Peace of Mind Guarantee
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {CHECKLIST.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CircleCheck className="w-5 h-5 shrink-0 text-[#3b82f6] fill-[#dbeafe]" aria-hidden="true" />
                  <p className="text-base md:text-lg text-[#57534d] font-medium leading-normal font-['Lato']">{item}</p>
                </div>
              ))}
            </div>
            <p className="text-base text-[#57534d] leading-7 font-['Lato']">
              All of our installers must meet national certification requirements from leading Affordable Flooring
              Manufacturers and pass strict evaluation of our performance standards.
            </p>
          </div>
          {/* Right Grid */}
          <div className="lg:w-1/2 grid grid-cols-2 gap-4 lg:gap-6 w-full">
            {FEATURES.map((item) => (
              <div
                key={item.label}
                className={`${item.bg} rounded-2xl p-6 flex flex-col gap-4 items-start text-left`}
              >
                <item.icon className={`w-8 h-8 ${item.iconColor}`} />
                <div className="flex flex-col gap-1">
                  <h3 className="font-['Playfair_Display'] font-semibold text-xl text-[#0f172b]">
                    {item.label}
                  </h3>
                  <p className="text-sm text-[#57534d] leading-normal font-['Lato']">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
));

ChooseAbbeyFeatures.displayName = 'ChooseAbbeyFeatures';

export default ChooseAbbeyFeatures;
