import { createContext, useContext } from 'react';

export const ProjectsContext = createContext({
  loading: false,
  projects: [],
  pagination: null,
  currentProject: null,
  loadProjects: async () => {},
  loadProject: async () => {},
  createProject: async () => {},
  updateProject: async () => {},
  deleteProject: async () => {},
  deleteFeaturedImage: async () => {},
});

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (!context) throw new Error('useProjects must be used inside ProjectsProvider');
  return context;
}
