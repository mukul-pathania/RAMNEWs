import { useRouter } from 'next/router';
import PageLoadingSkeleton from '../components/PageLoadingSkeleton';
import SignUp from '../components/SignUp';
import useAuth from '../contexts/AuthContext';

const SignupPage = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  if (isAuthenticated) {
    router.push('/headlines');
    return <PageLoadingSkeleton />;
  }
  return <SignUp />;
};

export default SignupPage;
