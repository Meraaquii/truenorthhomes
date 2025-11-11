import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login/Login";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResponderList from "./Components/ResponderList/ResponderList";
import ProtectedRoute from "./Components/Login/ProtectRoute";
import Sidebar from "./Components/Sidebar/Sidebar";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./Components/Context/AuthContext";
import "./Components/styles/variables.css";
import "./Components/styles/global.css";
import Settings from "./Components/Settings/Settings";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <AuthProvider>
        <Toaster />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />

          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="responderList" element={<ResponderList />} />
                  <Route path="settings" element={<Settings />} />
                </Routes>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
