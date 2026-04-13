import React, { useState } from 'react';
import MainLayout from '../components/MainLayout/MainLayout';
import InventoryStats from '../components/InventoryStats/InventoryStats';
import InventoryTable from '../components/InventoryTable/InventoryTable';
import Pagination from '../components/Pagination/Pagination';
import Cart from '../components/Cart/Cart';
import './Inventory.css';

const Inventory = () => {
  const [activeCategory, setActiveCategory] = useState('All Items');
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState([]);

  const categories = ['All Items', 'Produce', 'Footwear', 'Stationery', 'Electronics'];

  const products = [
    { sku: '8842-AV', icon: '🍊', name: 'Artisan Organic Oranges', category: 'Produce', stock: '420 Units', price: '$1.25' },
    { sku: '9711-LT', icon: '👟', name: 'Neon Velocity Runners', category: 'Footwear', stock: '8 Units', price: '$145' },
    { sku: '4482-BK', icon: '👜', name: 'Classic Leather Ledger', category: 'Stationery', stock: '0 Units', price: '$32.5' },
    { sku: '#1129-EV', icon: '⌚', name: 'Zenith Smart Watch V2', category: 'Electronics', stock: '54 Units', price: '$299' },
  ];

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(index);
    } else {
      const updatedCart = [...cart];
      updatedCart[index].quantity = newQuantity;
      setCart(updatedCart);
    }
  };

  const handleCheckout = () => {
    alert('Checkout not available on inventory page');
  };

  return (
    <MainLayout>
      <div className="inventory-page">
        <div className="inventory-container">
          {/* Main Content */}
          <div className="inventory-content">
            {/* Header */}
            <div className="inventory-header">
              <div className="header-info">
                <h1>Inventory Management</h1>
                <p>Real-time product tracking and stock optimization for Terminal 04</p>
              </div>
              <button className="add-product-btn">+ Add Product</button>
            </div>

            {/* Stats */}
            <InventoryStats totalSkus={1248} lowStock={12} turnoverRate={84} />

            {/* Category Filter */}
            <div className="category-filter">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Table */}
            <InventoryTable products={products} />

            {/* Pagination */}
            <Pagination currentPage={currentPage} totalItems={1248} itemsPerPage={4} />
          </div>

          {/* Cart Sidebar */}
          <div className="inventory-cart">
            <Cart
              items={cart}
              onRemoveItem={removeFromCart}
              onUpdateQuantity={updateQuantity}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Inventory;
