import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import EnquiryForm from '../common/EnquiryForm';
import { SHOWROOM_INFO } from './homeData';

const ShowroomSection = () => {
  return (
    <section id="showroom" className="py-14 md:py-16 lg:py-20 bg-white" aria-labelledby="showroom-heading">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="flex flex-col gap-6 lg:w-1/2">
            <div>
              <p className="text-sm uppercase tracking-[4.2px] text-[#57534d] mb-3">Get in Touch</p>
              <h2
                id="showroom-heading"
                className="font-['Playfair_Display'] font-semibold text-[#1c1917] text-3xl lg:text-4xl"
              >
                Visit Our Showroom
              </h2>
            </div>
            <p className="text-[#57534d] text-xl leading-relaxed">
              Experience our flooring collections in person and let our experts guide you.
            </p>
            <div className="flex flex-col gap-5">
              <div className="flex gap-5 items-start">
                <div className="border border-[#d6d3d1] flex items-center justify-center w-12 h-12 shrink-0">
                  <MapPin size={20} className="text-[#1c1917]" aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[#57534d] text-sm uppercase tracking-wide">Location</p>
                  <p className="text-[#1c1917] text-base">{SHOWROOM_INFO.address}</p>
                </div>
              </div>
              <div className="flex gap-5 items-start">
                <div className="border border-[#d6d3d1] flex items-center justify-center w-12 h-12 shrink-0">
                  <Phone size={20} className="text-[#1c1917]" aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[#57534d] text-sm uppercase tracking-wide">Phone</p>
                  <a
                    href={`tel:${SHOWROOM_INFO.phone.replace(/\D/g, '')}`}
                    className="text-[#1c1917] text-base hover:underline"
                  >
                    {SHOWROOM_INFO.phone}
                  </a>
                </div>
              </div>
              <div className="flex gap-5 items-start">
                <div className="border border-[#d6d3d1] flex items-center justify-center w-12 h-12 shrink-0">
                  <Clock size={20} className="text-[#1c1917]" aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[#57534d] text-sm uppercase tracking-wide">Hours</p>
                  <p className="text-[#1c1917] text-base">{SHOWROOM_INFO.hours}</p>
                </div>
              </div>
            </div>
          </div>

          <EnquiryForm
            idPrefix="home-showroom"
            formClassName="flex flex-col gap-4 lg:w-1/2"
            inputClassName="border border-[#d6d3d1] px-4 py-3.5 text-base text-[#0f0f0f] placeholder:text-black/50 outline-none focus:border-[#1c1917] transition-colors"
            textareaClassName="border border-[#d6d3d1] px-4 py-3.5 text-base text-[#0f0f0f] placeholder:text-black/50 outline-none focus:border-[#1c1917] transition-colors resize-none"
            buttonClassName="w-full bg-[#1c1917] text-white py-4 text-base font-normal tracking-wide hover:bg-[#2c2925] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            namePlaceholder="Your Name"
            phonePlaceholder="Phone Number"
            emailPlaceholder="Email Address"
            commentPlaceholder="Your message..."
          />
        </div>
      </div>
    </section>
  );
};

ShowroomSection.displayName = 'ShowroomSection';

export default ShowroomSection;
