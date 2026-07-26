import { createContext, useContext } from 'react';

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: async () => {},
  logout: async () => {},
  updateUser: () => {},
  loadProfile: async () => {},
  saveProfile: async () => {},
  savePassword: async () => {},
});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
