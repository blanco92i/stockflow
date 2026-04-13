import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>SuperMart POS</h4>
          <p>Point of Sale Management System</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><a href="#help">Help Center</a></li>
            <li><a href="#docs">Documentation</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#facebook">f</a>
            <a href="#twitter">𝕏</a>
            <a href="#instagram">📷</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 SuperMart POS. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
