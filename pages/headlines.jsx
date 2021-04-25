import React from 'react';
import { Router, useRouter } from 'next/router';
import Headlines from '../components/Headlines';
import Login from './login';
import useAuth from '../contexts/AuthContext';

const HeadlinesPage = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  if (!isAuthenticated) router.push('/login');
  return <Headlines />;
};

export default HeadlinesPage;
