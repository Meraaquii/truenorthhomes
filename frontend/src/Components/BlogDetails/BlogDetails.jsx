import React from 'react'
import './BlogDetails.css';
import blog1 from '../../assets/blog1.webp';
import { useNavigate } from 'react-router-dom';
const BlogDetails = () => {
  const navigate = useNavigate();
  const handleRedirect = (path) => {
    navigate(path);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    // setToggle(false);
    // setShowDropdown(false);
    // setMobileDropdownOpen(false);
    // setIsMenuOpen(false);
    // setIsProjectsOpen(false);
  };
  return (
    <div className='blog-details-wrapper'>
      <div className="blog-details">
        <div className="blog-left">
          <img src={blog1} alt="" />
        </div>
        <div className="blog-right">
          <h1>Affordable Housing Projects in South Kolkata: Which<br/> Developers are Leading the Way?<br/></h1>
          <div className="blog-det">
            <p>In recent years, affordable housing has become a pressing need in urban areas, particularly in South Kolkata. As the city expands, many residents face challenges finding homes that are both budget-friendly and well-located. The rising costs of living and property prices can leave potential homeowners feeling overwhelmed and uncertain about their options.</p>
            <button className="learn-btn" onClick={() => handleRedirect('/blog/affordable-housing-projects-in-south-kolkata-which-developers-are-leading-the-way')}>LEARN MORE</button>
          </div>
        </div> 
      </div>
    </div>
  )
}

export default BlogDetails
