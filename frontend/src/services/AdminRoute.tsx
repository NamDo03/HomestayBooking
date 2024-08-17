import React from "react";
import { isAdmin } from "./requestApi";
import { Navigate } from "react-router-dom";
type AdminRouteProps = {
  children: React.ReactNode;
};

const AdminRoute = ({ children }: AdminRouteProps) => {
  return isAdmin() ? <>{children}</> : <Navigate to="/login" />;
};

export default AdminRoute;
