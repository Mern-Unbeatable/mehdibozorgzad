import React from 'react';
import { useSEO } from '../hooks/useSEO';
import FinancingContent from '../components/promotions/FinancingContent';

export default function Financing() {
  useSEO({
    title: 'Special Financing Available | American Carpet & Flooring',
    description:
      'Apply for flooring financing at American Carpet & Flooring. Home Solutions Credit — simple application, decisions in seconds via Service Finance Company.',
    keywords: [
      'flooring financing',
      'home solutions credit',
      'flooring payment plan',
      'service finance',
      'carpet financing torrance',
    ],
  });

  return <FinancingContent />;
}
