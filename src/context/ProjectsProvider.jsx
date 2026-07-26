import { useCallback, useMemo, useState } from 'react';
import {
  fetchProjects,
  fetchProjectById,
  createProject,
  updateProject,
  removeProject,
  removeFeaturedImage,
} from '../api/projects';
import { ProjectsContext } from './ProjectsContext';

export function ProjectsProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentProject, setCurrentProject] = useState(null);

  const loadProjects = useCallback(async (page = 1, limit = 12) => {
    setLoading(true);
    try {
      const { data, error } = await fetchProjects(page, limit);
      if (!error && data) {
        setProjects(data.items);
        setPagination(data.pagination);
      }
      return { data, error };
    } finally {
      setLoading(false);
    }
  }, []);

  const loadProject = useCallback(async (id) => {
    setLoading(true);
    try {
      const { data, error } = await fetchProjectById(id);
      if (!error) setCurrentProject(data);
      return { data, error };
    } finally {
      setLoading(false);
    }
  }, []);

  const addProject = useCallback((payload, options) => createProject(payload, options), []);

  const editProject = useCallback(
    (id, payload, options) => updateProject(id, payload, options),
    [],
  );

  const deleteProject = useCallback(async (id) => {
    const result = await removeProject(id);
    return result;
  }, []);

  const deleteFeaturedImage = useCallback(
    (projectId, imageId) => removeFeaturedImage(projectId, imageId),
    [],
  );

  const value = useMemo(
    () => ({
      loading,
      projects,
      pagination,
      currentProject,
      loadProjects,
      loadProject,
      createProject: addProject,
      updateProject: editProject,
      deleteProject,
      deleteFeaturedImage,
    }),
    [
      loading,
      projects,
      pagination,
      currentProject,
      loadProjects,
      loadProject,
      addProject,
      editProject,
      deleteProject,
      deleteFeaturedImage,
    ],
  );

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
}

export default ProjectsProvider;
