import React, { memo } from 'react';
import EnquiryForm from '../common/EnquiryForm';

const ContactContent = memo(() => {
  return (
    <div className="max-w-2xl mx-auto">
      <article className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
        <p className="text-gray-600 mb-6">Get in touch with us</p>
        <EnquiryForm
          variant="labeled-grid"
          idPrefix="contact-page"
          formClassName="space-y-6"
          labelClassName="block text-sm font-medium text-gray-700 mb-2"
          inputClassName="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          textareaClassName="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
          buttonClassName="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          commentPlaceholder="Your message..."
          commentRows={4}
        />
      </article>
    </div>
  );
});

ContactContent.displayName = 'ContactContent';

export default ContactContent;
