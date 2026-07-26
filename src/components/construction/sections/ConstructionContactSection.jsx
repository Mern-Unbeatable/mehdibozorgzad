import React, { memo } from 'react';
import EnquiryForm from '../../common/EnquiryForm';

const ConstructionContactSection = memo(function ConstructionContactSection() {
  return (
    <section id="get-started" className=" " aria-label="Get Started">
      <div className="container mx-auto px-4 pb-14 md:pb-16 lg:pb-20">
        <div className="overflow-hidden rounded-2xl bg-[#e9ecf2] px-4 py-12 lg:px-32">
          <div className="mb-6 flex flex-col gap-3">
            <h2 className="text-center font-['Playfair_Display'] text-4xl font-semibold text-[#0d0b0a]">
              Get Started
            </h2>
            <p className="text-center font-['Lato'] text-lg leading-normal text-[#6b6b6b]">
              Send us a message or visit our showroom and we&apos;ll help you pick the best COREtec
              Floors for your space!
            </p>
          </div>
          <div className="rounded-xl border border-black/20 bg-white px-6 py-12 lg:px-8">
            <h3 className="mb-8 font-['Playfair_Display'] text-2xl font-semibold text-[#0d0b0a]">
              Contact Us
            </h3>
            <EnquiryForm
              variant="labeled-grid"
              idPrefix="construction-enquiry"
              inputClassName="rounded-lg border border-black/20 px-4 py-5 font-['Lato'] text-base leading-6 text-[#1f1b18] placeholder:text-[#8c8c8c] focus:outline-none focus:ring-2 focus:ring-[#0d0b0a]"
              textareaClassName="flex-1 resize-none rounded-lg border border-black/20 px-4 py-5 font-['Lato'] text-base leading-6 text-[#696664] placeholder:text-[#8c8c8c] focus:outline-none focus:ring-2 focus:ring-[#0d0b0a]"
              buttonClassName="rounded bg-[#0d0b0a] px-6 py-3 font-['Lato'] text-base leading-6 text-white transition-colors hover:bg-[#1c1916] disabled:opacity-60"
              labelClassName="font-['Lato'] text-base leading-6 text-[#1f1b18]"
              commentPlaceholder="Tell us about your project..."
              commentRows={9}
              submitLabel="Submit"
            />
          </div>
        </div>
      </div>
    </section>
  );
});

ConstructionContactSection.displayName = 'ConstructionContactSection';

export default ConstructionContactSection;
