import { createContext, useContext } from 'react';

export const SettingsContext = createContext({
  loading: false,
  settings: {},
  loadSettings: async () => {},
  loadCategory: async () => {},
  addItem: async () => {},
  deleteItem: async () => {},
});

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used inside SettingsProvider');
  return context;
}
