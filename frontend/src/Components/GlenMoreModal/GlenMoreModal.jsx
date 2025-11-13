import React from "react";
import { IoMdClose } from "react-icons/io";
import { FaBed, FaPhone } from "react-icons/fa";
import "./GlenMoreModal.css";
import bg from "../../assets/Glenmore Woods.webp";
import logo from "../../assets/Glenmore Wood.png";
import TrueNorth from "../../assets/True North.png";

const Modal = ({ onClose }) => {
  return (
    <div className="glenmore-overlay">
      <button className="glenmore-close" onClick={onClose}>
        <IoMdClose size={24} />
      </button>
      <div className="glenmore-container">
        <div className="glenmore-header">
          <div className="glenmore-wrapper">
            <img src={bg} alt="House" className="glenmore-image" />
            <div className="glenmore-image-overlay"></div>
            {/* <div className="popup-title">
              <h2>Sliver Leaf</h2>
              <p>New Alipore, Kolkata - 700053</p>
            </div> */}
          </div>
        </div>

        <div className="glenmore-price">
          <h3 className="">Glenmore Woods</h3>
          <p className="glenmore-location">Kalikapur, Kolkata - 700099</p>
          <div className="glenmore-info">
            <span>
              <FaBed className="glenmore-icon" /> 2 BHK
            </span>
            <span>
              <FaBed className="glenmore-icon" /> 3 BHK
            </span>
          </div>
        </div>

        <div className="glenmore-header-logo-wrapper">
          <img src={logo} alt="Golden City" className="glenmore-header-logo" />
        </div>

        <div className="glenmore-body">
          <div className="glenmore-description">
            <p>
              Check out Glenmore Park in Garia, one of the upcoming
              under-construction housing societies in Kolkata South. There are
              apartments for sale in Glenmore Park Garia, Kolkata. This society
              will have all basic facilities and amenities to suit homebuyer’s
              needs and requirements.Brought to you by True North Homes,
              Glenmore Park is scheduled for possession in Dec, 2028.
            </p>
          </div>

          <div className="glenmore-contact">
            {/* <h4>Contact Builder</h4> */}
            <div className="glenmore-contact-owner">
              <div className="glenmore-owner-logo-wrapper">
                <img
                  src={TrueNorth}
                  alt="True North Homes"
                  className="glenmore-owner-logo"
                />
              </div>
              <div className="glenmore-owner-info">
                <h5 className="glenmore-owner-name">True North Homes</h5>
                <p className="glenmore-owner-type">Real Estate Developer</p>
                <p className="glenmore-owner-phone">Call Us : 98301 81693</p>
              </div>
            </div>
            <div className="glenmore-call-btn">
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
