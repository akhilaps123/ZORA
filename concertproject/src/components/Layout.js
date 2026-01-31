import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        {/* The Outlet is where the child routes (Home, Concert, etc.) render */}
        <Outlet />
      </main>
    </>
  );
}

export default Layout;