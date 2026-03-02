import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard, LoginPage } from "@/pages";
import AuthLayout from "./AuthLayout";
import MainLayout from "./MainLayout";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={"/"} element={<Dashboard />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path={"/sign-in"} element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
