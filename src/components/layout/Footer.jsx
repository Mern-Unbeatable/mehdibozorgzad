import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../config';

const LOGO_URL = '/logo.webp';

const FOOTER_LINKS = {
  whyChooseUs: [
    { label: 'About Us', to: ROUTES.ABOUT },
    { label: 'Choose Abbey', to: ROUTES.CHOOSE_ABBEY },
    { label: 'The Experience', to: ROUTES.THE_EXPERIENCE },
    { label: 'Lifetime Warranty', to: ROUTES.LIFETIME_WARRANTY },
    { label: '60 Day Guarantee', to: ROUTES.SIXTY_DAY_GUARANTEE },
  ],
  shopOnline: [
    { label: 'Carpet', to: ROUTES.CARPET_SALE },
    { label: 'Hardwood', to: ROUTES.HARDWOOD_SALE },
    { label: 'Tile & Stone', to: ROUTES.FLOORING },
    { label: 'Laminate', to: ROUTES.WATERPROOF_FLOORING },
    { label: 'Vinyl', to: ROUTES.LUXURY_VINYL_SALE },
  ],
  locations: [
    { address: '23837 Hawthorne Blvd\nTorrance, CA 90505', phone: '(310) 375-4545' },
    { address: '1617 Rosecrans Avenue\nGardena, CA 90249', phone: '(310) 523-3648' },
  ],
};

const Footer = memo(() => (
  <footer className="bg-[#0c0a09] py-16 lg:py-20" aria-label="Site footer">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 gap-y-10 border-b border-[#292524] pb-8 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-12 lg:gap-x-14">
        {/* Brand */}
        <div className="flex flex-col gap-4 lg:col-span-3">
          <img
            src={LOGO_URL}
            alt="American Carpet &amp; Flooring"
            className="h-12.75 w-30 object-contain"
            loading="lazy"
          />
          <p className="text-[#fdfdfd] text-lg font-light leading-relaxed">
            Torrance&apos;s trusted flooring and remodeling experts since 1981.
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="flex flex-col gap-4 lg:col-span-3 lg:justify-self-center">
          <h3 className="text-white text-sm font-medium uppercase tracking-wide">Why Choose Us</h3>
          <ul className="flex flex-col gap-2">
            {FOOTER_LINKS.whyChooseUs.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className="text-[#efefef] text-sm transition-colors hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Shop Online */}
        <div className="flex flex-col gap-4 lg:col-span-3 lg:justify-self-center">
          <h3 className="text-white text-sm font-medium uppercase tracking-wide">Shop Online</h3>
          <ul className="flex flex-col gap-2">
            {FOOTER_LINKS.shopOnline.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className="text-[#eaeaea] text-sm transition-colors hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Location */}
        <div className="flex flex-col gap-4 lg:col-span-3 lg:justify-self-end">
          <h3 className="text-white text-sm font-medium uppercase tracking-wide">Our Location</h3>
          <div className="flex flex-col gap-5">
            {FOOTER_LINKS.locations.map(({ address, phone }) => (
              <div key={phone} className="flex flex-col gap-1">
                <p className="text-[#f5f5f5] text-sm whitespace-pre-line">{address}</p>
                <a
                  href={`tel:${phone.replace(/\D/g, '')}`}
                  className="text-[#f5f5f5] text-sm hover:underline"
                >
                  {phone}
                </a>
              </div>
            ))}
            <div>
              <p className="text-[#f5f5f5] text-base font-semibold mb-1">Showroom Hours</p>
              <p className="text-[#f5f5f5] text-sm">Mon-Sat 10am–6pm</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <p className="text-[#e9e9e9] text-sm text-center">
          &copy; 2026 American Carpet &amp; Flooring. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
));

Footer.displayName = 'Footer';

export default Footer;
