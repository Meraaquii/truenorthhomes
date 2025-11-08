import React, { useState } from "react";
import {
  RiNotificationLine,
  RiSunLine,
  RiMoonLine,
  RiArrowDownSLine,
  RiAccountCircleLine,
  RiSettingsLine,
  RiLogoutCircleRLine,
} from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { API } from "../Context/Context";
import "./Navbar.css";

function Navbar({
  search,
  setSearch,
  darkMode,
  toggleTheme,
  activeTab,
  exportToCSV,
  exportToXML,
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Customer",
      message: "John Doe signed up",
      time: "5 min ago",
      read: false,
    },
    {
      id: 2,
      title: "Message Received",
      message: "New contact form submission",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "System Update",
      message: "Dashboard updated to v2.1",
      time: "2 hours ago",
      read: true,
    },
    {
      id: 4,
      title: "Payment Received",
      message: "Customer payment processed",
      time: "3 hours ago",
      read: false,
    },
  ]);

  const [userProfile] = useState({
    name: "Admin User",
    email: "admin@example.com",
    role: "Administrator",
    avatar: null,
  });

  const navigate = useNavigate();

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/logout`);
      if (response.data.status === 1) {
        localStorage.removeItem("User");
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };

  const markNotificationAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <nav className="admin-navbar">
      <div className="navbar-content">
        <div className="navbar-right">
          <div className="navbar-search">
            <input
              type="text"
              className="navbar-search-input"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <IoSearchSharp className="navbar-search-icon" />
          </div>

          <div className="navbar-actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <RiSunLine /> : <RiMoonLine />}
            </button>

            {/* <div className="notification-wrapper">
              <button
                className="notification-btn"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <RiNotificationLine />
                {unreadNotificationsCount > 0 && (
                  <span className="notification-badge">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="notification-dropdown">
                  <div className="notification-header">
                    <h3>Notifications</h3>
                    <div className="notification-header-actions">
                      <span className="notification-count">
                        {unreadNotificationsCount} unread
                      </span>
                    </div>
                  </div>
                  <div className="notification-list">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`notification-item ${
                            notification.read ? "read" : "unread"
                          }`}
                          onClick={() =>
                            markNotificationAsRead(notification.id)
                          }
                        >
                          <div className="notification-icon">
                            <div className="notification-dot"></div>
                          </div>
                          <div className="notification-content">
                            <h4>{notification.title}</h4>
                            <p>{notification.message}</p>
                            <span className="notification-time">
                              {notification.time}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="no-notifications">No notifications</div>
                    )}
                  </div>
                </div>
              )}
            </div> */}

            <div className="profile-wrapper">
              <button
                className="profile-menu-item logout"
                onClick={handleLogOut}
              >
                <RiLogoutCircleRLine />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
