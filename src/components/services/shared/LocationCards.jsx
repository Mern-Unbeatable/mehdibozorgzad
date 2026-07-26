import React, { memo } from 'react';

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

const LocationCards = memo(() => (
  <section className=" py-14 md:py-16 lg:py-20">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {SHOWROOMS.map((s, index) => (
          <div key={index} className="flex flex-col sm:flex-row gap-6 lg:gap-8 items-center sm:items-stretch">
            
            {/* Map Iframe */}
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

            {/* Showroom Text Info */}
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
              <p className="font-['Lato'] text-[14px] text-[#555555]">
                {s.hours}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
));

LocationCards.displayName = 'LocationCards';
export default LocationCards;
