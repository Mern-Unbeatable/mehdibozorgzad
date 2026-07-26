import React, { memo } from 'react';
import { useSEO } from '../hooks/useSEO';
import HomeContent from '../components/home/HomeContent';

const Home = memo(() => {
  useSEO({
    title: 'Premium Flooring & Remodeling | American Carpet & Flooring – Torrance',
    description:
      "Torrance's trusted flooring and remodeling experts since 1981. Shop carpet, hardwood, laminate, tile, and more. Visit our South Bay showroom today.",
    keywords: [
      'flooring',
      'carpet',
      'hardwood',
      'laminate',
      'tile',
      'remodeling',
      'Torrance',
      'South Bay',
    ],
  });

  return <HomeContent />;
});

Home.displayName = 'Home';

export default Home;
