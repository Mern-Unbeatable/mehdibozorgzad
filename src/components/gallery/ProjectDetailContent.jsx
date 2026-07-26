import React, { memo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProjects } from '../../context/ProjectsContext';
import { ROUTES } from '../../config';
import ProjectDetailSection from './sections/project-detail/ProjectDetailSection';
import ProjectGalleryMosaicSection from './sections/project-detail/ProjectGalleryMosaicSection';

const ProjectDetailContent = memo(() => {
  const { id } = useParams();
  const { loading, currentProject, loadProject } = useProjects();

  useEffect(() => {
    if (id) {
      loadProject(id);
    }
  }, [id, loadProject]);

  const project = currentProject;

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <p className="text-base font-['Lato'] text-[#696664]">Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4 text-center">
        <h1 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-4xl md:text-5xl">
          Project Not Found
        </h1>
        <p className="text-base text-[#4c4946] max-w-md">
          The project you are looking for does not exist.
        </p>
        <Link
          to={ROUTES.PROJECT_GALLERY}
          className="bg-[#0d0b0a] hover:bg-[#1f1b18] transition-colors text-white font-['Lato'] text-base px-8 py-3 rounded cursor-pointer"
        >
          Back to Project Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fbfdff]">
      <ProjectDetailSection project={project} />
      <ProjectGalleryMosaicSection images={project.featuredImages} />
    </div>
  );
});

ProjectDetailContent.displayName = 'ProjectDetailContent';
export default ProjectDetailContent;
