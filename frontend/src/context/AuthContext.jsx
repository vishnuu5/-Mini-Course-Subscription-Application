import { createContext, useState, useCallback, useEffect } from 'react';
import { storage } from '../utils/storage';
import { authAPI } from '../utils/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => storage.getUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.login(email, password);
      storage.setToken(response.token);
      storage.setUser(response.user);
      setUser(response.user);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.signup(name, email, password);
      storage.setToken(response.token);
      storage.setUser(response.user);
      setUser(response.user);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    storage.clear();
    setUser(null);
  }, []);

  const isAuthenticated = !!user && !!storage.getToken();

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
