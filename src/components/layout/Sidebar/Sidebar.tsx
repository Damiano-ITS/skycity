import { NavLink } from "react-router-dom";
import { Can } from "../../auth/Can";
import { PERMISSIONS } from "../../../config/permissions";
import "./Sidebar.scss";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__logo">
          <i className="fa-solid fa-building-user"></i>
          <span>SkyCity</span>
        </div>
        <h2 className="sidebar__city">Pordenone</h2>
      </div>

      <nav className="sidebar__nav">
        <Can perform={PERMISSIONS.DASHBOARD_VIEW}>
          <NavLink to="/dashboard" className="sidebar__link">
            <i className="fa-solid fa-table-columns sidebar__icon"></i>
            <span className="sidebar__text">Dashboard</span>
          </NavLink>
        </Can>

        <Can perform={PERMISSIONS.MANUTENZIONI_VIEW}>
          <NavLink to="/manutenzioni" className="sidebar__link">
            <i className="fa-solid fa-screwdriver-wrench sidebar__icon"></i>
            <span className="sidebar__text">Manutenzioni</span>
          </NavLink>
        </Can>

        <Can perform={PERMISSIONS.VEICOLI_VIEW}>
          <NavLink to="/veicoli" className="sidebar__link">
            <i className="fa-solid fa-car sidebar__icon"></i>
            <span className="sidebar__text">Veicoli</span>
          </NavLink>
        </Can>

        <Can perform={PERMISSIONS.STAZIONI_VIEW}>
          <NavLink to="/stazioni" className="sidebar__link">
            <i className="fa-solid fa-charging-station sidebar__icon"></i>
            <span className="sidebar__text">Stazioni</span>
          </NavLink>
        </Can>

        <Can perform={PERMISSIONS.ANALYTICS_VIEW}>
          <NavLink to="/analytics" className="sidebar__link">
            <i className="fa-solid fa-chart-bar sidebar__icon"></i>
            <span className="sidebar__text">Analytics</span>
          </NavLink>
        </Can>
      </nav>
    </aside>
  );
}