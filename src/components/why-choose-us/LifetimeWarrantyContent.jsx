import React, { memo } from 'react';
import { ShieldCheck, Sparkles, ClipboardList } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Introduction', href: '#introduction' },
  { label: 'Collections', href: '#collections' },
  { label: 'Homeowner Obligations', href: '#obligations' },
  { label: 'Stain Warranty', href: '#stain' },
  { label: 'Soil Warranty', href: '#soil' },
  { label: 'Abrasive Wear Warranty', href: '#wear' },
  { label: 'Filing a Claim', href: '#claim' },
];

const COLLECTIONS = [
  'Alexander Smith',
  'American Showcase',
  'Pet Defense',
  'Infinity',
  'Legendary Beauty',
];

const INTRO_PARAGRAPHS = [
  'Abbey Carpet & Floor is proud to offer an exclusive lifetime warranty program on select carpet collections. This program is designed to give you complete confidence in your flooring investment.',
  'Our warranty covers staining, soiling, and abrasive wear for the life of your carpet ownership — one of the most comprehensive coverage programs available in the industry.',
  'To maintain your warranty coverage, regular professional cleaning is required. Please review the terms carefully to ensure you meet all obligations.',
  'This warranty applies to residential, owner-occupied installations only and is non-transferable.',
];

const HOMEOWNER_STEPS = [
  'Make sure you know which warranties apply to your particular carpet.',
  'Keep proof of purchase in the form of a bill, invoice, or statement from your Abbey Carpet & Floor dealer, showing the price you paid for the carpet, excluding labor.',
  'Show proof of periodic cleaning by a certified professional cleaning service. A bill, invoice, or statement showing cleaning service will serve as proof of cleaning.',
];

const WarrantySection = ({ id, title, body1, body2, exclusionTitle, exclusionText }) => (
  <div id={id} className="bg-white rounded-2xl p-8 lg:p-10">
    <div className="flex items-center gap-3 mb-6">
      <ShieldCheck className="w-6 h-6 text-[#0f172b] shrink-0" aria-hidden="true" />
      <h2 className="font-['Playfair_Display'] font-semibold text-lg  md:text-2xl text-[#0f172b] leading-tight">
        {title}
      </h2>
    </div>
    <p className="text-base text-[#314158] leading-7 mb-4">{body1}</p>
    {body2 && <p className="text-base text-[#314158] leading-7 mb-8">{body2}</p>}
    <h3 className="font-['Playfair_Display'] font-semibold text-2xl text-[#0f172b] mb-4">
      {exclusionTitle}
    </h3>
    <p className="text-base text-[#314158] leading-7 mb-6">{exclusionText}</p>
    <div className="bg-[#fef2f2] border-l-4 border-[#ff6467] pl-5 py-4 pr-4">
      <p className="text-[#314158] text-base leading-normal">
        Cleaning the affected area should begin immediately upon discovery. The more time that
        elapses before removal, the more difficult a stain will be to remove.
      </p>
    </div>
  </div>
);

