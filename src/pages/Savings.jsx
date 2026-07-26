import React from 'react';
import { useSEO } from '../hooks/useSEO';
import SavingsContent from '../components/promotions/SavingsContent';

export default function Savings() {
  useSEO({
    title: 'Savings Up To 70% Off Flooring | American Carpet & Flooring',
    description:
      "Visit American Carpet & Flooring's warehouse for savings up to 70% off on waterproof flooring, carpet, and floor tile. Over 300 rolls in stock.",
    keywords: [
      'flooring savings',
      'flooring sale',
      'waterproof flooring',
      'floor tile',
      'carpet warehouse torrance',
    ],
  });

  return <SavingsContent />;
}
