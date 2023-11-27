import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useToken } from "@/utils/contexts/token";

const ProtectedRoute = () => {
  const { pathname } = useLocation();
  const { token, user } = useToken();

  const authProtected = ["/login", "/register"];
  const protectedByToken = [
    "/profile",
    "/edit-profile",
    "/history-borrow",
    "/dashboard",
  ];
  const adminProtected = ["/dashboard"];
  const userProtected = ["/history-borrow"];

  if (authProtected.includes(pathname)) {
    if (token) return <Navigate to="/" />;
  }

  if (protectedByToken.includes(pathname)) {
    if (!token) return <Navigate to="/login" />;

    if (adminProtected.includes(pathname)) {
      if (user.role === "user") return <Navigate to="/" />;
    }

    if (userProtected.includes(pathname)) {
      if (user.role === "admin") return <Navigate to="/" />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
