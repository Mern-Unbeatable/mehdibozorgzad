import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../../../../context/ProjectsContext';
import { ROUTES } from '../../../../config';
import { displayLabel } from '../../../../utils/display';

const PAGE_SIZE = 3;

const ProjectCard = memo(({ project }) => (
  <div className="bg-white flex flex-col gap-6 p-6 rounded shadow-xs">
    <div className="h-52 md:h-64 lg:h-76.25 rounded overflow-hidden shrink-0">
      {project.img ? (
        <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-[#E9E8E8] flex items-center justify-center text-sm font-['Lato'] text-[#696664]">
          No image
        </div>
      )}
    </div>
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        {project.category && (
          <p className="text-sm text-[#6b6b6b] font-['Lato'] tracking-widest uppercase leading-normal">
            {displayLabel(project.category)}
          </p>
        )}
        <div className="flex flex-col gap-3">
          <h3 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-xl lg:text-2xl leading-tight">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="text-[#4c4946] font-['Lato'] text-base lg:text-lg leading-normal line-clamp-2">
              {project.subtitle}
            </p>
          )}
        </div>
      </div>
      <Link
        to={`${ROUTES.PROJECT_GALLERY}/${project.id}`}
        className="bg-[#0d0b0a] hover:bg-[#1f1b18] transition-colors text-white font-['Lato'] text-base lg:text-xl py-3 px-6 rounded w-full text-center cursor-pointer block"
      >
        View Project
      </Link>
    </div>
  </div>
));

ProjectCard.displayName = 'ProjectCard';

const ProjectGalleryGrid = memo(() => {
  const { loading, projects, pagination, loadProjects } = useProjects();
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadProjects(page, PAGE_SIZE);
  }, [page, loadProjects]);

  const resolvedPagination = pagination ?? { total: 0, page: 1, pages: 1 };
  const pageCount = Math.max(1, resolvedPagination.pages ?? 1);
  const total = resolvedPagination.total || projects.length;
  const from = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, total);

  return (
    <section className="pt-14 md:pt-16 lg:pt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 items-center mb-6">
          <h2 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-2xl md:text-3xl lg:text-4xl leading-tight text-center max-w-4xl ">
            Residential &amp; Commercial Flooring Projects
          </h2>
          <div className="flex flex-col gap-4 items-center text-center max-w-4xl">
            <p className="text-base text-[#6b6b6b] leading-7">
              We proudly serve both residential and commercial customers, delivering expert flooring
              installation and remodeling services. Our experienced team ensures every project is
              completed with precision and quality.
            </p>
            <p className="text-base md:text-xl font-['Lato'] text-[#6b6b6b] leading-7">
              Browse our completed flooring and remodeling projects below.
            </p>
          </div>
        </div>

        {loading && (
          <p className="text-center text-base font-['Lato'] text-[#696664] py-16">
            Loading projects...
          </p>
        )}

        {!loading && projects.length === 0 && (
          <p className="text-center text-base font-['Lato'] text-[#696664] py-16">
            No projects available yet.
          </p>
        )}

        {!loading && projects.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {pageCount > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-10">
                <p className="text-base font-['Lato'] text-[#696664]">
                  Showing {from} to {to} of {total} projects
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={page <= 1 || loading}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-4 py-2 rounded-lg border border-[#0d0b0a] text-[#0d0b0a] text-sm font-['Lato'] font-medium hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Previous
                  </button>
                  <span className="text-sm font-['Lato'] text-[#696664] px-2">
                    Page {page} of {pageCount}
                  </span>
                  <button
                    type="button"
                    disabled={page >= pageCount || loading}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-4 py-2 rounded-lg border border-[#0d0b0a] text-[#0d0b0a] text-sm font-['Lato'] font-medium hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
});

ProjectGalleryGrid.displayName = 'ProjectGalleryGrid';

export default ProjectGalleryGrid;
