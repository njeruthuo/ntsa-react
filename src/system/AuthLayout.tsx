import type { RootState } from "@/state/store";
import { Header } from "@/components/parts";

import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const next = params.get("next");

  const redirectTo = next && next.trim() !== "" ? next : "/";

  return (
    <>
      {isLoggedIn ? (
        <Navigate to={redirectTo} replace />
      ) : (
        <>
          <Header pathname={location.pathname} />
          <Outlet />
        </>
      )}
    </>
  );
};

export default AuthLayout;
