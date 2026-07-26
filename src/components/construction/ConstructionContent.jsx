import React, { memo } from 'react';
import {
  RefreshCcw,
  House,
  Brush,
  Zap,
  Archive,
  Square,
  Utensils,
  LayoutGrid,
  Sparkles,
  Layers,
  Paintbrush,
  Lightbulb,
  ClipboardList,
  Droplets,
  AppWindow,
  Bath,
} from 'lucide-react';
import BathroomGallerySection from './sections/BathroomGallerySection';
import BathroomRemodelingSection from './sections/BathroomRemodelingSection';
import ConstructionContactSection from './sections/ConstructionContactSection';
import ConstructionCtaSection from './sections/ConstructionCtaSection';
import ConstructionGallerySection from './sections/ConstructionGallerySection';
import ConstructionHeroSection from './sections/ConstructionHeroSection';
import ConstructionServicesSection from './sections/ConstructionServicesSection';
import CulinaryLuxurySection from './sections/CulinaryLuxurySection';
import HomeRemodelingSection from './sections/HomeRemodelingSection';
import KitchenGallerySection from './sections/KitchenGallerySection';
import KitchenRenovationSection from './sections/KitchenRenovationSection';
import RemodelingProcessSection from './sections/RemodelingProcessSection';
import RenovationProjectsSection from './sections/RenovationProjectsSection';
import SpaBathroomConversionSection from './sections/SpaBathroomConversionSection';
import SpaDetailSection from './sections/SpaDetailSection';

const IMG_HERO = '/constHero.jpg';
const IMG_GALLERY_ROW1 = [
  '/constgallery1.jpg',
  '/constgallery2.jpg',
  '/constgallery3.jpg',
  '/constgallery4.jpg',
  '/constgallery5.jpg',
  '/constgallery6.jpg',
];
const IMG_GALLERY_ROW2 = [
  '/constgallery7.jpg',
  '/constgallery8.jpg',
  '/constgallery9.jpg',
  '/constgallery10.jpg',
  '/constgallery11.jpg',
  '/constgallery12.jpg',
];
const IMG_BEFORE = '/constgallery1.jpg';
const IMG_AFTER = '/constgallery2.jpg';
const IMG_RENOVATION = [
  '/constgallery3.jpg',
  '/constgallery4.jpg',
  '/constgallery5.jpg',
  '/constgallery6.jpg',
];
const IMG_CULINARY = '/remodelingImg.jpg';
const IMG_KITCHEN_FEATURES = [
  '/constgallery7.jpg',
  '/constgallery8.jpg',
  '/constgallery9.jpg',
];
const IMG_KITCHEN_GALLERY = [
  '/constgallery1.jpg',
  '/constgallery3.jpg',
  '/constgallery5.jpg',
  '/constgallery7.jpg',
  '/constgallery9.jpg',
];
const IMG_SPA_CONV = [
  '/constgallery2.jpg',
  '/constgallery4.jpg',
  '/constgallery6.jpg',
  '/constgallery8.jpg',
];
const IMG_SPA_DETAIL = [
  '/constgallery10.jpg',
  '/constgallery11.jpg',
  '/constgallery12.jpg',
];
const IMG_BATHROOM_GALLERY = [
  '/constgallery2.jpg',
  '/constgallery4.jpg',
  '/constgallery6.jpg',
  '/constgallery8.jpg',
  '/constgallery10.jpg',
];

const CONSTRUCTION_SERVICES = [
  {
    icon: Utensils,
    title: 'Kitchen Remodeling',
    desc: 'Full kitchen transformations - cabinets, countertops, flooring, lighting, and plumbing.',
  },
  {
    icon: Droplets,
    title: 'Bathroom Remodeling',
    desc: 'Master baths, guest baths, powder rooms - designed and installed to perfection.',
  },
  {
    icon: AppWindow,
    title: 'Window Fashions',
    desc: 'Blinds, shutters, shades, and drapery - installed throughout your home.',
  },
  {
    icon: Layers,
    title: 'Flooring Throughout',
    desc: 'Hardwood, carpet, laminate, tile, and vinyl for every room in your home.',
  },
  {
    icon: Archive,
    title: 'Custom Cabinetry',
    desc: 'Built-ins, storage solutions, laundry rooms, and home offices.',
  },
  {
    icon: Paintbrush,
    title: 'Interior Painting',
    desc: 'Whole-home paint refresh, trim work, ceilings, and accent walls.',
  },
  {
    icon: Lightbulb,
    title: 'Lighting Upgrades',
    desc: 'Recessed lighting, fixture replacements, and smart lighting throughout.',
  },
  {
    icon: ClipboardList,
    title: 'Project Management',
    desc: 'One dedicated coordinator handles scheduling, vendors, permits, and quality control.',
  },
];

