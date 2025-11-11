import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { API } from "../Context/Context";

import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import StatsGrid from "../StatsGrid/StatsGrid";
import ResponderTable from "../ResponderTable/ResponderTable";
import Settings from "../Settings/Settings";

import "../styles/variables.css";
import "../styles/global.css";
import "../ResponderList/ResponderList.css";

function ResponderList() {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("customers");
  const [darkMode, setDarkMode] = useState(false);

  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
  });

  const tablePage = 10;

  useEffect(() => {
    const savedTheme = localStorage.getItem("admin-theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark-theme");
    }
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

  const filteredCustomers = useMemo(() => {
    return customers.filter(
      (user) =>
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase()) ||
        user.message?.toLowerCase().includes(search.toLowerCase())
    );
  }, [customers, search]);

  const getCustomerDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API}/getResponderList`);
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

  return (
    <div
      className={`admin-container ${
        sidebarOpen ? "sidebar-open" : "sidebar-closed"
      } ${darkMode ? "dark-theme" : ""}`}
    >
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="admin-main">
        <Navbar
          search={search}
          setSearch={setSearch}
          darkMode={darkMode}
          toggleTheme={toggleTheme}
          activeTab={activeTab}
          exportToCSV={exportToCSV}
          exportToXML={exportToXML}
        />

        <StatsGrid stats={stats} />

        {/* {activeTab === "dashboard" && (
          <Dashboard
            customers={customers}
            setActiveTab={setActiveTab}
            repeatCustomerData={repeatCustomerData}
            monthlySignupsData={monthlySignupsData}
            customerDistributionData={customerDistributionData}
          />
        )} */}

        {activeTab === "customers" && (
          <ResponderTable
            customers={customers}
            loading={loading}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            tablePage={tablePage}
            filteredCustomers={filteredCustomers}
            getCustomerDetails={getCustomerDetails}
          />
        )}

        {activeTab === "settings" && (
          <Settings darkMode={darkMode} setDarkMode={setDarkMode} />
        )}
      </main>
    </div>
  );
}

export default ResponderList;
