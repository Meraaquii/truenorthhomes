import React from "react";
import { IoMdClose } from "react-icons/io";
import { FaBed, FaPhone } from "react-icons/fa";
import "./Modal.css";
import bg from "../../assets/silver2.jpg";
import logo from "../../assets/nav-icon.png";
import TrueNorth from "../../assets/True North.png";

const Modal = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <button className="popup-close" onClick={onClose}>
        <IoMdClose size={24} />
      </button>
      <div className="popup-container">
        <div className="popup-header">
          <div className="image-wrapper">
            <img src={bg} alt="House" className="popup-image" />
            <div className="image-overlay"></div>
            {/* <div className="popup-title">
              <h2>Sliver Leaf</h2>
              <p>New Alipore, Kolkata - 700053</p>
            </div> */}

          </div>
        </div>

        <div className="popup-price">
          <h3>Sliver Leaf</h3>
          <p className="popup-location">New Alipore, Kolkata - 700053</p>
          <div className="popup-info">
            <span>
              <FaBed className="icon" /> 2 BHK
            </span>
            <span>
              <FaBed className="icon" /> 3 BHK
            </span>
          </div>
        </div>

        <div className="header-logo-wrapper">
          <img src={logo} alt="Golden City" className="header-logo" />
        </div>

        <div className="popup-body">
          <div className="popup-description">
            <p>
              Europe-inspired design language adorns Silver Leaf's architecture.
              The natural vistas, the curved roadways, the building exteriors
              exude a classical style, housing contemporary amenities for a
              lifestyle full of silver linings.
            </p>
          </div>

          <div className="popup-contact">
            {/* <h4>Contact Builder</h4> */}
            <div className="contact-owner">
              <div className="owner-logo-wrapper">
                <img
                  src={TrueNorth}
                  alt="True North Homes"
                  className="owner-logo"
                />
              </div>
              <div className="owner-info">
                <h5 className="owner-name">True North Homes</h5>
                <p className="owner-type">Real Estate Developer</p>
                <p className="owner-phone">Call Us : 98301 81693</p>
              </div>
            </div>
            <div className="call-btn">
              <a href="tel:+919830181693">
                <FaPhone size={22} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
