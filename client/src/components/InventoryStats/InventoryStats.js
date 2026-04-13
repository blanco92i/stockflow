import React from 'react';
import './InventoryStats.css';

const InventoryStats = ({ totalSkus = 1248, lowStock = 12, turnoverRate = 84 }) => {
  return (
    <div className="inventory-stats">
      {/* Total SKUs */}
      <div className="inventory-stat-card">
        <div className="stat-icon green">📦</div>
        <div className="stat-content">
          <p className="stat-label">TOTAL SKUS</p>
          <h3 className="stat-value">{totalSkus.toLocaleString()}</h3>
        </div>
      </div>

      {/* Low Stock */}
      <div className="inventory-stat-card">
        <div className="stat-icon red">⚠️</div>
        <div className="stat-content">
          <p className="stat-label">LOW STOCK</p>
          <h3 className="stat-value">{lowStock}</h3>
        </div>
      </div>

      {/* Turnover Rate */}
      <div className="inventory-stat-card">
        <div className="stat-icon blue">📈</div>
        <div className="stat-content">
          <p className="stat-label">TURNOVER RATE</p>
          <h3 className="stat-value">{turnoverRate}%</h3>
        </div>
      </div>
    </div>
  );
};

export default InventoryStats;
