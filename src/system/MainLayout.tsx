import { useSelector } from "react-redux";

import type { RootState } from "@/state/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to={`/sign-in?next=${location.pathname}`} replace />;
  }

  return <Outlet />;
};

export default MainLayout;
