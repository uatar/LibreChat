import React from 'react';
import { useApiErrorBoundary } from '~/hooks/ApiErrorBoundaryContext';
import { useNavigate } from 'react-router-dom';
// import { relativePaths } from '~/routes/RoutePaths';

const ApiErrorWatcher = () => {
  const { error } = useApiErrorBoundary();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (error?.response?.status === 500) {
      // do something with error
      // navigate(`${relativePaths.login}/login`);
    }
  }, [error, navigate]);

  return null;
};

export default ApiErrorWatcher;
