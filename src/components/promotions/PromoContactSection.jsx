import React, { memo } from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import EnquiryForm from '../common/EnquiryForm';

const SHOWROOMS = [
  {
    name: 'American Carpet & Flooring',
    address: '23837 Hawthorne Blvd',
    city: 'Torrance, CA 90505',
    phone: '(310) 375-4545',
    hours: 'Mon-Sat 10am-6pm',
    mapEmbed: 'https://www.google.com/maps?q=23837+Hawthorne+Blvd,+Torrance,+CA+90505&output=embed',
  },
  {
    name: 'American Carpet & Flooring',
    address: '1617 Rosecrans Avenue',
    city: 'Gardena, CA 90249',
    phone: '(310) 523-3648',
    hours: 'Mon-Sat 9am-5pm',
    mapEmbed: 'https://www.google.com/maps?q=1617+Rosecrans+Avenue,+Gardena,+CA+90249&output=embed',
  },
];

const PromoContactSection = memo(function PromoContactSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-14 md:mb-16 lg:mb-20">
          <div className="flex flex-col justify-center">
            <p className="font-['Lato'] font-semibold text-xs text-[#888888] tracking-[0.2em] uppercase mb-3">
              GET IN TOUCH
            </p>
            <h2 className="font-['Playfair_Display'] font-bold text-4xl lg:text-[42px] text-[#1A1A1A] mb-4">
              Visit Our Showroom
            </h2>
            <p className="font-['Lato'] text-[15px] text-[#666666] leading-relaxed mb-10 max-w-md">
              Experience our flooring collections in person and let our experts guide you.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 border border-[#E5E5E5] rounded flex items-center justify-center shrink-0">
                  <MapPin size={20} strokeWidth={1.5} className="text-[#333333]" aria-hidden="true" />
                </div>
                <div className="mt-1">
                  <p className="font-['Lato'] font-semibold text-[11px] text-[#888888] tracking-wider uppercase mb-1">
                    LOCATION
                  </p>
                  <p className="font-['Lato'] text-[14px] text-[#333333]">
                    {SHOWROOMS[0].address} {SHOWROOMS[0].city}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 border border-[#E5E5E5] rounded flex items-center justify-center shrink-0">
                  <Phone size={20} strokeWidth={1.5} className="text-[#333333]" aria-hidden="true" />
                </div>
                <div className="mt-1">
                  <p className="font-['Lato'] font-semibold text-[11px] text-[#888888] tracking-wider uppercase mb-1">
                    PHONE
                  </p>
                  <a
                    href={`tel:${SHOWROOMS[0].phone.replace(/\D/g, '')}`}
                    className="font-['Lato'] text-[14px] text-[#333333] hover:text-black transition-colors"
                  >
                    {SHOWROOMS[0].phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 border border-[#E5E5E5] rounded flex items-center justify-center shrink-0">
                  <Clock size={20} strokeWidth={1.5} className="text-[#333333]" aria-hidden="true" />
                </div>
                <div className="mt-1">
                  <p className="font-['Lato'] font-semibold text-[11px] text-[#888888] tracking-wider uppercase mb-1">
                    HOURS
                  </p>
                  <p className="font-['Lato'] text-[14px] text-[#333333]">Mon-Sat: 10am - 6pm</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <EnquiryForm
              idPrefix="promo-enquiry"
              formClassName="space-y-4"
              inputClassName="w-full border border-[#E5E5E5] rounded-sm px-4 py-3.5 font-['Lato'] text-[14px] text-[#333333] placeholder-[#A3A3A3] focus:outline-none focus:border-[#888888] transition-colors"
              textareaClassName="w-full border border-[#E5E5E5] rounded-sm px-4 py-3.5 font-['Lato'] text-[14px] text-[#333333] placeholder-[#A3A3A3] focus:outline-none focus:border-[#888888] resize-none transition-colors"
              buttonClassName="w-full bg-[#222222] text-white font-['Lato'] text-[14px] tracking-wide py-4 rounded-sm hover:bg-black transition-colors disabled:opacity-70 mt-2"
              phonePlaceholder="+880 17800 53624"
              commentPlaceholder="Hello, I need a renovation......."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {SHOWROOMS.map((s, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-6 lg:gap-8 items-center sm:items-stretch">
              <div className="w-full sm:w-1/2 h-64 sm:h-auto min-h-[240px] shrink-0">
                <iframe
                  src={s.mapEmbed}
                  title={`Map location for ${s.name} at ${s.address}`}
                  className="w-full h-full rounded-2xl border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="w-full sm:w-1/2 flex flex-col justify-center py-2">
                <h3 className="font-['Playfair_Display'] font-bold text-xl text-[#1A1A1A] mb-3">
                  {s.name}
                </h3>
                <div className="space-y-1.5 mb-5">
                  <p className="font-['Lato'] text-[14px] text-[#555555]">{s.address}</p>
                  <p className="font-['Lato'] text-[14px] text-[#555555]">{s.city}</p>
                  <p className="font-['Lato'] text-[14px] text-[#555555]">{s.phone}</p>
                </div>

                <h4 className="font-['Playfair_Display'] font-bold text-lg text-[#1A1A1A] mb-2">
                  Showroom
                </h4>
                <p className="font-['Lato'] text-[14px] text-[#555555]">{s.hours}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default PromoContactSection;
