import React, { memo } from 'react';

const GALLERY = [
  {
    src: '/constgallery1.jpg',
    label: 'Basement Remodeling',
  },
  {
    src: '/constgallery3.jpg',
    label: 'Bathroom Remodeling',
  },
  {
    src: '/constgallery6.jpg',
    label: 'Den Remodeling',
  },
  {
    src: '/constgallery5.jpg',
    label: 'Dining Room Remodeling',
  },
  {
    src: '/constgallery8.jpg',
    label: 'Entry Way Remodeling',
  },
  {
    src: '/constgallery11.jpg',
    label: 'Family Room Remodeling',
  },
  {
    src: '/remodelingImg.jpg',
    label: 'Kitchen Remodeling',
  },
  {
    src: '/constgallery7.jpg',
    label: 'Living Room Remodeling',
  },
  {
    src: '/constgallery12.jpg',
    label: 'Sun Room Remodeling',
  },
];

const InspirationGallery = memo(() => (
  <section className="pt-14 md:pt-16 lg:pt-20 ">
    <div className="container mx-auto px-4">
      <div className="text-center mb-6 flex flex-col gap-4 items-center">
        <h2 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-2xl md:text-3xl lg:text-4xl leading-tight max-w-3xl">
          Explore Our Inspiration Gallery
        </h2>
        <p className="text-base text-[#6b6b6b] leading-7 max-w-2xl">
          Discover design ideas in our Inspiration Gallery! Browse beautiful kitchen and bathroom
          remodels along with other living space remodels.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {GALLERY.map(({ src, label }) => (
          <div key={label} className="relative h-64 md:h-80 lg:h-132 rounded-lg overflow-hidden">
            <img src={src} alt={label} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center pb-6 px-4">
              <h3 className="font-['Playfair_Display'] font-semibold text-white text-xl lg:text-2xl text-center leading-tight">
                {label}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
));

InspirationGallery.displayName = 'InspirationGallery';

export default InspirationGallery;
