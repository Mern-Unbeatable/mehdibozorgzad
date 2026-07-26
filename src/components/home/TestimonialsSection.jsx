import React, { memo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import StarRow from './StarRow';
import { TESTIMONIALS } from './homeData';

const TestimonialsSection = memo(() => (
  <section className="bg-[#fafaf9]  py-14 md:py-16 lg:py-20" aria-labelledby="testimonials-heading">
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center gap-4 mb-12">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[4.2px] text-[#57534d] mb-3">Testimonials</p>
          <h2
            id="testimonials-heading"
            className="font-['Playfair_Display'] font-semibold text-[#1c1917] text-3xl lg:text-4xl"
          >
            Client Stories
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <StarRow count={5} size={20} />
          <span className="text-[#57534d] text-base">4.9/5 on Google</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {TESTIMONIALS.map(({ id, author, text }) => (
          <div key={id} className="bg-white p-8 lg:p-10 flex flex-col gap-6">
            <StarRow count={5} size={16} />
            <p className="text-[#44403b] text-base leading-relaxed font-light">{text}</p>
            <p className="text-[#1c1917] text-base font-medium tracking-wide">— {author}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-8 mt-10">
        <button
          type="button"
          aria-label="Previous testimonials"
          className="bg-[#ddd] hover:bg-[#ccc] transition-colors rounded-full p-4"
        >
          <ChevronLeft size={24} className="text-[#333]" aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Next testimonials"
          className="bg-[#121212] hover:bg-[#2a2a2a] transition-colors rounded-full p-4"
        >
          <ChevronRight size={24} className="text-white" aria-hidden="true" />
        </button>
      </div>
    </div>
  </section>
));

TestimonialsSection.displayName = 'TestimonialsSection';

export default TestimonialsSection;
