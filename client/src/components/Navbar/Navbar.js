import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { admin } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <h1 className="navbar-title">SuperMart POS</h1>
        </div>

        <div className="navbar-center">
          <div className="search-bar">
            <input type="text" placeholder="Search products..." />
            <button>🔍</button>
          </div>
        </div>

        <div className="navbar-right">
          <div className="navbar-user">
            <span className="user-name">{admin?.name || 'User'}</span>
            <div className="user-avatar">{admin?.name?.[0]?.toUpperCase() || 'U'}</div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
