import React from 'react'
import bg from '../../assets/feature_project-bg.png';
import logo from '../../assets/feature_project-logo.png';
import './Featured.css';

const Featured = () => {
  return (
    <div className='featured-wrapper'>
      <div className="featured">
         <h1>FEATURED PROJECT</h1>
         <div className="f-bg">
            <img src={bg} alt="" className='bg'/>
         </div>
         <div className="f-logo">
            <img src={logo} alt="" className='logo'/>
         </div>
      </div>
    </div>
  )
}

export default Featured 