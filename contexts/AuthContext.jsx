import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../adapters/api';
import PageLoadingSkeleton from '../components/PageLoadingSkeleton';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const loadUser = async () => {
    try {
      const resp = await api.get('user_info');
      setLoading(false);
      if (!resp || resp.data.error) {
        return;
      }
      setUser(resp.data.user);
    } catch (error) {
      console.log(error.response);
      setLoading(false);
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
      return error.response.data;
    }
  };

  const logout = () => {
    api.get('logout');
    delete api.defaults.headers.Authorization;
    setUser(null);
    router.push('/');
  };

  useEffect(() => {
    loadUser();
  }, []);

  const value = { isAuthenticated: !!user, user, login, loading, logout };
  if (loading) return <PageLoadingSkeleton />;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}
