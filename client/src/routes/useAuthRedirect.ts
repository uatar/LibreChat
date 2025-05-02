import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '~/hooks';
import { relativePaths } from '~/routes/RoutePaths';

export default function useAuthRedirect() {
  const { user, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isAuthenticated) {
        navigate(relativePaths.login, { replace: true });
      }
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [isAuthenticated, navigate]);

  return {
    user,
    isAuthenticated,
  };
}
