import React from 'react'
import b1 from '../../assets/about_bottom_img1.jpg'
import b2 from '../../assets/about_bottom_img2.jpg'
import b3 from '../../assets/about_bottom_img3.jpg'
import './AboutProps.css';

const AboutProps = () => {
  return (
    <div className='aboutprops-wrapper'>
      <div className="aboutprops">
        <div className="abtprop">
            <img src={b1} alt="" />
                            <div className="abt-p-details">
                                <h2 >CUSTOMER RELATIONSHIP<br/>RESPONSIBILITIES</h2>
                            </div>
        </div>
        <div className="abtprop">
            <img src={b2} alt="" />
                            <div className="abt-p-details">
                                <h2 >COMPLIANCE &<br/>DOCUMENTATION</h2>
                            </div>
        </div>
        <div className="abtprop">
            <img src={b3} alt="" />
                            <div className="abt-p-details">
                                <h2 >SUSTAINABILITY &<br/>COMMUNITY ENGAGEMENT</h2>
                            </div>
        </div>
      </div>
    </div>
  )
}

export default AboutProps
