import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, Dashboard2 } from "@/pages";
import AuthLayout from "./AuthLayout";
import MainLayout from "./MainLayout";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={"/"} element={<Dashboard2 />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path={"/sign-in"} element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
