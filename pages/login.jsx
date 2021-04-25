import { useRouter } from 'next/router';
import Login from '../components/Login';
import PageLoadingSkeleton from '../components/PageLoadingSkeleton';
import useAuth from '../contexts/AuthContext';

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  if (isAuthenticated) {
    router.push('/headlines');
    return <PageLoadingSkeleton />;
  }
  return <Login />;
}
