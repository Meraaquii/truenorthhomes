import React, { useState, useRef, useEffect } from 'react';
import logo from '../../assets/logo.png';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
 
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsProjectsOpen(false); // close submenu when menu closes
  };
  const handleRedirect = (path) => {
    navigate(path);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    // setToggle(false);
    // setShowDropdown(false);
    // setMobileDropdownOpen(false);
    setIsMenuOpen(false);
    setIsProjectsOpen(false);
  };
  const handleContactClick = () => {
    if (window.location.pathname === '/') {
      // already on home — just scroll
      const section = document.getElementById('contact');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    } else {
      // navigate home first, then scroll
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById('contact');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      }, 500); // wait for home to render
    }
  };
  const toggleProjects = (e) => {
    e.stopPropagation(); // prevent closing modal when clicking inside
    setIsProjectsOpen(!isProjectsOpen);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setIsProjectsOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`nav-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar">
        <div className="nav-left">
          <img src={logo} alt="" onClick={() => handleRedirect('/')} />
        </div>
        <div className="nav-right">
          <RxHamburgerMenu
            className='menu-icon'
            onClick={toggleMenu}
          />
          {isMenuOpen && (
            <div className="modal-overlay">
              <ul className="dropdown-menu" ref={menuRef}>
                <li onClick={() => handleRedirect('/')}>Home</li>
                <li onClick={() => handleRedirect('/about')}>About Us</li>

                {/* Projects Dropdown */}
                <li className="projects-item" onClick={toggleProjects}>
                  <span>Projects</span>
                  <IoIosArrowForward
                    className={`projects-arrow ${isProjectsOpen ? 'open' : ''}`}
                  />
                </li>
                {isProjectsOpen && (
                  <ul className="sub-menu">
                    <li><a href="https://bengalroytech.com/projects.html" target='_blank'>Completed</a></li>
                    <li onClick={() => handleRedirect('/project')}>Ongoing</li>
                  </ul>
                )}

                <li onClick={() => handleRedirect('/blog')}>Blog</li>
                <li onClick={() => handleRedirect('/career')}>Career</li>
                <li onClick={handleContactClick}>Contact Us</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
