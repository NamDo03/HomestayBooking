import React from "react";
import { isAuthenticated } from "./requestApi";
import { Navigate } from "react-router-dom";
type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuth = isAuthenticated();
  return isAuth ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
