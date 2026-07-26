import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  getStoredSession,
  loginUser,
  logoutUser,
  updateStoredUser,
  fetchProfile,
  saveProfile,
  savePassword,
} from '../api/auth';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on first load
  useEffect(() => {
    setUser(getStoredSession());
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    const result = await loginUser(email, password);
    if (result.success) setUser(result.user);
    return result;
  }, []);

  const logout = useCallback(async () => {
    await logoutUser();
    setUser(null);
  }, []);

  const updateUser = useCallback((updates) => {
    const next = updateStoredUser(updates);
    if (next) setUser(next);
    return next;
  }, []);

  const loadProfile = useCallback(() => fetchProfile(), []);

  const saveProfileData = useCallback(async (payload) => {
    const result = await saveProfile(payload);
    if (!result.error && result.data) {
      updateUser({ fullName: result.data.fullName, email: result.data.email });
    }
    return result;
  }, [updateUser]);

  const savePasswordData = useCallback((payload) => savePassword(payload), []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      loading,
      login,
      logout,
      updateUser,
      loadProfile,
      saveProfile: saveProfileData,
      savePassword: savePasswordData,
    }),
    [user, loading, login, logout, updateUser, loadProfile, saveProfileData, savePasswordData],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
