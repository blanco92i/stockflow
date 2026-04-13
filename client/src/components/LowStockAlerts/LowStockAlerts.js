import React from 'react';
import './LowStockAlerts.css';

const LowStockAlerts = ({ alerts = [] }) => {
  const defaultAlerts = [
    {
      id: 1,
      name: 'Whole Milk 1L',
      sku: 'MIL-6090',
      stock: 4,
      threshold: 10,
      icon: '🥛'
    },
    {
      id: 2,
      name: 'Espresso Roast 250g',
      sku: 'COF-2821',
      stock: 2,
      threshold: 5,
      icon: '☕'
    },
    {
      id: 3,
      name: 'Gala Apples 1kg',
      sku: 'APP-1022',
      stock: 12,
      threshold: 20,
      icon: '🍎'
    },
  ];

  const displayAlerts = alerts.length > 0 ? alerts : defaultAlerts;

  return (
    <div className="low-stock-alerts">
      <div className="alerts-header">
        <h3 className="alerts-title">⚠️ Low Stock Alerts</h3>
        <a href="#manage" className="manage-link">Manage Inventory</a>
      </div>

      <div className="alerts-list">
        {displayAlerts.map((alert) => (
          <div key={alert.id} className="alert-item">
            <div className="alert-icon">{alert.icon}</div>

            <div className="alert-info">
              <h4 className="alert-name">{alert.name}</h4>
              <p className="alert-sku">SKU: {alert.sku}</p>
            </div>

            <div className="alert-stock">
              <span className="stock-value">{alert.stock} Left</span>
              <span className="reorder-point">REORDER POINT: {alert.threshold}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowStockAlerts;
