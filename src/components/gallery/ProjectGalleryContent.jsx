import React, { memo } from 'react';
import ServiceContactForm from '../services/shared/ServiceContactForm';
import LocationCards from '../services/shared/LocationCards';
import ProjectGalleryHero from './sections/project-gallery/ProjectGalleryHero';
import ProjectGalleryGrid from './sections/project-gallery/ProjectGalleryGrid';

const LOC1_IMG = '/about1.webp';
const LOC2_IMG = '/about2.webp';

const ProjectGalleryContent = memo(() => (
  <div className="bg-[#FBFDFF]">
    <ProjectGalleryHero />
    <ProjectGalleryGrid />

    {/* Contact Form */}
    <ServiceContactForm
      title="Get Started Today!"
      desc="Begin your own remodeling journey with American Carpet & Flooring! Our team is here to help you every step of the way."
    />

    {/* Location Cards */}
    <LocationCards loc1Img={LOC1_IMG} loc2Img={LOC2_IMG} />
  </div>
));

ProjectGalleryContent.displayName = 'ProjectGalleryContent';
export default ProjectGalleryContent;
