import { useState } from "react";
import "./Founder.css";
import logo from "../../assets/big-logoicon.png";
import green from "../../assets/about_greenquote.png";
import blue from "../../assets/about_bluequote.png";
import envelope_body from "../../assets/envelope-body2.webp";
import Ranjit from "../../assets/partner1.webp";
import { IoIosArrowDown } from "react-icons/io";
import EnvelopeAnimation from "../EnvelopeAnimation/EnvelopeAnimation";

const Founder = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="founder-wrapper">
      <div className="founder">
        <img src={logo} alt="" className="logo" />

        <div className="comma-wrap">
          <div className="inverted-commas">
            <img src={green} alt="" className="green" />
            <img src={blue} alt="" className="blue" />
          </div>
        </div>

        <p className="tn-blurb">
          True North is not a mere brand name, it is an umbrella which makes it
          a conglomeration of many developers and their unified vision.
        </p>

        {/* <img src={envelope_body} alt="" className="envelope-body" /> */}
        <EnvelopeAnimation />
        {/* <button className="f-desk">FROM THE FOUNDER PARTNER'S DESK</button> */}

        <img src={Ranjit} alt="" className="ranjit" />

        <div className={`f-details ${isExpanded ? "expanded" : "collapsed"}`}>
          <p>
            Mr. Ranjit Roy began his journey with a vision to create model home
            units that provide a sustainable environment for health and mental
            wellbeing.
          </p>
          <p>
            Thriving communities, idyllic societies and nature-fuelled lifestyle
            make Ranjit Roy’s vision truly discernible in this sector.
          </p>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="expand-btn"
        >
          <IoIosArrowDown className={isExpanded ? "rotated" : ""} />
        </button>
      </div>
    </div>
  );
};

export default Founder;
