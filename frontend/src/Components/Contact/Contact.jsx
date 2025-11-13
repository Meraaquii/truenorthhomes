import React from 'react';
import { useLocation } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
  const location = useLocation();

  // Check if you're on the homepage
  const isHomePage = location.pathname === '/';

  return (
    <div id="contact" className='contact-wrapper'>
      <div className="contact">
        {/* ✅ Only show on homepage */}
        {isHomePage && <h1>STAY UPDATED</h1>}

        {isHomePage &&<p>Announcements. Launches. Information.</p>}

        <form>
          <div className="form-row">
            <input type="email" id='mail' placeholder='Enter your email address' />
          </div>
          <div className="form-row">
            <input type="text" placeholder='FULL NAME*' />
            <input type="tel" placeholder='PHONE NUMBER' />
          </div>
          <div className="form-row">
            <textarea id="message" placeholder='MESSAGE'></textarea>
          </div>
          <div className="form-row">
            <button className="submit-btn">SUBMIT</button>
            <div className="checkbox-label">
              <input type="checkbox" id='chkbox' />
              <label htmlFor="chkbox">KEEP ME UPDATED ON NEWS OFFER</label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
