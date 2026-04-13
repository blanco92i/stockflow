import React from 'react';
import './StatCard.css';

const StatCard = ({ title, value, trend, icon, color = 'blue' }) => {
  const isPositive = trend >= 0;

  return (
    <div className={`stat-card stat-card-${color}`}>
      <div className="stat-card-header">
        <h3 className="stat-title">{title}</h3>
        <span className="stat-icon">{icon}</span>
      </div>

      <div className="stat-value">{value}</div>

      <div className={`stat-trend ${isPositive ? 'positive' : 'negative'}`}>
        <span className="trend-icon">{isPositive ? '↑' : '↓'}</span>
        <span className="trend-text">{Math.abs(trend)}% vs yesterday</span>
      </div>
    </div>
  );
};

export default StatCard;