const HOME_REMODELING_SERVICES = [
  {
    icon: RefreshCcw,
    title: 'Full Home Remodeling',
    desc: 'Transforming every corner of your living space.',
  },
  { icon: House, title: 'Interior Remodeling', desc: 'Refreshing styles and modernizing layouts.' },
  {
    icon: Layers,
    title: 'Flooring Replacement',
    desc: 'Premium hardwood, tile, and stone options.',
  },
  {
    icon: Brush,
    title: 'Wall & Ceiling Updates',
    desc: 'Structural changes and decorative finishes.',
  },
  {
    icon: Zap,
    title: 'Modern Design Upgrade',
    desc: 'Bringing contemporary aesthetics to your home.',
  },
];

const REMODELING_STEPS = [
  { step: '01', title: 'Consultation', desc: 'Detailed discussion about your vision and goals.' },
  {
    step: '02',
    title: 'Design & Plan',
    desc: 'Creating blueprints and selecting premium materials.',
  },
  {
    step: '03',
    title: 'Renovation',
    desc: 'Expert execution with minimal disruption to your daily life.',
  },
  { step: '04', title: 'Completion', desc: 'Final walkthrough and unveiling your new space.' },
];

const KITCHEN_SERVICES = [
  {
    icon: Utensils,
    title: 'Custom Kitchen Design',
    desc: 'Bespoke layouts for the heart of your home.',
  },
  { icon: Archive, title: 'Cabinet Installation', desc: 'High-end cabinetry with smart storage.' },
  { icon: Square, title: 'Countertops', desc: 'Quartz, granite, and marble surfaces.' },
  { icon: LayoutGrid, title: 'Tile Backsplash', desc: 'Distinctive patterns and textures.' },
  { icon: Utensils, title: 'Modern Kitchen Remodeling', desc: 'Sleek, functional, and beautiful.' },
];

const KITCHEN_FEATURES = [
  { title: 'Quartz & Marble', desc: 'Superior durability with natural elegance.' },
  { title: 'Smart Cabinets', desc: 'Silent closing and optimized space usage.' },
  { title: 'Professional Fixtures', desc: 'High-performance taps and appliances.' },
];

const BATHROOM_SERVICES = [
  {
    icon: Droplets,
    title: 'Shower Installation',
    desc: 'Luxury walk-in showers and spa features.',
  },
  {
    icon: LayoutGrid,
    title: 'Vanity & Sink Design',
    desc: 'Elegant storage and high-end fixtures.',
  },
  { icon: Bath, title: 'Tile & Flooring', desc: 'Waterproof luxury surfaces.' },
  {
    icon: Square,
    title: 'Modern Bathroom Remodeling',
    desc: 'Contemporary retreats for relaxation.',
  },
  {
    icon: Sparkles,
    title: 'Spa-style Bathroom Design',
    desc: 'Transform your bathroom into a sanctuary.',
  },
];

const SPA_DETAIL_BULLETS = [
  'Waterproof Integrity Guarantee',
  'Premium Porcelain & Natural Stone',
  'Smart Faucet & Shower Integration',
];

const ConstructionContent = memo(function ConstructionContent() {
  return (
    <main className="bg-[#FBFDFF]">
      <ConstructionHeroSection heroImage={IMG_HERO} />
      <ConstructionServicesSection services={CONSTRUCTION_SERVICES} />
      <ConstructionGallerySection row1Images={IMG_GALLERY_ROW1} row2Images={IMG_GALLERY_ROW2} />
      <HomeRemodelingSection
        beforeImage={IMG_BEFORE}
        afterImage={IMG_AFTER}
        services={HOME_REMODELING_SERVICES}
      />
      <RemodelingProcessSection steps={REMODELING_STEPS} />
      <RenovationProjectsSection images={IMG_RENOVATION} />
      <CulinaryLuxurySection image={IMG_CULINARY} />
      <KitchenRenovationSection
        services={KITCHEN_SERVICES}
        features={KITCHEN_FEATURES}
        featureImages={IMG_KITCHEN_FEATURES}
      />
      <KitchenGallerySection images={IMG_KITCHEN_GALLERY} />
      <BathroomRemodelingSection services={BATHROOM_SERVICES} />
      <SpaBathroomConversionSection images={IMG_SPA_CONV} />
      <SpaDetailSection bullets={SPA_DETAIL_BULLETS} detailImages={IMG_SPA_DETAIL} />
      <ConstructionCtaSection />
      <BathroomGallerySection images={IMG_BATHROOM_GALLERY} />
      <ConstructionContactSection />
    </main>
  );
});

ConstructionContent.displayName = 'ConstructionContent';

export default ConstructionContent;
