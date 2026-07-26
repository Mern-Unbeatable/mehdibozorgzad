import React, { memo } from 'react';
import { Check, ShieldCheck } from 'lucide-react';

const DISCLAIMER =
  '*Replacement is limited to one exchange per purchase. Comparable product must be of equal or lesser value. Labor is included. Additional charges may apply for upgrades.';

const SixtyDayGuaranteeContent = memo(() => (
  <div className="bg-white">
    {/* Hero — centered */}
    <section className="py-14 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 flex flex-col items-center text-center gap-6">
        <div className="bg-[#4c4946] rounded-full size-23 flex items-center justify-center shrink-0">
          <Check className="w-12 h-12 text-white" strokeWidth={2.5} aria-hidden="true" />
        </div>
        <h1 className="font-['Playfair_Display'] font-semibold text-3xl md:text-[48px] leading-tight text-[#0f172b] max-w-2xl">
          60-Day Satisfaction Guarantee
        </h1>
        <p className="text-base text-[#57534d] leading-7 max-w-xl">
          We&apos;re so confident in the quality of our products and installation that we back every
          purchase with our industry-leading 60-Day Satisfaction Guarantee.
        </p>
      </div>
    </section>

    {/* Two Cards */}
    <section className="pb-16 lg:pb-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Carpet Card */}
          <div className="rounded-2xl overflow-hidden border border-[#e2e8f0]">
            <div className="bg-linear-to-br from-[#2b7fff] to-[#155dfc] p-8">
              <h2 className="font-['Playfair_Display'] font-semibold text-[28px] text-white leading-tight">
                Carpet
              </h2>
            </div>
            <div className="p-8 flex flex-col gap-4">
              <p className="text-base text-[#314158] leading-7">
                If you are not completely satisfied with your Abbey Carpet purchase within 60 days
                of installation, we will replace it with a comparable product of equal value at no
                charge — including labor.
              </p>
              <p className="text-base text-[#314158] leading-7">
                Our 60-Day Satisfaction Guarantee covers all Abbey Carpet products installed by our
                certified installation teams. Simply contact your local Abbey Carpet &amp; Floor
                dealer and we will make it right.
              </p>
              <hr className="border-[#e2e8f0] my-2" />
              <p className="text-sm text-[#64748b] leading-6">{DISCLAIMER}</p>
            </div>
          </div>

          {/* Hard Surface Card */}
          <div className="rounded-2xl overflow-hidden border border-[#e2e8f0]">
            <div className="bg-linear-to-br from-[#314158] to-[#1d293d] p-8">
              <h2 className="font-['Playfair_Display'] font-semibold text-[28px] text-white leading-tight">
                Hard Surface
              </h2>
            </div>
            <div className="p-8 flex flex-col gap-4">
              <p className="text-base text-[#314158] leading-7">
                Not happy with your hard surface flooring? Within 60 days of installation, we&apos;ll
                replace it — no questions asked. Our hard surface guarantee covers hardwood,
                laminate, luxury vinyl plank, and tile flooring installed by our professional teams.
              </p>
              <div className="bg-[#fefce8] border border-[#fef08a] rounded-xl p-4">
                <p className="text-base text-[#854d0e] font-semibold leading-7">
                  FREE replacement including labor — because your satisfaction is our priority.
                </p>
              </div>
              <hr className="border-[#e2e8f0] my-2" />
              <p className="text-sm text-[#64748b] leading-6">{DISCLAIMER}</p>
            </div>
          </div>
        </div>

        {/* Protected Badge */}
        <div className="flex justify-center mt-10">
          <button
            type="button"
            className="bg-[#0d0b0a] text-white flex items-center gap-3 px-8 py-4 rounded-full cursor-pointer hover:bg-[#1f1b18] transition-colors"
          >
            <ShieldCheck className="w-6 h-6 text-white shrink-0" aria-hidden="true" />
            <span className="font-['Lato'] font-medium text-base">
              Protected by Abbey&apos;s Satisfaction Guarantee
            </span>
          </button>
        </div>
      </div>
    </section>
  </div>
));

SixtyDayGuaranteeContent.displayName = 'SixtyDayGuaranteeContent';

export default SixtyDayGuaranteeContent;
