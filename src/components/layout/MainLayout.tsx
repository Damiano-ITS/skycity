import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import TopBar from "./Topbar/Topbar";
import "./MainLayout.scss";

export default function MainLayout() {
  const location = useLocation();

  const getTitle = (path: string) => {
    switch (path) {
      case "/dashboard":
        return "Dashboard";
      case "/manutenzioni":
        return "Manutenzioni";
      case "/veicoli":
        return "Veicoli";
      case "/stazioni":
        return "Stazioni";
      case "/report":
        return "Report";
      case "/analytics":
        return "Analytics";
      default:
        return "SkyCity";
    }
  };

  const currentTitle = getTitle(location.pathname);

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-layout__content">
        <TopBar currentRouteTitle={currentTitle} />
        <main className="main-layout__page">
          <Outlet />
        </main>
      </div>
    </div>
  );
}