import React from "react";
import { RiSunLine, RiMoonLine } from "react-icons/ri";
import "./Settings.css";

function Settings({ darkMode, setDarkMode }) {
  return (
    <div className="content-card">
      <div className="card-header">
        <h2 className="card-title">Settings</h2>
        <p className="card-subtitle">Manage your application preferences</p>
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
  );
}

export default Settings;
