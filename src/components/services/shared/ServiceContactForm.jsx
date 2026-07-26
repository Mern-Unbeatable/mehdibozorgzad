import React, { memo } from 'react';
import EnquiryForm from '../../common/EnquiryForm';

const inputCls =
  "w-full border border-[rgba(0,0,0,0.2)] rounded-lg px-4 py-4 text-base text-[#696664] placeholder:text-[#8c8c8c] outline-none focus:border-[#0d0b0a] transition-colors bg-white font-['Lato']";

const ServiceContactForm = memo(({ title, desc }) => {
  return (
    <section className="pt-14 md:pt-16 lg:pt-20 ">
      <div className="container mx-auto px-4">
        <div className="bg-[#e9ecf2] rounded-2xl p-6  md:p-12">
          <div className="text-center mb-10 flex flex-col gap-4 items-center">
            <h2 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-2xl lg:text-4xl leading-tight">
              {title}
            </h2>
            <p className="text-base text-[#6b6b6b] leading-7 max-w-2xl">{desc}</p>
          </div>

          <div className="bg-white border border-[rgba(0,0,0,0.2)] rounded-2xl p-6 lg:p-8">
            <h3 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-2xl lg:text-[32px] mb-8 leading-tight">
              Contact Us
            </h3>
            <EnquiryForm
              variant="labeled-grid"
              idPrefix="service-enquiry"
              inputClassName={inputCls}
              textareaClassName={`${inputCls} resize-none h-full min-h-55`}
              buttonClassName="bg-[#0d0b0a] hover:bg-[#1f1b18] transition-colors text-white text-base font-['Lato'] px-6 py-3 rounded cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
              commentPlaceholder="Tell us about your project..."
              commentRows={10}
              submitLabel="Submit"
            />
          </div>
        </div>
      </div>
    </section>
  );
});

ServiceContactForm.displayName = 'ServiceContactForm';
export default ServiceContactForm;
