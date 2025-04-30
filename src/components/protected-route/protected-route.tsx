import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type ProtectedProps = {
  isAuthorized: boolean;
  redirect: string;
  children: ReactNode;
};

export const ProtectedRoute = ({
  isAuthorized,
  redirect,
  children
}: ProtectedProps) => {
  if (!isAuthorized) {
    return <Navigate to={redirect} replace />;
  }

  return children ? children : <Outlet />;
};
