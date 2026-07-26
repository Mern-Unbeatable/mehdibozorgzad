import React, { memo } from 'react';
import { ArrowRight } from 'lucide-react';
import { ASSETS } from './homeData';

const AboutSection = memo(() => (
  <section className="py-14 md:py-16 lg:py-20  bg-white" aria-label="About">
    <div className="container mx-auto px-4 ">
      <div className="bg-[#e9ecf2] rounded-xl p-6 lg:p-8 mb-16 lg:mb-20">
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          <div className="flex-1">
            <h2 className="font-['Playfair_Display'] font-medium text-3xl lg:text-4xl text-black mb-6 leading-snug">
              Serving Torrance &amp; the South Bay Since 1981
            </h2>
            <div className="space-y-4 text-[#242424] text-base leading-[1.75]">
              <p>
                At American Carpet &amp; Flooring, we believe great service is just as important as
                great products. For over 40 years, we&apos;ve been a trusted flooring store in
                Torrance, CA, proudly serving homeowners, businesses, and contractors throughout
                South Bay.
              </p>
              <p>
                We specialize in flooring and installation, offering everything from hardwood
                flooring, carpet, laminate, tile, and luxury vinyl plank to full-service kitchen and
                bathroom remodeling. Whether you&apos;re updating a single room or planning a
                complete renovation, our team delivers tailored solutions to match your style,
                budget, and timeline.
              </p>
            </div>
          </div>
          <div className="w-full lg:flex-1">
            <img
              src="/about1.webp"
              alt="Interior room showcasing premium flooring"
              className="w-full h-72 lg:h-120 object-cover rounded-xl"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#1c1917] rounded-xl p-6 lg:p-8">
  <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
    {/* Image Side */}
    <div className="w-full lg:w-[55%]">
      <img
        src="/about2.webp"
        alt="Local flooring store in Torrance"
        className="w-full h-64 md:h-80 lg:h-[420px] object-cover rounded-xl"
        loading="lazy"
      />
    </div>
    
    {/* Text Side */}
    <div className="w-full lg:w-[45%] flex flex-col justify-center pr-0 lg:pr-6">
      <h2 className="font-['Playfair_Display'] font-medium text-3xl lg:text-[34px] text-white mb-6 leading-snug">
        Your Local Flooring Store in Torrance
      </h2>
      
      <div className="flex flex-col gap-6 text-[#d4d4d4] text-sm lg:text-base leading-relaxed font-light">
        <p>
          As a locally owned and operated business, we're more than just a flooring retailer,
          and we're part of the Torrance community. Unlike big box stores, we focus on
          personalized service, expert guidance, and long term customer relationships.
        </p>
        <p>
          From your first visit to final installation, we make the process simple, transparent,
          and stress free. Our goal is to ensure every customer walks away with a space they
          love.
        </p>
      </div>
    </div>
  </div>
</div>
    </div>
  </section>
));

AboutSection.displayName = 'AboutSection';

export default AboutSection;
