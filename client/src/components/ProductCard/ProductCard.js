import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <div className="product-image-placeholder">
          📦
        </div>
        <span className="product-badge">In Stock</span>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        
        <div className="product-details">
          <p className="product-sku">SKU: {product._id?.substring(0, 8) || 'N/A'}</p>
          <p className="product-stock">{product.stock} items</p>
        </div>

        <div className="product-footer">
          <div className="price-section">
            <span className="product-price">${product.sellingPrice || product.price || 0}</span>
          </div>
          
          <button 
            className="add-to-cart-btn"
            onClick={() => onAddToCart(product)}
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
