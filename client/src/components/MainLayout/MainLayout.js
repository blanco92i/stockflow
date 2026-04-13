import React from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Navbar />
      
      <div className="layout-container">
        <Sidebar />
        
        <main className="main-content">
          {children}
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
