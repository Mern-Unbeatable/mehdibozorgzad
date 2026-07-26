import React, { memo } from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import EnquiryForm from '../../common/EnquiryForm';

const FlooringContactSection = memo(() => {
  return (
    <section id="flooring-contact" className="scroll-mt-24">
      <div className="flex flex-col items-start gap-12 lg:flex-row lg:gap-16">
        <div className="flex flex-col gap-8 lg:w-1/2">
          <div className="flex flex-col gap-3">
            <p className="font-['Lato'] text-sm font-normal uppercase leading-5 tracking-[4.2px] text-[#57534d]">
              Get in Touch
            </p>
            <h2 className="font-['Playfair_Display'] text-[40px] font-semibold leading-tight text-[#1c1917]">
              See something you like?
            </h2>
          </div>
          <p className="font-['Lato'] text-base font-normal leading-7 text-[#57534d]">
            We&apos;re happy to provide more info - just submit the form and we&apos;ll be in touch.
          </p>
          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-5">
              <div className="flex size-12 shrink-0 items-center justify-center border border-[#d6d3d1]">
                <MapPin size={20} className="text-[#57534d]" aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-['Lato'] text-sm font-normal uppercase leading-5 tracking-[0.35px] text-[#57534d]">
                  Location
                </p>
                <p className="font-['Lato'] text-base font-normal leading-6 text-[#1c1917]">
                  23837 Hawthorne Blvd Torrance, CA 90505
                </p>
              </div>
            </div>
            <div className="flex items-start gap-5">
              <div className="flex size-12 shrink-0 items-center justify-center border border-[#d6d3d1]">
                <Phone size={20} className="text-[#57534d]" aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-['Lato'] text-sm font-normal uppercase leading-5 tracking-[0.35px] text-[#57534d]">
                  Phone
                </p>
                <p className="font-['Lato'] text-base font-normal leading-6 text-[#1c1917]">
                  (310) 375-4545
                </p>
              </div>
            </div>
            <div className="flex items-start gap-5">
              <div className="flex size-12 shrink-0 items-center justify-center border border-[#d6d3d1]">
                <Clock size={20} className="text-[#57534d]" aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-['Lato'] text-sm font-normal uppercase leading-5 tracking-[0.35px] text-[#57534d]">
                  Hours
                </p>
                <p className="font-['Lato'] text-base font-normal leading-6 text-[#1c1917]">
                  Mon-Sat: 10am - 6pm
                </p>
              </div>
            </div>
          </div>
        </div>

        <EnquiryForm
          idPrefix="flooring-enquiry"
          formClassName="flex w-full flex-col gap-4 lg:w-1/2"
          inputClassName="h-14 w-full border border-[#d6d3d1] px-4 py-4 font-['Lato'] text-base text-[#1c1917] placeholder-[rgba(0,0,0,0.4)] focus:border-[#1c1917] focus:outline-none"
          textareaClassName="w-full resize-none border border-[#d6d3d1] px-4 py-4 font-['Lato'] text-base text-[#1c1917] placeholder-[rgba(0,0,0,0.4)] focus:border-[#1c1917] focus:outline-none"
          buttonClassName="w-full bg-[#1c1917] py-4 text-center font-['Lato'] text-base font-normal leading-7 tracking-[0.8px] text-white transition-colors hover:bg-[#2c2927] disabled:cursor-not-allowed disabled:opacity-60"
          namePlaceholder="Your Name"
          phonePlaceholder="Phone Number"
          emailPlaceholder="Email Address"
        />
      </div>
    </section>
  );
});

FlooringContactSection.displayName = 'FlooringContactSection';

export default FlooringContactSection;
