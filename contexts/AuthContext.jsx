import { createContext, useContext, useEffect, useState } from 'react';
import Router from 'next/router';
import api from '../adapters/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const resp = await api.get('user_info');
      if (!resp) return;
      if (resp.data.error) {
        setLoading(false);
        return;
      }
      setUser(resp.data.user);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      return null;
    }
  };

  const login = async (payload) => {
    try {
      const resp = await api.post('login', payload);
      const loginInfo = { error: resp.data.error, message: resp.data.message };
      if (resp.data.error) {
        return loginInfo;
      }
      api.defaults.headers.Authorization = `Bearer ${resp.data.token}`;
      loadUser();
      return loginInfo;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const logout = () => {
    api.get('logout');
    delete api.defaults.headers.Authorization;
    Router.push('/login');
  };

  useEffect(() => {
    loadUser();
  }, []);

  const value = { isAuthenticated: !!user, user, login, loading, logout };

  console.log(user, loading);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export default useAuth;
