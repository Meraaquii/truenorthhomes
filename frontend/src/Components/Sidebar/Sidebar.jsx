import React, { useState } from "react";
import { Link } from "react-router-dom";
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

function Sidebar({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab }) {
  const [projectMenuOpen, setProjectMenuOpen] = useState(false);

  const toggleProjectMenu = () => {
    setProjectMenuOpen(!projectMenuOpen);
  };

  const handleNavClick = (tabName) => {
    setActiveTab(tabName);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
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
          className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
          onClick={() => handleNavClick("dashboard")}
        >
          <RiDashboardLine className="nav-icon" />
          <span className="nav-text">Dashboard</span>
        </button> */}

        {/* <div className="nav-section">
          <button
            className={`nav-item has-submenu ${
              projectMenuOpen ? "submenu-open" : ""
            }`}
            onClick={toggleProjectMenu}
          >
            <RiProjectorLine className="nav-icon" />
            <span className="nav-text">Projects</span>
            <RiArrowDownSLine
              className={`submenu-arrow ${projectMenuOpen ? "rotate" : ""}`}
            />
          </button>

          <div className={`submenu ${projectMenuOpen ? "submenu-open" : ""}`}>
            <Link
              to="/project/all"
              className="submenu-item"
              onClick={() => handleNavClick("all-projects")}
            >
              <span className="submenu-text">All Projects</span>
            </Link>
            <Link
              to="/project/add"
              className="submenu-item"
              onClick={() => handleNavClick("add-project")}
            >
              <RiAddLine className="submenu-icon" />
              <span className="submenu-text">Add Project</span>
            </Link>
          </div>
        </div> */}

        <button
          className={`nav-item ${activeTab === "customers" ? "active" : ""}`}
          onClick={() => handleNavClick("customers")}
        >
          <RiUserLine className="nav-icon" />
          <span className="nav-text">Responder List</span>
        </button>

        <button
          className={`nav-item ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => handleNavClick("settings")}
        >
          <RiSettingsLine className="nav-icon" />
          <span className="nav-text">Settings</span>
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
