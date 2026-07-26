import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../config';

const IMG_CORETEC = '/flooringImg.jpg';
const IMG_WATERPROOF = '/constgallery4.jpg';
const IMG_CABINETS = '/constgallery6.jpg';
const IMG_COUNTERTOPS = '/constgallery9.jpg';
const IMG_REMODELING = '/remodelingImg.jpg';

const SERVICES_ROW1 = [
  {
    img: IMG_CORETEC,
    title: 'COREtec Flooring',
    desc: 'Advanced waterproof floors combining style, strength, and long-lasting performance.',
    route: ROUTES.CORETEC_FLOORING,
  },
  {
    img: IMG_WATERPROOF,
    title: 'Waterproof Flooring',
    desc: 'Reliable, moisture-resistant solutions perfect for kitchens, baths, and busy spaces.',
    route: ROUTES.WATERPROOF_FLOORING,
  },
  {
    img: IMG_CABINETS,
    title: 'Custom Cabinets',
    desc: 'Smart, stylish storage designed to fit your space and lifestyle perfectly.',
    route: ROUTES.CUSTOM_CABINETS,
  },
];

const SERVICES_ROW2 = [
  {
    img: IMG_COUNTERTOPS,
    title: 'Premium Countertops',
    desc: 'Durable, elegant surfaces crafted to elevate your kitchen and workspace.',
    route: ROUTES.PREMIUM_COUNTERTOPS,
  },
  {
    img: IMG_REMODELING,
    title: 'Home Remodeling',
    desc: 'Transforming spaces with modern design, quality materials, and expert craftsmanship.',
    route: ROUTES.HOME_REMODELING,
  },
];

const ServiceCard = memo(({ img, title, desc, route }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-3">
    <img src={img} alt={title} className="w-full h-48 md:h-64 lg:h-96 object-cover rounded" />
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h3 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-xl md:text-2xl  leading-tight">
          {title}
        </h3>
        <p className="text-base text-[#6b6b6b] leading-7">{desc}</p>
      </div>
      <Link
        to={route}
        className="bg-[#171717] hover:bg-[#2a2a2a] transition-colors text-white font-['Lato'] font-medium text-base py-2.5 px-4 rounded-lg w-full text-center cursor-pointer"
      >
        See Details
      </Link>
    </div>
  </div>
));
ServiceCard.displayName = 'ServiceCard';

const CompleteSolutions = memo(() => (
  <section className="py-14 md:py-16 lg:py-20">
    <div className="container mx-auto px-4">
      {/* Section heading */}
      <div className="flex flex-col gap-4 items-center text-center mb-10">
        <h2 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-2xl md:text-3xl lg:text-4xl leading-tight">
          Complete Flooring &amp; Home Solution
        </h2>
        <p className="text-base text-[#6b6b6b] leading-7 max-w-2xl">
          From durable flooring and custom cabinets to premium countertops and full remodeling —
          we deliver quality craftsmanship for every space.
        </p>
      </div>

      {/* Row 1 — 3 equal cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
        {SERVICES_ROW1.map((card) => (
          <ServiceCard key={card.title} {...card} />
        ))}
      </div>

      {/* Row 2 — 2 wide cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {SERVICES_ROW2.map((card) => (
          <ServiceCard key={card.title} {...card} />
        ))}
      </div>
    </div>
  </section>
));

CompleteSolutions.displayName = 'CompleteSolutions';

export default CompleteSolutions;
