import React, { memo } from 'react';
import { MapPin, Phone } from 'lucide-react';

const WarehouseSection = memo(() => (
  <section className="bg-[#f2f2f7] py-14 md:py-16 lg:py-20" aria-labelledby="warehouse-heading">
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center gap-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex justify-center gap-2 mb-5">
            <span className="bg-white text-[#57534d] text-sm uppercase tracking-wide px-4 py-1.5 rounded-full">
              Warehouse Sales
            </span>
            <span className="bg-[#161311] text-white text-sm uppercase tracking-wide px-4 py-1.5 rounded-full">
              Direct to Public
            </span>
          </div>
          <h2
            id="warehouse-heading"
            className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-4xl lg:text-5xl mb-6 leading-snug"
          >
            In-Stock Flooring Ready For Immediate Pickup
          </h2>
          <p className="text-[#57534d] text-base lg:text-xl leading-relaxed">
            Explore premium Carpet, Waterproof Laminate &amp; Hardwood available directly from our
            warehouse. Same-day loading or next-day scheduled dispatch.
            <br />
            <br />
            Skip the premium showroom prices and long fulfillment waits. All listed inventory
            resides locally in our temperature-controlled facility and is prepared for immediate
            client loading.
          </p>
        </div>

        {/* Map Container */}
        <div className="w-full h-80 lg:h-[625px] relative rounded-2xl overflow-hidden shadow-sm bg-gray-200">
          
          {/* Most Compatible Google Maps Iframe */}
          <iframe
            title="Warehouse Location Map"
            width="100%"
            height="100%"
            className="h-full w-full border-0"
            src="https://maps.google.com/maps?q=1617%20Rosecrans%20Avenue,%20Gardena,%20CA%2090249&t=&z=14&ie=UTF8&iwloc=&output=embed"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          
          {/* Location Info Box (Positioned Top-Left) */}
          <div className="absolute top-0 left-0 bg-white/95 backdrop-blur-sm p-6 lg:p-7 rounded-br-3xl max-w-xs lg:max-w-md shadow-sm z-10">
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin size={22} className="text-[#1c1916] shrink-0 mt-0.5" aria-hidden="true" />
                <p className="font-['Lato'] font-medium text-[#1c1916] text-sm lg:text-base leading-snug">
                  1617 Rosecrans Avenue, Gardena, CA 90249
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-[#1c1916] shrink-0" aria-hidden="true" />
                <a
                  href="tel:3105233648"
                  className="font-['Lato'] font-medium text-[#1c1916] text-sm lg:text-base hover:underline"
                >
                  (310) 523-3648
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </section>
));

WarehouseSection.displayName = 'WarehouseSection';

export default WarehouseSection;
