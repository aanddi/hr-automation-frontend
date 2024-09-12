import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@common/hooks';

const AuthProvider = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const auth = useAuth();

  if (!auth) {
    return <Navigate to="/auth" state={location} replace />;
  }

  return children;
};

export default AuthProvider;
