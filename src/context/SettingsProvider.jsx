import { useCallback, useMemo, useState } from 'react';
import {
  fetchAllSettings,
  fetchAllSettingsFallback,
  fetchSettingsByCategory,
  addSettingItem,
  removeSettingItem,
} from '../api/settings';
import { normalizeSettings } from '../utils/adminSettings';
import { SettingsContext } from './SettingsContext';

export function SettingsProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({});

  const loadSettings = useCallback(async () => {
    setLoading(true);
    try {
      let { data, error } = await fetchAllSettings();

      if (error || !data) {
        const fallback = await fetchAllSettingsFallback();
        data = fallback.data;
        error = fallback.error;
      }

      if (!error) setSettings(normalizeSettings(data ?? {}));
      return { data, error };
    } finally {
      setLoading(false);
    }
  }, []);

  const loadCategory = useCallback((category) => fetchSettingsByCategory(category), []);

  const addItem = useCallback(
    async (category, name) => {
      const result = await addSettingItem(category, name);
      if (!result.error) await loadSettings();
      return result;
    },
    [loadSettings],
  );

  const deleteItem = useCallback(
    async (category, id) => {
      const result = await removeSettingItem(category, id);
      if (!result.error) await loadSettings();
      return result;
    },
    [loadSettings],
  );

  const value = useMemo(
    () => ({ loading, settings, loadSettings, loadCategory, addItem, deleteItem }),
    [loading, settings, loadSettings, loadCategory, addItem, deleteItem],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export default SettingsProvider;
