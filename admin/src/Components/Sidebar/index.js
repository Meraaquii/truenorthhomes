import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  RiDashboardLine,
  RiUserLine,
  RiSettingsLine,
  RiMenuLine,
  RiProjectorLine,
  RiAddLine,
  RiArrowDownSLine,
} from "react-icons/ri";
import logo from "../../assets/True North.png";
import "./Sidebar.css";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const [projectMenuOpen, setProjectMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleProjectMenu = () => setProjectMenuOpen(!projectMenuOpen);

  const activePath = location.pathname;

  const handleNavClick = (path) => {
    navigate(path);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  return (
    <aside
      className={`admin-sidebar ${
        sidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      <div className="sidebar-header">
        <img src={logo} alt="Logo" className="sidebar-logo" />
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <RiMenuLine />
        </button>
      </div>

      <nav className="sidebar-nav">
        {/* <button
          className={`nav-item ${activePath === "/dashboard" ? "active" : ""}`}
          onClick={() => handleNavClick("/dashboard")}
        >
          <RiDashboardLine className="nav-icon" />
          <span className="nav-text">Dashboard</span>
        </button> */}

        <button
          className={`nav-item ${
            activePath === "/dashboard/responderList" ? "active" : ""
          }`}
          onClick={() => handleNavClick("/dashboard/responderList")}
        >
          <RiUserLine className="nav-icon" />
          <span className="nav-text">Responder List</span>
        </button>

        <button
          className={`nav-item ${
            activePath === "/dashboard/settings" ? "active" : ""
          }`}
          onClick={() => handleNavClick("/dashboard/settings")}
        >
          <RiSettingsLine className="nav-icon" />
          <span className="nav-text">Settings</span>
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
