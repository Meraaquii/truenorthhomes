import React from 'react'
import './AboutHero.css'
import bg from '../../assets/About_bg.png';

const AboutHero = () => {
  return (
    <div className='about-hero-wrapper'>
      <div className="about-hero">
        <img src={bg} alt="" />
        {/* <h1 className="about-caption">
            ABOUT US
        </h1> */}
      </div>
    </div>
  )
}

export default AboutHero
