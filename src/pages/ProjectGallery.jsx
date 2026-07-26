import React, { memo } from 'react';
import { useSEO } from '../hooks/useSEO';
import ProjectGalleryContent from '../components/gallery/ProjectGalleryContent';

const ProjectGallery = memo(() => {
  useSEO({
    title: 'Project Gallery | American Carpet & Flooring',
    description:
      'Browse our completed residential and commercial flooring and remodeling projects in Torrance and Gardena, CA.',
  });
  return <ProjectGalleryContent />;
});

ProjectGallery.displayName = 'ProjectGallery';
export default ProjectGallery;
