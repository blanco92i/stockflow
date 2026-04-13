import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { id: 1, label: 'POS', path: '/pos', icon: '🛒' },
    { id: 2, label: 'Inventory', path: '/inventory', icon: '📦' },
    { id: 3, label: 'Sales', path: '/sales', icon: '📊' },
    { id: 4, label: 'Reports', path: '/reports', icon: '📈' },
    { id: 5, label: 'Settings', path: '/settings', icon: '⚙️' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">POS</div>
      </div>

      <nav className="sidebar-nav">
        <ul className="menu-list">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path}
                className={`menu-item ${
                  location.pathname === item.path ? 'active' : ''
                }`}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <p className="version">v1.0.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
