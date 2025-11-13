import React from 'react'
import logo from '../../assets/footer-w-logo.png';
import { GrInstagram } from "react-icons/gr";
import { FaFacebook } from "react-icons/fa";
import './Footer.css';

const Footer = () => {
    return (
        <div className='footer-wrapper'>
            <div className="footer">
                <img src={logo} alt="" className='footer-logo' />
                <div className="footer-main">
                    <div className="footer-row">
                        <div className="f1">
                            <h3 className='corporate'>CORPORATE OFFICE</h3>
                            <p className='address'>Tanian Mansions<br />
                                563 Kalikapur, Kol - 700099</p>
                        </div>
                        <div className="f2">
                            <ul>
                                <li>HOME</li>
                                <li>ABOUT US</li>
                                <li>CAREER</li>
                                <li>TERMS OF USE</li>
                                <li>PRIVACY POLICY</li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-row">
                        <div className="f3">
                            <p className='call'>CALL US</p>
                            <h3 className='number'>98301 81693</h3>
                        </div>
                        <div className="f4">
                            <p className='follow'>FOLLOW US</p>
                            <div className="f-icons">
                                <a href="https://www.instagram.com/true_northhomes/" target="_blank" rel="noopener noreferrer">
                                    <GrInstagram className="f-icon" />
                                </a>
                                <a href="https://www.facebook.com/truenorthhomes2024/" target="_blank" rel="noopener noreferrer">
                                    <FaFacebook className="f-icon" />
                                </a>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Footer
