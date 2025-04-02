import { useAuth } from '@/hooks/useAuth';
import { Redirect } from 'expo-router';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href='/auth' />;
  }

  return children;
};

export default ProtectedRoute;
