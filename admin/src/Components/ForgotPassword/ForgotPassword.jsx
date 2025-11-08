import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo-default-black.png";
import toast from "react-hot-toast";
import "./ForgotPassword.css";
import { API } from "../Context/Context";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/forgotPassword`, { email });
      if (response.data.status === 1) {
        toast.success(response.data.message);
        setEmail("");
        localStorage.setItem("auth", JSON.stringify(response.data));
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="page-container">
      <div className="absolute top-14 left-42 size-46 z-50 cursor-pointer">
        <img src={logo} alt="Logo" onClick={handleClick} />
      </div>
      <div className="overlay"></div>
      <div className="form-container">
        <h2 className="form-title">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="input"
            />
          </div>
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
