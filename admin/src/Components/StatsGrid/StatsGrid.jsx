import React from "react";
import { RiUserLine } from "react-icons/ri";
import "./StatsGrid.css";

function StatsGrid({ stats }) {
  return (
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
  );
}

export default StatsGrid;
