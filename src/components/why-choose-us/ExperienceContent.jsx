import React, { memo } from 'react';
import ContactSection from '../common/ContactSection';
import { Users, Clock, Star, Flag, Wrench, Package, ClipboardCheck, ShoppingBag } from 'lucide-react';

const HERO_URL = '/flooringImg.jpg';

const FEATURES = [
  {
    icon: Users,
    title: 'Expert Staff',
    desc: 'Our showroom is a helpful, safe flooring haven, with a full range of wood floor finishing equipment to understand consumer needs.',
  },
  {
    icon: Clock,
    title: 'Shop 24/7',
    desc: 'We have a great set of pre-prefinished wood you can view flooring options and get information online....',
  },
  {
    icon: Star,
    title: 'Exclusive Brands',
    desc: 'We offer a wide selection of materials and finishes from various flooring manufacturers to serve you with ....',
  },
  {
    icon: Flag,
    title: 'Made In The USA',
    desc: 'We carry American-made lines that are "Made in the USA"',
  },
  {
    icon: Wrench,
    title: 'Professional Installation',
    desc: "Full-color 'before & after' site high-quality professional installation by installers who...",
  },
  {
    icon: Package,
    title: 'Eco-Friendly Products',
    desc: 'We offer environmentally-friendly products that are natural, renewable, or using fresh materials and finishes...',
  },
  {
    icon: ClipboardCheck,
    title: 'Compliant Prepped',
    desc: 'We offer a wide selection to become a resource to sell total cost recovery basis of tons from direct fill to floor.',
  },
  {
    icon: ShoppingBag,
    title: 'National Purchasing Power',
    desc: 'We leverage national buying power to get competitive prices on quality flooring materials...',
  },
];

const ExperienceContent = memo(() => (
  <div className="bg-white">
    {/* Hero */}
    <section className="relative h-80 md:h-120 lg:h-140 overflow-hidden">
      <img
        src={HERO_URL}
        alt="The Abbey experience"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative h-full flex flex-col items-start justify-center container mx-auto px-4">
        <h1 className="text-white font-['Playfair_Display'] font-semibold text-4xl md:text-5xl lg:text-[52px] leading-tight max-w-2xl mb-4">
          Why Customers Enjoy Shopping With Us
        </h1>
        <p className="text-white text-base md:text-lg lg:text-xl max-w-xl">
          From first visit to final installation, we&apos;ve crafted an experience that puts you first at
          every step.
        </p>
      </div>
    </section>

    {/* Features Grid */}
    <section className="py-14 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="border border-[#e2e8f0] rounded-xl p-8 flex flex-col gap-4">
              <div className="w-10 h-10 border border-[#e2e8f0] rounded-lg flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-[#3f3f46]" />
              </div>
              <h3 className="font-['Playfair_Display'] font-semibold text-xl text-[#0f172b]">
                {title}
              </h3>
              <p className="text-base text-[#57534d] leading-relaxed font-['Lato']">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Contact */}
    <div id="contact">
      <ContactSection />
    </div>
  </div>
));

ExperienceContent.displayName = 'ExperienceContent';

export default ExperienceContent;
