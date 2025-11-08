import React, { useEffect, useState, useMemo } from "react";
import {
  RiLogoutCircleRLine,
  RiDashboardLine,
  RiUserLine,
  RiSettingsLine,
  RiMenuLine,
  RiNotificationLine,
  RiSunLine,
  RiMoonLine,
  RiAccountCircleLine,
  RiArrowDownSLine,
} from "react-icons/ri";
import { IoSearchSharp, IoDownloadOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { API } from "../Context/Context";
import logo from "../../assets/logo-default-black.png";
import "./CustomerDetails.css";

// Import chart components
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function CustomerDetails() {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
  });

  const tablePage = 10;
  const navigate = useNavigate();

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("admin-theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark-theme");
    }

    // Load mock notifications
    setNotifications([
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

    // Mock user profile
    setUserProfile({
      name: "Admin User",
      email: "admin@example.com",
      role: "Administrator",
      avatar: null,
    });
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark-theme");
      localStorage.setItem("admin-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark-theme");
      localStorage.setItem("admin-theme", "light");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid Date";

      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };

  const calculateStats = (data) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const todayCount = data.filter((customer) => {
      const customerDate = new Date(customer.date);
      return customerDate.toDateString() === today.toDateString();
    }).length;

    const weekCount = data.filter((customer) => {
      const customerDate = new Date(customer.date);
      return customerDate >= startOfWeek;
    }).length;

    const monthCount = data.filter((customer) => {
      const customerDate = new Date(customer.date);
      return customerDate >= startOfMonth;
    }).length;

    setStats({
      total: data.length,
      today: todayCount,
      thisWeek: weekCount,
      thisMonth: monthCount,
    });
  };

  const repeatCustomerData = useMemo(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const sampleRates = [
      3.2, 4.1, 3.8, 4.5, 5.1, 5.44, 4.9, 5.2, 5.6, 5.8, 6.1, 6.3,
    ];

    return months.map((month, index) => ({
      month,
      rate: sampleRates[index],
      trend: index > 0 ? sampleRates[index] - sampleRates[index - 1] : 0,
    }));
  }, [customers]);

  // Monthly signups data for bar chart
  const monthlySignupsData = useMemo(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months.map((month) => ({
      month,
      signups: Math.floor(Math.random() * 50) + 10,
    }));
  }, []);

  // Customer distribution data for pie chart
  const customerDistributionData = [
    { name: "New Customers", value: 65 },
    { name: "Returning Customers", value: 25 },
    { name: "VIP Customers", value: 10 },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

  const filteredCustomers = useMemo(() => {
    return customers.filter(
      (user) =>
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase()) ||
        user.message?.toLowerCase().includes(search.toLowerCase())
    );
  }, [customers, search]);

  const totalList = currentPage * tablePage;
  const firstPage = totalList - tablePage;
  const currentCustomers = filteredCustomers.slice(firstPage, totalList);
  const totalPages = Math.ceil(filteredCustomers.length / tablePage);

  const getCustomerDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API}/contact`);
      const result = await response.json();
      if (result.status === 1) {
        setCustomers(result.data);
        calculateStats(result.data);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to fetch customer details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCustomerDetails();
  }, []);

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

  const exportToCSV = () => {
    const headers = "Name,Email,Message,Date\n";
    const rows = customers
      .map(
        (c) => `"${c.name}","${c.email}","${c.message}","${formatDate(c.date)}"`
      )
      .join("\n");

    const csvContent = headers + rows;
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `customer_details_${
      new Date().toISOString().split("T")[0]
    }.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Data exported to CSV successfully");
  };

  const exportToXML = () => {
    let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n<customers>\n';
    customers.forEach((c) => {
      xmlContent += `  <customer>\n`;
      xmlContent += `    <name>${c.name}</name>\n`;
      xmlContent += `    <email>${c.email}</email>\n`;
      xmlContent += `    <message>${c.message}</message>\n`;
      xmlContent += `    <date>${formatDate(c.date)}</date>\n`;
      xmlContent += `  </customer>\n`;
    });
    xmlContent += "</customers>";

    const blob = new Blob([xmlContent], { type: "text/xml" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `customer_details_${
      new Date().toISOString().split("T")[0]
    }.xml`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Data exported to XML successfully");
  };

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{`${label}`}</p>
          <p className="tooltip-value">
            <span
              className="tooltip-dot"
              style={{ backgroundColor: "#10b981" }}
            ></span>
            {`Repeat Rate: ${payload[0].value}%`}
          </p>
        </div>
      );
    }
    return null;
  };

  const markNotificationAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // const markAllNotificationsAsRead = () => {
  //   setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  // };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <div
      className={`admin-container ${
        sidebarOpen ? "sidebar-open" : "sidebar-closed"
      } ${darkMode ? "dark-theme" : ""}`}
    >
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="sidebar-logo" />
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <RiMenuLine />
          </button>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            <RiDashboardLine className="nav-icon" />
            <span className="nav-text">Dashboard</span>
          </button>
          <button
            className={`nav-item ${activeTab === "customers" ? "active" : ""}`}
            onClick={() => setActiveTab("customers")}
          >
            <RiUserLine className="nav-icon" />
            <span className="nav-text">Customers</span>
          </button>
          <button
            className={`nav-item ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <RiSettingsLine className="nav-icon" />
            <span className="nav-text">Settings</span>
          </button>
        </nav>
      </aside>

      <main className="admin-main">
        <nav className="admin-navbar">
          <div className="navbar-content">
            <div className="navbar-left">
              {/* <h1 className="navbar-title">
                {activeTab === "dashboard" && "Dashboard"}
                {activeTab === "customers" && "Customer Management"}
                {activeTab === "settings" && "Settings"}
              </h1> */}
            </div>

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
                {/* Theme Toggle */}
                <button
                  className="theme-toggle"
                  onClick={toggleTheme}
                  title={
                    darkMode ? "Switch to light mode" : "Switch to dark mode"
                  }
                >
                  {darkMode ? <RiSunLine /> : <RiMoonLine />}
                </button>

                {/* Notifications */}
                <div className="notification-wrapper">
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
                          {/* <button
                            className="mark-all-read"
                            onClick={markAllNotificationsAsRead}
                          >
                            Mark all as read
                          </button> */}
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
                          <div className="no-notifications">
                            No notifications
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile */}
                <div className="profile-wrapper">
                  <button
                    className="profile-btn"
                    onClick={() => setShowProfile(!showProfile)}
                  >
                    <div className="profile-avatar-sm">
                      {userProfile?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="profile-name">{userProfile?.name}</span>
                    <RiArrowDownSLine className="profile-arrow" />
                  </button>

                  {showProfile && (
                    <div className="profile-dropdown">
                      <div className="profile-header">
                        <div className="profile-avatar">
                          {userProfile?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="profile-info">
                          <h4>{userProfile?.name}</h4>
                          <p>{userProfile?.email}</p>
                          <span className="profile-role">
                            {userProfile?.role}
                          </span>
                        </div>
                      </div>
                      <div className="profile-menu">
                        <button className="profile-menu-item">
                          <RiAccountCircleLine />
                          My Profile
                        </button>
                        <button className="profile-menu-item">
                          <RiSettingsLine />
                          Account Settings
                        </button>
                        <hr />
                        <button
                          className="profile-menu-item logout"
                          onClick={handleLogOut}
                        >
                          <RiLogoutCircleRLine />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <select
                  className="export-select"
                  onChange={(e) => {
                    if (e.target.value === "csv") exportToCSV();
                    else if (e.target.value === "xml") exportToXML();
                    e.target.value = ""; // Reset select
                  }}
                >
                  <option value="">Export Data</option>
                  <option value="csv">Export as CSV</option>
                  <option value="xml">Export as XML</option>
                </select>
              </div>
            </div>
          </div>
        </nav>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-info">
              <h3 className="stat-value">{stats.total}</h3>
              <p className="stat-label">Total Customers</p>
            </div>
            <div className="stat-icon total">
              <RiUserLine />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-info">
              <h3 className="stat-value">{stats.today}</h3>
              <p className="stat-label">Today</p>
            </div>
            <div className="stat-icon today">
              <RiUserLine />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-info">
              <h3 className="stat-value">{stats.thisWeek}</h3>
              <p className="stat-label">This Week</p>
            </div>
            <div className="stat-icon week">
              <RiUserLine />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-info">
              <h3 className="stat-value">{stats.thisMonth}</h3>
              <p className="stat-label">This Month</p>
            </div>
            <div className="stat-icon month">
              <RiUserLine />
            </div>
          </div>
        </div>

        {activeTab === "dashboard" && (
          <div className="dashboard-content">
            {/* Charts Grid */}
            <div className="charts-grid">
              <div className="chart-card main-chart">
                <div className="chart-header">
                  <h3 className="chart-title">Repeat Customer Rate</h3>
                  <div className="chart-stats">
                    <div className="current-rate">5.44%</div>
                    <div className="rate-change positive">+2.6%</div>
                  </div>
                </div>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={repeatCustomerData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="var(--chart-grid)"
                      />
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "var(--text-secondary)" }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "var(--text-secondary)" }}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="rate"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ fill: "#10b981", r: 4 }}
                        activeDot={{ r: 6, fill: "#10b981" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="charts-sidebar">
                <div className="chart-card">
                  <div className="chart-header">
                    <h3 className="chart-title">Monthly Signups</h3>
                  </div>
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={monthlySignupsData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          stroke="var(--chart-grid)"
                        />
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                        />
                        <Tooltip />
                        <Bar
                          dataKey="signups"
                          fill="#3b82f6"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="chart-card">
                  <div className="chart-header">
                    <h3 className="chart-title">Customer Distribution</h3>
                  </div>
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={customerDistributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={70}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {customerDistributionData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="chart-legend">
                      {customerDistributionData.map((entry, index) => (
                        <div key={entry.name} className="legend-item">
                          <div
                            className="legend-color"
                            style={{ backgroundColor: COLORS[index] }}
                          ></div>
                          <span>{entry.name}</span>
                          <span className="legend-value">{entry.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Customers List */}
            <div className="recent-customers-card">
              <div className="card-header-inline">
                <h3 className="card-title">Recent Customers</h3>
                <button
                  className="view-all-btn"
                  onClick={() => setActiveTab("customers")}
                >
                  View All
                </button>
              </div>
              <div className="recent-customers-list">
                {customers.slice(0, 6).map((customer, index) => (
                  <div
                    key={customer.id || index}
                    className="recent-customer-item"
                  >
                    <div className="customer-avatar">
                      {customer.name?.charAt(0).toUpperCase() || "C"}
                    </div>
                    <div className="customer-info">
                      <p className="customer-name">{customer.name}</p>
                      <p className="customer-email">{customer.email}</p>
                    </div>
                    <div className="customer-meta">
                      <p className="customer-date">
                        {formatDate(customer.date)}
                      </p>
                      <div className="customer-message-preview">
                        {customer.message?.substring(0, 50)}...
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Customers Table View */}
        {activeTab === "customers" && (
          <div className="content-card">
            <div className="card-header">
              <div className="card-header-content">
                <div>
                  <h2 className="card-title">Customer Details</h2>
                  {/* <p className="card-subtitle">
                    Showing {currentCustomers.length} of{" "}
                    {filteredCustomers.length} customers
                  </p> */}
                </div>
                <div className="card-actions">
                  <button className="refresh-btn" onClick={getCustomerDetails}>
                    Refresh
                  </button>
                </div>
              </div>
            </div>

            <div className="table-container">
              {loading ? (
                <div className="loading-state">
                  <div className="loading-spinner"></div>
                  <p>Loading customer data...</p>
                </div>
              ) : (
                <>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentCustomers.length > 0 ? (
                        currentCustomers.map((customer, index) => (
                          <tr key={customer.id || index}>
                            <td className="id-cell">{firstPage + index + 1}</td>
                            <td className="name-cell">
                              <div className="customer-name-with-avatar">
                                {/* <div className="table-avatar">
                                  {customer.name?.charAt(0).toUpperCase() ||
                                    "C"}
                                </div> */}
                                <div className="customer-details">
                                  <div className="customer-name">
                                    {customer.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="email-cell">{customer.email}</td>
                            <td className="message-cell">
                              <div
                                className="message-truncate"
                                title={customer.message}
                              >
                                {customer.message}
                              </div>
                            </td>
                            <td className="date-cell">
                              {formatDate(customer.date)}
                            </td>
                            <td className="actions-cell">
                              <div className="action-buttons">
                                <button
                                  className="action-btn view-btn"
                                  title="View Details"
                                >
                                  View
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="no-data">
                            <div className="no-data-content">
                              <RiUserLine className="no-data-icon" />
                              <h3>No customers found</h3>
                              <p>Try adjusting your search criteria</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  {totalPages > 1 && (
                    <div className="pagination">
                      <button
                        className="pagination-btn"
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>

                      <div className="pagination-numbers">
                        {[...Array(totalPages)].map((_, idx) => (
                          <button
                            key={idx + 1}
                            className={`pagination-number ${
                              currentPage === idx + 1 ? "active" : ""
                            }`}
                            onClick={() => setCurrentPage(idx + 1)}
                          >
                            {idx + 1}
                          </button>
                        ))}
                      </div>

                      <button
                        className="pagination-btn"
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="content-card">
            <div className="card-header">
              <h2 className="card-title">Settings</h2>
              <p className="card-subtitle">
                Manage your application preferences
              </p>
            </div>
            <div className="settings-content">
              <div className="setting-group">
                <h3 className="setting-group-title">Appearance</h3>
                <div className="setting-item">
                  <div className="setting-info">
                    <label className="setting-label">Theme Mode</label>
                    <p className="setting-description">
                      Choose between light and dark themes
                    </p>
                  </div>
                  <div className="theme-options">
                    <button
                      className={`theme-option ${!darkMode ? "active" : ""}`}
                      onClick={() => setDarkMode(false)}
                    >
                      <RiSunLine />
                      Light
                    </button>
                    <button
                      className={`theme-option ${darkMode ? "active" : ""}`}
                      onClick={() => setDarkMode(true)}
                    >
                      <RiMoonLine />
                      Dark
                    </button>
                  </div>
                </div>
              </div>

              <div className="setting-group">
                <h3 className="setting-group-title">Notifications</h3>
                <div className="setting-item">
                  <div className="setting-info">
                    <label className="setting-label">Email Notifications</label>
                    <p className="setting-description">
                      Receive email alerts for important events
                    </p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <label className="setting-label">Push Notifications</label>
                    <p className="setting-description">
                      Get instant browser notifications
                    </p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              <div className="setting-group">
                <h3 className="setting-group-title">Data Management</h3>
                <div className="setting-item">
                  <div className="setting-info">
                    <label className="setting-label">Auto Backup</label>
                    <p className="setting-description">
                      Automatically backup data weekly
                    </p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default CustomerDetails;
