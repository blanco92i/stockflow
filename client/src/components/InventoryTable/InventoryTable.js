import React, { useState } from 'react';
import './InventoryTable.css';

const InventoryTable = ({ products = [] }) => {
  const defaultProducts = [
    { sku: '8842-AV', icon: '🍊', name: 'Artisan Organic Oranges', category: 'Produce', stock: '420 Units', price: '$1.25' },
    { sku: '9711-LT', icon: '👟', name: 'Neon Velocity Runners', category: 'Footwear', stock: '8 Units', price: '$145' },
    { sku: '4482-BK', icon: '👜', name: 'Classic Leather Ledger', category: 'Stationery', stock: '0 Units', price: '$32.5' },
    { sku: '#1129-EV', icon: '⌚', name: 'Zenith Smart Watch V2', category: 'Electronics', stock: '54 Units', price: '$299' },
  ];

  const displayProducts = products.length > 0 ? products : defaultProducts;

  const getStockStatus = (stock) => {
    const quantity = parseInt(stock);
    if (quantity === 0) return 'out-of-stock';
    if (quantity < 10) return 'low-stock';
    return 'in-stock';
  };

  return (
    <div className="inventory-table-container">
      <table className="inventory-table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>PRODUCT NAME</th>
            <th>CATEGORY</th>
            <th>STOCK LEVEL</th>
            <th>UNIT PRICE</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {displayProducts.map((product, index) => (
            <tr key={index} className={`row-${getStockStatus(product.stock)}`}>
              <td className="sku-cell">{product.sku}</td>
              <td className="product-cell">
                <span className="product-icon">{product.icon}</span>
                <span className="product-name">{product.name}</span>
              </td>
              <td className="category-cell">
                <span className="category-badge">{product.category}</span>
              </td>
              <td className="stock-cell">
                <span className={`stock-badge ${getStockStatus(product.stock)}`}>
                  {product.stock}
                </span>
              </td>
              <td className="price-cell">{product.price}</td>
              <td className="action-cell">
                <button className="action-btn edit">✎</button>
                <button className="action-btn delete">🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
