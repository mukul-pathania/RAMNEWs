import React from 'react';
import { useRouter } from 'next/router';
import Headlines from '../components/Headlines';
import useAuth from '../contexts/AuthContext';
import PageLoadingSkeleton from '../components/PageLoadingSkeleton';

const HeadlinesPage = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  if (!isAuthenticated) {
    router.push('/login');
    return <PageLoadingSkeleton />;
  }
  return <Headlines />;
};

export default HeadlinesPage;
