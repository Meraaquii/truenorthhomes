import React from 'react'
import clock from '../../assets/clock.jpg';
import map from '../../assets/homeabout_location.jpg';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className='about-us-wrapper'>
      <div className="about-us">
        <h1>ABOUT US</h1>
        <p className='abt-desc'>Once navigators used North as their guide to travel, making North as the starting point for all their calculations and directions. As in navigation, so in life, True North is symbolic of finding oneself, of stepping forward in life by travelling inwards. It is an inner calling. The same guiding philosophy shapes our endeavours.</p>
        <img src={clock} alt="" className='clock'/>
        <button className='learn-btn'>LEARN MORE</button>
         <img src={map} alt="" className='map'/>
      </div>
    </div>
  )
}

export default AboutUs
