import React, { memo } from 'react';
import ContactSection from '../common/ContactSection';
import AboutHeroSection from './sections/AboutHeroSection';
import WhoWeAreSection from './sections/WhoWeAreSection';
import FlooringSelectionSection from './sections/FlooringSelectionSection';
import HomeRemodelingSection from './sections/HomeRemodelingSection';
import TeamSection from './sections/TeamSection';
import CommitmentSection from './sections/CommitmentSection';

const HERO_URL = '/aboutHero.jpg';
const FLOORING_IMG_URL = '/flooringImg.jpg';

const REMODELING_IMG_URL =
 '/remodelingImg.jpg';

const TEAM_ITEMS = [
  'Expert guidance through every step of your flooring or remodeling project',
  'Transparent pricing with no hidden fees or surprise charges',
  'Licensed and fully insured installation teams',
  'Lifetime warranty on select Abbey Carpet products',
];

const OFFERS = [
  'Hardwood, Laminate, LVP, and Tile Flooring',
  'Carpet and Area Rugs',
  'Full Kitchen and Bathroom Remodeling',
  'Commercial Flooring Solutions',
];

const AboutContent = memo(() => (
  <div className="bg-white">
    <AboutHeroSection heroUrl={HERO_URL} />
    <WhoWeAreSection />
    <FlooringSelectionSection flooringImgUrl={FLOORING_IMG_URL} />
    <HomeRemodelingSection remodelingImgUrl={REMODELING_IMG_URL} />
    <TeamSection teamItems={TEAM_ITEMS} />
    <CommitmentSection offers={OFFERS} />

    {/* Contact */}
    <div id="contact">
      <ContactSection />
    </div>
  </div>
));

AboutContent.displayName = 'AboutContent';

export default AboutContent;
