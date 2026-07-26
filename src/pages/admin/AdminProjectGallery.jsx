import { useState, useCallback, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../../context/ProjectsContext';
import { ROUTES } from '../../config';
import { confirmDelete } from '../../utils/swal';
import toast from 'react-hot-toast';
import { displayLabel } from '../../utils/display';
import { getProjectCoverImage } from '../../utils/projects';

const getProjectImage = getProjectCoverImage;

const AdminProjectGallery = () => {
  const navigate = useNavigate();
  const { loading, projects, pagination, loadProjects, deleteProject } = useProjects();

  const [page, setPage] = useState(1);
  const PAGE_SIZE = 12;

  useEffect(() => {
    loadProjects(page, PAGE_SIZE);
  }, [page, loadProjects]);

  const resolvedPagination = pagination ?? { total: 0, page: 1, pages: 1 };
  const pageCount = Math.max(1, resolvedPagination.pages ?? 1);
  const total = resolvedPagination.total || projects.length;
  const from = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, total);

  const handleDelete = useCallback(
    async (project) => {
      const confirmed = await confirmDelete({
        title: 'Delete project?',
        text: `Remove "${project.title}"? This action cannot be undone.`,
        confirmButtonText: 'Yes, delete it',
      });

      if (!confirmed) return;

      const { error } = await deleteProject(project.id);

      if (error) {
        toast.error(error);
        return;
      }

      toast.success('Project deleted');

      const isLastItemOnPage = projects.length === 1;
      if (isLastItemOnPage && page > 1) {
        setPage((p) => p - 1);
      } else {
        loadProjects(page, PAGE_SIZE);
      }
    },
    [deleteProject, loadProjects, page, projects.length],
  );

  return (
    <section className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-2xl sm:text-3xl leading-tight">
            Project Gallery
          </h1>
          <p className="mt-1 text-base font-['Lato'] text-[#696664]">
            Showcase completed flooring and design projects.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate(ROUTES.ADMIN_GALLERY_ADD)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0d0b0a] hover:bg-[#1f1b18] text-white rounded-full text-base font-medium font-['Lato'] transition-colors shrink-0 cursor-pointer"
        >
          <Plus size={18} aria-hidden="true" />
          Add New Project
        </button>
      </div>

      {loading && <p className="text-base font-['Lato'] text-[#696664]">Loading...</p>}

      {!loading && projects.length === 0 && (
        <p className="text-base font-['Lato'] text-[#696664]">
          No projects yet. Add your first project.
        </p>
      )}

      {!loading && projects.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project) => {
              const image = getProjectImage(project);

              return (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                >
                  {image ? (
                    <img
                      src={image}
                      alt={project.title || 'Project'}
                      className="w-full h-52 object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement
                          ?.querySelector('[data-project-image-fallback]')
                          ?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div
                    data-project-image-fallback
                    className={`w-full h-52 bg-[#E9E8E8] flex items-center justify-center text-sm font-['Lato'] text-[#696664] ${
                      image ? 'hidden' : ''
                    }`}
                  >
                    No image
                  </div>
                  <div className="p-5 space-y-3">
                    {project.category && (
                      <span className="block text-[12px] font-medium uppercase tracking-[0.24em] font-['Lato'] text-[#6f6964] leading-none">
                        {displayLabel(project.category)}
                      </span>
                    )}
                    <h3 className="font-['Playfair_Display'] font-semibold text-[#1c1917] text-[27px] sm:text-[31px] leading-[1.14]">
                      {project.title}
                    </h3>
                    {project.shortDescription && (
                      <p className="font-['Lato'] font-normal text-[16px] sm:text-[17px] leading-[1.35] text-[#4c4946] line-clamp-2">
                        {project.shortDescription}
                      </p>
                    )}
                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(ROUTES.ADMIN_GALLERY_ADD, {
                            state: { editProject: project },
                          })
                        }
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0d0b0a] hover:bg-[#1f1b18] text-white rounded-lg text-sm font-medium font-['Lato'] transition-colors cursor-pointer"
                      >
                        <Pencil size={14} aria-hidden="true" /> Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(project)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-[#0d0b0a] text-[#0d0b0a] hover:bg-gray-50 rounded-lg text-sm font-medium font-['Lato'] transition-colors cursor-pointer"
                      >
                        <Trash2 size={14} aria-hidden="true" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-base font-['Lato'] text-[#696664]">
              {total === 0 ? 'No results' : `Showing ${from} to ${to} of ${total} results`}
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
        </>
      )}
    </section>
  );
};

export default AdminProjectGallery;
