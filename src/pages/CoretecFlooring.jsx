import React, { memo } from 'react';
import { useSEO } from '../hooks/useSEO';
import CoretecContent from '../components/services/CoretecContent';

const CoretecFlooring = memo(() => {
  useSEO({
    title: 'COREtec Flooring | American Carpet & Flooring',
    description:
      'Premium COREtec flooring supply and expert installation in Torrance, CA. Waterproof, durable, and beautiful floors for any space.',
  });
  return <CoretecContent />;
});

CoretecFlooring.displayName = 'CoretecFlooring';
export default CoretecFlooring;
