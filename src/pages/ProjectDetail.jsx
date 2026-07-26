import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import ProjectDetailContent from '../components/gallery/ProjectDetailContent';

const ProjectDetail = memo(() => {
  const { id } = useParams();

  useSEO({
    title: 'Project Details | American Carpet & Flooring',
    description: 'View completed flooring and remodeling project details.',
  });

  return <ProjectDetailContent key={id} />;
});

ProjectDetail.displayName = 'ProjectDetail';
export default ProjectDetail;
