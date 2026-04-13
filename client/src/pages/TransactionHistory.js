import React, { useState } from 'react';
import MainLayout from '../components/MainLayout/MainLayout';
import Pagination from '../components/Pagination/Pagination';
import Cart from '../components/Cart/Cart';
import './TransactionHistory.css';

const TransactionHistory = () => {
  const [dateRange, setDateRange] = useState({
    start: 'Oct 12',
    end: 'Oct 19, 2023',
  });
  const [selectedCashier, setSelectedCashier] = useState('All Operators');
  const [selectedPayment, setSelectedPayment] = useState('All Types');
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState([]);

  const transactions = [
    {
      id: 'XTX-0642',
      date: 'Oct 19, 2023',
      time: '2:45 PM',
      items: '12 items',
      payment: 'Visa ****5201',
      total: '$245.80',
    },
    {
      id: 'XTX-0641',
      date: 'Oct 19, 2023',
      time: '2:30 PM',
      items: '3 items',
      payment: 'Cash Payment',
      total: '$12.45',
    },
    {
      id: 'XTX-0640',
      date: 'Oct 19, 2023',
      time: '2:15 PM',
      items: '23 items',
      payment: 'Mastercard ****1852',
      total: '$1,102.00',
    },
    {
      id: 'XTX-0639',
      date: 'Oct 19, 2023',
      time: '1:45 PM',
      items: '1 item',
      payment: 'Mobile Card ****7921',
      total: '$54.99',
    },
    {
      id: 'XTX-0638',
      date: 'Oct 19, 2023',
      time: '1:20 PM',
      items: '7 items',
      payment: 'Cash Payment',
      total: '$86.20',
    },
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
    alert('Checkout not available on transaction history page');
  };

  const handleExportCSV = () => {
    alert('Exporting transaction history to CSV...');
  };

  const handlePrintSummary = () => {
    alert('Printing transaction summary...');
  };

  const handleViewReceipt = (transactionId) => {
    alert(`Viewing receipt for transaction: ${transactionId}`);
  };

  return (
    <MainLayout>
      <div className="transaction-history-page">
        <div className="transaction-container">
          {/* Main Content */}
          <div className="transaction-content">
            {/* Header */}
            <div className="transaction-header">
              <div className="header-info">
                <h1>Transaction History</h1>
                <p>Review and manage past sales records for Terminal 04</p>
              </div>
              <div className="header-actions">
                <button className="action-btn export-btn" onClick={handleExportCSV}>
                  📊 Export CSV
                </button>
                <button className="action-btn print-btn" onClick={handlePrintSummary}>
                  🖨️ Print Summary
                </button>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="stats-bar">
              <div className="stat-item">
                <span className="stat-icon">💰</span>
                <span className="stat-label">Total Revenue</span>
                <span className="stat-value">$12,482.50</span>
              </div>
            </div>

            {/* Filters */}
            <div className="filters-section">
              <div className="filter-group">
                <label>Date Range</label>
                <div className="date-filter">
                  <input type="text" placeholder="Start date" value={dateRange.start} readOnly />
                  <span className="date-separator">to</span>
                  <input type="text" placeholder="End date" value={dateRange.end} readOnly />
                </div>
              </div>

              <div className="filter-group">
                <label>Cashier</label>
                <select value={selectedCashier} onChange={(e) => setSelectedCashier(e.target.value)}>
                  <option>All Operators</option>
                  <option>Operator 1</option>
                  <option>Operator 2</option>
                  <option>Operator 3</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Payment Methods</label>
                <select value={selectedPayment} onChange={(e) => setSelectedPayment(e.target.value)}>
                  <option>All Types</option>
                  <option>Cash</option>
                  <option>Card</option>
                  <option>Mobile Payment</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="transaction-table-container">
              <table className="transaction-table">
                <thead>
                  <tr>
                    <th>TRANSACTION ID</th>
                    <th>DATE & TIME</th>
                    <th>ITEMS</th>
                    <th>PAYMENT</th>
                    <th>TOTAL AMOUNT</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr key={index}>
                      <td className="transaction-id">{transaction.id}</td>
                      <td className="date-time">
                        <div className="date">{transaction.date}</div>
                        <div className="time">{transaction.time}</div>
                      </td>
                      <td className="items">{transaction.items}</td>
                      <td className="payment-method">
                        <span className="payment-badge">{transaction.payment}</span>
                      </td>
                      <td className="total-amount">
                        <strong>{transaction.total}</strong>
                      </td>
                      <td className="action">
                        <button
                          className="view-receipt-btn"
                          onClick={() => handleViewReceipt(transaction.id)}
                        >
                          View Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="pagination-wrapper">
              <Pagination currentPage={currentPage} totalItems={1044} itemsPerPage={5} />
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="transaction-cart">
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

export default TransactionHistory;
