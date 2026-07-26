import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ROUTES } from '../../../../config';

const IMG_CARPET = '/carpetHero.webp';
const IMG_HARDWOOD = '/constgallery3.jpg';
const IMG_LAMINATE = '/flooringImg.jpg';
const IMG_TILE = '/constgallery12.jpg';

const COLLECTIONS = [
  {
    img: IMG_CARPET,
    title: 'Shop Carpet',
    desc: 'Add warmth to any room with lush carpet. Your feet will thank you.',
    cta: 'Explore Carpet',
    href: ROUTES.CARPET_SALE,
  },
  {
    img: IMG_HARDWOOD,
    title: 'Shop Hardwood',
    desc: 'Add true character to your home with the robust & richness of hardwood.',
    cta: 'Explore Hardwood',
    href: ROUTES.HARDWOOD_SALE,
  },
  {
    img: IMG_LAMINATE,
    title: 'Shop Laminate',
    desc: 'Laminate flooring can be installed almost anywhere and for any lifestyle.',
    cta: 'Explore Laminate',
    href: `${ROUTES.FLOORING}?tab=floors`,
  },
  {
    img: IMG_TILE,
    title: 'Shop Tile',
    desc: 'Tile flooring is an elegant and luxurious choice that will last you years to come.',
    cta: 'Explore Tile',
    href: `${ROUTES.FLOORING}?tab=walls`,
  },
];

const CollectionCard = memo(({ img, title, desc, cta, href }) => (
  <div className="flex flex-col gap-5">
    <div className="flex flex-col gap-3">
      <img src={img} alt={title} className="w-full h-64 lg:h-80 object-cover rounded-lg" />
      <div className="flex flex-col gap-2">
        <h3 className="font-['Lato'] font-medium text-[#1c1917] text-2xl leading-tight">{title}</h3>
        <p className="text-base text-[#404040] leading-6">{desc}</p>
      </div>
    </div>
    <Link
      to={href}
      className="bg-[#2a2a2a] hover:bg-[#404040] transition-colors text-white text-base font-['Lato'] px-5 py-2.5 rounded-lg flex items-center gap-3 w-fit"
    >
      {cta}
      <ArrowRight size={16} aria-hidden="true" />
    </Link>
  </div>
));
CollectionCard.displayName = 'CollectionCard';

const PremiumFlooring = memo(() => (
  <section className="pb-14 md:pb-16 lg:pb-20 ">
    <div className="container mx-auto px-4">
      {/* Section heading */}
      <div className="flex flex-col items-center text-center gap-2 mb-10">
        <p className="text-[#57534d] text-sm tracking-[4.2px] uppercase font-['Lato']">
          Collections
        </p>
        <h2 className="font-['Playfair_Display'] font-semibold text-[#1c1917] text-xl md:text-2xl lg:text-4xl leading-tight">
          Premium Flooring
        </h2>
      </div>

      {/* 4-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {COLLECTIONS.map((col) => (
          <CollectionCard key={col.title} {...col} />
        ))}
      </div>
    </div>
  </section>
));

PremiumFlooring.displayName = 'PremiumFlooring';

export default PremiumFlooring;
