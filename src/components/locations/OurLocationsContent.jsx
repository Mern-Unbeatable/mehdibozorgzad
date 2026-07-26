import React, { memo } from 'react';
import LocationsHero from './sections/LocationsHero';
import LocationsShowrooms from './sections/LocationsShowrooms';
import LocationCards from '../services/shared/LocationCards';

// Showroom photos & maps
const TORRANCE_PHOTO = '/about2.webp';
const GARDENA_PHOTO = '/about1.webp';
const TORRANCE_MAP = '/aboutHero.jpg';
const GARDENA_MAP = '/aboutHero.jpg';

const LOCATIONS = [
  {
    id: 'torrance',
    label: 'Torrance',
    photo: TORRANCE_PHOTO,
    map: TORRANCE_MAP,
    mapUrl: 'https://maps.google.com/?q=23837+Hawthorne+Blvd+Torrance+CA+90505',
    name: 'American Carpet & Flooring',
    address: ['23837 Hawthorne Blvd', 'Torrance, CA 90505', '(310) 375-4545'],
    showroomHours: 'Mon-Sat 10am-6pm',
  },
  {
    id: 'gardena',
    label: 'Gardena',
    photo: GARDENA_PHOTO,
    map: GARDENA_MAP,
    mapUrl: 'https://maps.google.com/?q=1617+Rosecrans+Avenue+Gardena+CA+90249',
    name: 'American Carpet & Flooring',
    address: ['1617 Rosecrans Avenue', 'Gardena, CA 90249', '(310) 523-3648'],
    showroomHours: 'Mon-Sat 9am-5pm',
  },
];

const OurLocationsContent = memo(() => (
  <div className="bg-[#fbfdff]">
    {/* Page Title Section */}
    <LocationsHero />

    {/* Showroom Showcase Section */}
    <LocationsShowrooms locations={LOCATIONS} />

    {/* Detail Location Cards & Maps Section */}
    <LocationCards />
  </div>
));

OurLocationsContent.displayName = 'OurLocationsContent';

export default OurLocationsContent;
