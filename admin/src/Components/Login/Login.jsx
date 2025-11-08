import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import toast from "react-hot-toast";
import axios from "axios";
import { API } from "../Context/Context";
//import bg from "../../assets/hero-bg.jpg";
import logo from "../../assets/True North.png";
//import { AuthContext } from "../Context/AuthContext";

function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  //const { setIsAuthenticated, setUserRole } = useContext(AuthContext);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await axios.post(`${API}/login`, data);
      if (response.data.status === 1) {
        localStorage.setItem("auth", JSON.stringify(response.data));
        toast.success(response.data.message);
        //window.location.reload();
        navigate("dashboard");
        // setIsAuthenticated(true);
        // setUserRole(role);
        // localStorage.setItem("auth", role);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error) {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="absolute top-14 left-42 size-46 z-50 cursor-pointer">
        <img src={logo} alt="Logo" />
      </div>

      <div className="login-box">
        <h1 className="login-title">LOG IN</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={data.email}
              onChange={handleOnChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={handleOnChange}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {/* <div className="forgot-link">
            <Link to="/forgotPassword">Forgot Password?</Link>
          </div> */}
        </form>
      </div>
    </div>
  );
}

export default Login;
