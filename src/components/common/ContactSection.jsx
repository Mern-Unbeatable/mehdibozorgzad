import React, { memo } from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import EnquiryForm from './EnquiryForm';

const inputClass =
  'border border-[#d6d3d1] px-3.5 py-4 text-base text-[rgba(0,0,0,0.6)] outline-none focus:border-[#1c1917] transition-colors w-full bg-white';

const ContactSection = memo(() => {
  return (
    <section className="pb-14 md:pb-16 lg:pb-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex flex-col gap-5 lg:w-1/2">
            <div className="flex flex-col gap-2">
              <p className="text-[#57534d] text-sm tracking-[4.2px] uppercase font-['Lato']">
                Get in Touch
              </p>
              <h2 className="text-[#1c1917] font-['Playfair_Display'] font-semibold text-[40px] leading-tight">
                Visit Our Showroom
              </h2>
            </div>
            <p className="text-base lg:text-lg text-[#57534d] leading-7">
              Experience our flooring collections in person and let our experts guide you to the
              perfect solution for your home.
            </p>

            <div className="flex flex-col gap-4 mt-2">
              {[
                {
                  Icon: MapPin,
                  label: 'Location',
                  text: '23837 Hawthorne Blvd Torrance, CA 90505',
                },
                {
                  Icon: Phone,
                  label: 'Phone',
                  text: '(310) 375-4545',
                },
                {
                  Icon: Clock,
                  label: 'Hours',
                  text: 'Mon-Sat: 10am - 6pm',
                },
              ].map(({ Icon, label, text }) => (
                <div key={label} className="flex items-start gap-5">
                  <div className="shrink-0 border border-[#d6d3d1] flex items-center justify-center size-12">
                    <Icon size={20} className="text-[#57534d]" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[#57534d] text-xs tracking-[0.35px] uppercase">{label}</p>
                    <p className="text-[#1c1917] text-base">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <EnquiryForm
            formClassName="flex flex-col gap-3.5 lg:w-1/2 w-full"
            inputClassName={inputClass}
            textareaClassName={`${inputClass} resize-none`}
            buttonClassName="bg-[#1c1917] hover:bg-[#2c2927] disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-white font-['Lato'] text-base leading-7 tracking-[0.8px] py-4 w-full"
            commentPlaceholder="Hello, I need a flooring consultation..."
          />
        </div>
      </div>
    </section>
  );
});

ContactSection.displayName = 'ContactSection';

export default ContactSection;
