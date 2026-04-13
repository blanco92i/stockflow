import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage = 1, totalItems = 1248, itemsPerPage = 4 }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Showing {start}-{end} of {totalItems.toLocaleString()} products
      </div>

      <div className="pagination-controls">
        <button className="pagination-btn" disabled={currentPage === 1}>
          ← Previous
        </button>

        <div className="page-dots">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => (
            <button
              key={i + 1}
              className={`page-dot ${currentPage === i + 1 ? 'active' : ''}`}
            >
              {i + 1}
            </button>
          ))}
          {totalPages > 5 && <span className="dots-separator">...</span>}
        </div>

        <button className="pagination-btn" disabled={currentPage === totalPages}>
          Next →
        </button>
      </div>
    </div>
  );
};

export default Pagination;
