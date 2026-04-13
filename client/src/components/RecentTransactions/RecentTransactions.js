import React from 'react';
import './RecentTransactions.css';

const RecentTransactions = ({ transactions = [] }) => {
  const defaultTransactions = [
    { id: '#8842', time: '14:22', amount: '$45.50' },
    { id: '#8841', time: '14:15', amount: '$32.75' },
    { id: '#8840', time: '13:58', amount: '$28.25' },
    { id: '#8839', time: '13:45', amount: '$55.00' },
  ];

  const displayTransactions = transactions.length > 0 ? transactions : defaultTransactions;

  return (
    <div className="recent-transactions">
      <div className="transactions-header">
        <h3 className="transactions-title">Recent Transactions</h3>
        <a href="#view-all" className="view-all-link">View All</a>
      </div>

      <div className="transactions-table">
        <div className="table-header">
          <div className="table-cell">ORDER ID</div>
          <div className="table-cell">TIME</div>
          <div className="table-cell">TOTAL AMOUNT</div>
        </div>

        {displayTransactions.map((tx) => (
          <div key={tx.id} className="table-row">
            <div className="table-cell">{tx.id}</div>
            <div className="table-cell">{tx.time}</div>
            <div className="table-cell total">{tx.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
