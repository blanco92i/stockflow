import React from 'react';
import './Cart.css';

const Cart = ({ items, onRemoveItem, onUpdateQuantity, onCheckout }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <aside className="cart-sidebar">
      <div className="cart-header">
        <h2>Active Cart</h2>
        <span className="cart-badge">{items.length} items</span>
      </div>

      <div className="cart-items">
        {items.length === 0 ? (
          <div className="empty-cart">
            <p>🛒</p>
            <p>No items in cart</p>
          </div>
        ) : (
          <ul className="cart-list">
            {items.map((item, index) => (
              <li key={index} className="cart-item">
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p className="cart-item-price">${item.price}</p>
                </div>

                <div className="cart-item-controls">
                  <div className="quantity-controls">
                    <button
                      className="qty-btn"
                      onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => onRemoveItem(index)}
                  >
                    ✕
                  </button>
                </div>

                <div className="cart-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Tax (10%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="cart-actions">
        <button className="action-btn secondary">Clear</button>
        <button 
          className="action-btn primary"
          onClick={onCheckout}
          disabled={items.length === 0}
        >
          Pay Now →
        </button>
      </div>
    </aside>
  );
};

export default Cart;