const LifetimeWarrantyContent = memo(() => (
  <div className="bg-[#f3f3f3] min-h-screen">
    <div className="container mx-auto px-4 py-12 lg:py-20">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar */}
        <aside className="w-full lg:w-65 lg:sticky lg:top-30 bg-[#f3f3f3] rounded-xl p-6 flex flex-col gap-3 border border-[#e5e5e5]">
          <p className="font-['Lato'] font-semibold text-sm text-[#4c4946] uppercase tracking-wider mb-2">
            Quick Navigation
          </p>
          {NAV_ITEMS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-base text-[#314158] hover:text-[#155dfc] transition-colors cursor-pointer leading-relaxed"
            >
              {label}
            </a>
          ))}
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Introduction */}
          <div id="introduction" className="bg-[#1f1b18] rounded-2xl p-8 lg:p-10">
            <h1 className="font-['Playfair_Display'] font-semibold text-2xl md:text-[32px] text-white mb-6 leading-tight">
              Beautiful, Long-Lasting, Affordable Carpet
            </h1>
            <div className="flex flex-col gap-4">
              {INTRO_PARAGRAPHS.map((text) => (
                <p key={text} className="text-base text-[#a8bbd4] leading-7">
                  {text}
                </p>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div id="collections" className="bg-white rounded-2xl p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-[#0f172b] shrink-0" aria-hidden="true" />
              <h2 className="font-['Playfair_Display'] font-semibold text-2xl text-[#0f172b]">
                Exclusive Carpet Collections
              </h2>
            </div>
            <p className="text-base text-[#314158] leading-7 mb-6">
              The Abbey Lifetime Warranty applies to the following exclusive Abbey Carpet
              collections:
            </p>
            <div className="flex flex-wrap gap-3">
              {COLLECTIONS.map((name) => (
                <span
                  key={name}
                  className="bg-[#f1f5f9] border border-[#e2e8f0] text-[#314158] text-sm px-4 py-2 rounded-lg"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          {/* Homeowner Obligations */}
          <div id="obligations" className="bg-white rounded-2xl p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-6">
              <ClipboardList className="w-8 h-8 text-[#0f172b] shrink-0" aria-hidden="true" />
              <h2 className="font-['Playfair_Display'] font-semibold text-2xl text-[#0f172b]">
                Homeowner Obligation
              </h2>
            </div>
            <div className="bg-[#fefce8] border border-[#fef08a] rounded-xl p-5 mb-6">
              <p className="text-base text-[#854d0e] leading-7 font-medium">
                To maintain warranty coverage, homeowners must fulfill the following obligations.
                Failure to comply may void your warranty.
              </p>
            </div>
            <div className="flex flex-col gap-4 mb-6">
              {HOMEOWNER_STEPS.map((text, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="shrink-0 bg-[#dbeafe] flex items-center justify-center rounded-full size-8">
                    <span className="font-semibold text-[#155dfc] text-base">{i + 1}</span>
                  </div>
                  <p className="text-base text-[#314158] leading-7">{text}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#eff6ff] border border-[#bedbff] rounded-xl p-6">
              <p className="text-base text-[#314158] leading-7 mb-3">
                In order to maintain and protect your coverage under the terms of these warranties,
                you must do the following:
              </p>
              <p className="text-[#1c398e] text-base leading-relaxed">
                A minimum of one professional cleaning every 18 months is required using cleaning
                products, equipment, or systems that carry the Carpet &amp; Rug Institute Seal of
                Approval.
              </p>
              <p className="text-[#45556c] text-base mt-3">
                Visit{' '}
                <a
                  href="https://www.carpet-rug.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#155dfc] hover:underline cursor-pointer"
                >
                  www.carpet-rug.org
                </a>{' '}
                for a complete list of certified products.
              </p>
            </div>
          </div>

          {/* Filing a Claim */}
          <div id="claim" className="bg-white rounded-2xl p-8 lg:p-10">
            <h2 className="font-['Playfair_Display'] font-semibold text-[28px] text-[#0f172b] mb-6">
              Filing a Claim
            </h2>
            <div className="bg-[#f8fafc] rounded-xl p-6">
              <p className="text-base text-[#314158] leading-7 mb-4">
                Notify your Abbey Carpet &amp; Floor dealer in writing. Be sure to describe the
                specific problem, and to include a copy of your invoice. You must also provide the
                proof of proper maintenance with invoices from a professional carpet cleaning
                company at intervals described in the warranties.
              </p>
              <p className="font-medium text-base text-[#314158]">
                Your Abbey Carpet &amp; Floor dealer will take appropriate action.
              </p>
            </div>
          </div>

          {/* Stain Warranty */}
          <WarrantySection
            id="stain"
            title="LIMITED LIFETIME STAIN WARRANTY"
            body1="Abbey Carpet & Floor warrants that your Infinity, Alexander Smith, American Showcase, Pet Defense or Legendary Beauty carpeting will remain stain resistant to most household food beverage substances from the date of the original installation in an owner-occupied residence in a proper indoor installation for as long as you own your carpet. This warranty coverage runs from the date your carpet is installed for as long as you own it (non-transferable)."
            body2={null}
            exclusionTitle="Limited Lifetime Stain Warranty Exclusions:"
            exclusionText="This Limited Lifetime Stain Warranty specifically excludes stains from substances such as bleaches, caustic chemicals, insecticides, paints, shoe polish, lipstick, plant food, iodine, very strong dyes, acids, feces, oil-based substances, and vomit. Also specifically excluded: any carpet which has been treated after installation with any silicone-based anti-soil treatments; any carpet in any nonresidential use; any carpet subjected to abnormal abuse; damage due to the application of improper cleaning agents; deterioration in appearance not related to staining of pile fibers. This warranty is voided if you fail to follow recommended carpet care and cleaning instructions."
          />

          {/* Soil Warranty */}
          <WarrantySection
            id="soil"
            title="LIMITED LIFETIME SOIL WARRANTY"
            body1="Abbey Carpet & Floor warrants that your Infinity, Alexander Smith, American Showcase, Pet Defense or Legendary Beauty carpeting will resist soiling by most common household soil. If you properly maintain our carpet, soil will clean up more thoroughly, and less residue will remain on your carpet. This warranty coverage runs from the date your carpet is installed for as long as you own it (non-transferable)."
            body2="Soil resistance means the ability of your carpet to resist (i.e. minimize or withstand) retention of the common dry dirt normally associated with carpet. Keep in mind, light-colored carpets will show soiling more than darker colors and will require more frequent maintenance to retain their appearance."
            exclusionTitle="Limited Lifetime Soil Warranty Exclusions:"
            exclusionText="Any carpet which has been treated after installation with any silicone-based anti-soil treatments; any carpet in any nonresidential use; any carpet subjected to abnormal abuse; any carpet exposed to very hot substances or other abusive conditions; damage due to the application of improper cleaning agents; deterioration in appearance not related to staining of pile fibers. This warranty is voided if you fail to follow recommended carpet care and cleaning instructions."
          />

          {/* Abrasive Wear Warranty */}
          <div id="wear" className="bg-white rounded-xl p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="w-6 h-6 text-[#0f172b] shrink-0" aria-hidden="true" />
              <h2 className="font-['Playfair_Display'] font-semibold text-lg  md:text-2xl text-[#0f172b] leading-tight">
                LIMITED LIFETIME ABRASIVE WEAR WARRANTY
              </h2>
            </div>
            <p className="text-base text-[#314158] leading-7 mb-4">
              Abbey Carpet &amp; Floor warrants that your Infinity, Alexander Smith, American
              Showcase, Pet Defense or Legendary Beauty carpeting will not abrasively wear away by
              more than 10% in any area of the carpet when used in an owner-occupied residence in a
              proper indoor installation from the date of the original installation for as long as
              you own your carpet (non-transferable).
            </p>
            <p className="text-base text-[#314158] leading-7 mb-8">
              Proper installation requires use of a suitable pad with a thickness of 7/16&quot; or
              less and minimum 6-lb density, following the Carpet &amp; Rug Institute Installation
              Standards effective October 1, 2009. Consult your Abbey Carpet &amp; Floor retailer
              for details. Abrasive wear means fiber loss, and not changes in appearance such as
              crushing or matting.
            </p>
            <h3 className="font-['Playfair_Display'] font-semibold text-2xl text-[#0f172b] mb-4">
              Limited Lifetime Abrasive Wear Warranty Exclusions:
            </h3>
            <p className="text-base text-[#314158] leading-7">
              Carpet installed outdoors or in areas subject to other than ordinary shoe traffic is
              excluded from this warranty. Crushing caused by furniture, including impressions left
              by legs of furniture, is not covered by this warranty.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
));

LifetimeWarrantyContent.displayName = 'LifetimeWarrantyContent';

export default LifetimeWarrantyContent;
