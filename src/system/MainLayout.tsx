import { useSelector } from "react-redux";
import Header from "@/components/parts/Header";

import type { RootState } from "@/state/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to={`/sign-in?next=${location.pathname}`} replace />;
  }

  return (
    <>
      <Header pathname={location.pathname} />
      <Outlet />
    </>
  );
};

export default MainLayout;
