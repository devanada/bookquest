import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useToken } from "@/utils/contexts/token";
import axiosWithConfig from "@/utils/apis/axiosWithConfig";

const ProtectedRoute = () => {
  const { pathname } = useLocation();
  const { token, user, changeToken } = useToken();
  const authProtected = ["/login", "/register"];
  const protectedByToken = [
    "/profile",
    "/edit-profile",
    "/history-borrow",
    "/dashboard",
  ];
  const protectedByRole = ["/dashboard"];

  axiosWithConfig.interceptors.response.use((axiosConfig) => {
    if (axiosConfig.status === 401) changeToken();

    return axiosConfig;
  });

  if (authProtected.includes(pathname)) {
    if (token) return <Navigate to="/" />;
  }

  if (protectedByToken.includes(pathname)) {
    if (!token) return <Navigate to="/login" />;

    if (protectedByRole.includes(pathname)) {
      if (user.role === "user") return <Navigate to="/" />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
