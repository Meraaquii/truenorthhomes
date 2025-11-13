import React from 'react'
import './CareerHero.css';
import banner from '../../assets/career-banner.jpg';
const CareerHero = () => {
  return (
    <div className='career-hero-wrapper'>
      <div className="career-hero">
        <img src={banner} alt="" />
        {/* <div className="banner-txt">
            <h3>True North Homes</h3>
            <h1>Welcomes</h1>
            <h3>You Home!</h3>
        </div> */}
      </div> 
    </div>
  )
}

export default CareerHero
