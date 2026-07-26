import { ROUTES } from '../../config';

export const HERO_SLIDES = [
  {
    id: 'hero',
    image: '/flooringImg.jpg',
    overlay: 'bg-black/45',
    eyebrow: 'Since 1981',
    title: 'Elevate Your Space',
    subtitle: 'Premium flooring & remodeling solutions for Torrance & South Bay',
    cta: [
      { label: 'Explore Collections', href: ROUTES.FLOORING, variant: 'primary' },
      { label: 'Visit Showroom', href: ROUTES.OUR_LOCATIONS, variant: 'outline' },
    ],
    trust: 'Trusted by South Bay homeowners for over 40 years',
  },
  {
    id: 'carpet',
    image: '/carpetHero.webp',
    overlay: 'bg-black/20',
    title: 'Carpet On Sale',
    subtitle: 'Now Up To 70% Off',
    cta: [{ label: 'Learn More', href: ROUTES.CARPET_SALE, variant: 'white-pill' }],
  },
  {
    id: 'hardwood',
    image: '/constgallery3.jpg',
    overlay: 'bg-black/20',
    title: 'Hardwood On Sale',
    subtitle: 'Now Up To 70% Off',
    cta: [{ label: 'Learn More', href: ROUTES.HARDWOOD_SALE, variant: 'white-pill' }],
  },
  {
    id: 'luxury-vinyl',
    image: '/constgallery5.jpg',
    overlay: 'bg-black/30',
    title: 'Luxury Vinyl On Sale',
    subtitle: 'Now Up To 40% Off',
    cta: [{ label: 'Learn More', href: ROUTES.LUXURY_VINYL_SALE, variant: 'white-pill' }],
  },
  {
    id: 'savings',
    image: '/constgallery7.jpg',
    overlay: 'bg-black/30',
    title: 'Savings Up To 70%',
    subtitle: 'Many Selections of Waterproof Flooring & Floor Tile',
    cta: [{ label: 'Learn More', href: ROUTES.SAVINGS, variant: 'white-pill' }],
  },
  {
    id: 'financing',
    image: '/remodelingImg.jpg',
    overlay: 'bg-black/30',
    title: 'Special Financing Available',
    subtitle: 'Upgrade your Home Today, Pay over time.',
    cta: [{ label: 'Learn More', href: ROUTES.FINANCING, variant: 'white-pill' }],
  },
];

export const SLIDE_INTERVAL_MS = 5000;

export const ASSETS = {
  heroBg: '/constHero.jpg',
  aboutRoom: '/about2.webp',
  localStore: '/about1.webp',
  warehouseMap: '/aboutHero.jpg',
  serviceIcons: {
    countertops: '/constgallery9.jpg',
    cabinetry: '/constgallery6.jpg',
    windows: '/constgallery11.jpg',
    remodeling: '/remodelingImg.jpg',
  },
};

export const FLOORING_TYPES = [
  {
    id: 'carpet',
    title: 'Shop Carpet',
    description: 'Add warmth to any room with lush carpet. Your feet will thank you.',
    cta: 'Explore Carpet',
    href: ROUTES.CARPET_SALE,
    image: '/carpetHero.webp',
  },
  {
    id: 'hardwood',
    title: 'Shop Hardwood',
    description: 'Add true character to your home with the robust & richness of hardwood.',
    cta: 'Explore Hardwood',
    href: ROUTES.HARDWOOD_SALE,
    image: '/constgallery3.jpg',
  },
  {
    id: 'laminate',
    title: 'Shop Laminate',
    description: 'Laminate flooring can be installed almost anywhere and for any lifestyle.',
    cta: 'Explore Laminate',
    href: `${ROUTES.FLOORING}?tab=floors`,
    image: '/flooringImg.jpg',
  },
  {
    id: 'tile',
    title: 'Shop Tile',
    description:
      'Tile flooring is an elegant and luxurious choice that will last you years to come.',
    cta: 'Explore Tile',
    href: `${ROUTES.FLOORING}?tab=walls`,
    image: '/constgallery12.jpg',
  },
];

export const SERVICES = [
  {
    id: 'countertops',
    title: 'Custom Countertops',
    description:
      'Transform your kitchen with stunning countertops and backsplashes tailored to your vision.',
    icon: ASSETS.serviceIcons.countertops,
  },
  {
    id: 'cabinetry',
    title: 'Custom Cabinetry',
    description: 'Precision-crafted cabinets that blend beauty with functionality for any room.',
    icon: ASSETS.serviceIcons.cabinetry,
  },
  {
    id: 'windows',
    title: 'Window Fashions',
    description: 'Elevate your space with elegant window treatments from Graber.',
    icon: ASSETS.serviceIcons.windows,
  },
  {
    id: 'remodeling',
    title: 'Total Remodeling',
    description: 'Complete home transformations from concept to completion.',
    icon: ASSETS.serviceIcons.remodeling,
  },
];

export const TESTIMONIALS = [
  {
    id: 't1',
    author: 'Richard J.',
    text: 'Mehdi and his team did a terrific job on the engineered hardwood flooring installation and walk-in closet addition. Great eye for envisioning improvements that add value to the home.',
  },
  {
    id: 't2',
    author: 'Joseph G.',
    text: 'Outstanding job painting my entire house and replacing carpet. Completed quickly with exceptional professionalism. Highly recommend.',
  },
  {
    id: 't3',
    author: 'Aaron P.',
    text: 'My kitchen was in desperate need of a makeover. They helped me choose perfect cabinetry, countertops, and flooring. The result is a fresh, updated kitchen my family adores.',
  },
  {
    id: 't4',
    author: 'Andrew K.',
    text: 'Ricardo and his team did an amazing job ahead of schedule! We love our new floor and will recommend American Carpet to everyone.',
  },
];

export const SHOWROOM_INFO = {
  address: '23837 Hawthorne Blvd, Torrance, CA 90505',
  phone: '(310) 375-4545',
  hours: 'Mon–Sat: 10am – 6pm',
};
