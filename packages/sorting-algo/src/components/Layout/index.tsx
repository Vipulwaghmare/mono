import { Outlet } from "react-router";
import Header from "../header";

const Layout = () => {
  return (
    <div className="container mx-auto px-2">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
