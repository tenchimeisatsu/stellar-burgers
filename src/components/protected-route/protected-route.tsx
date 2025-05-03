import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsAuthorized } from '../../services/slices/userSlice';
import { useSelector } from '../../services/store';

type ProtectedProps = {
  children: ReactNode;
  anonymous: boolean;
};

export const ProtectedRoute = ({
  anonymous = false,
  children
}: ProtectedProps) => {
  const isAuthorized = useSelector(selectIsAuthorized);

  const location = useLocation();
  const from = location.state?.from || '/';
  if (anonymous && isAuthorized) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isAuthorized) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
