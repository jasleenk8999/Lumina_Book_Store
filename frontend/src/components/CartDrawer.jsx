import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, CheckCircle, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ onBrowseCatalogue }) {
  const { isCartOpen, closeCart, items, removeFromCart, updateQuantity, clearCart, subtotal, totalItems } = useCart();
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 50.0;
  const shippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 4.99;
  const grandTotal = subtotal + shippingFee;

  const handleCheckout = () => {
    setCheckoutComplete(true);
    setTimeout(() => {
      clearCart();
      setCheckoutComplete(false);
      closeCart();
    }, 3000);
  };

  return (
    <div className="cart-backdrop fade-in" onClick={closeCart}>
      <div className="cart-drawer-panel glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-drawer-header">
          <div className="cart-header-title">
            <ShoppingBag size={20} className="header-cart-icon" />
            <h3>Your Shopping Bag</h3>
            <span className="cart-badge-count">({totalItems})</span>
          </div>
          <button className="btn-icon" onClick={closeCart} aria-label="Close Cart">
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="shipping-progress-banner">
          {subtotal >= FREE_SHIPPING_THRESHOLD ? (
            <p className="shipping-msg unlocked">
              <Sparkles size={16} /> <strong>Unlocked!</strong> Free Priority Shipping applied to your order!
            </p>
          ) : (
            <p className="shipping-msg">
              Add <strong>${shippingRemaining.toFixed(2)}</strong> more for <strong>Free Priority Shipping</strong>
            </p>
          )}
          <div className="progress-track">
            <div
              className="progress-bar"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        {/* Drawer Body */}
        <div className="cart-drawer-body">
          {checkoutComplete ? (
            <div className="cart-success-state fade-in">
              <CheckCircle size={56} className="success-icon" />
              <h3>Thank You For Your Order!</h3>
              <p>Your order has been recorded into the Lumina Bookstore system. A confirmation dispatch has been prepared.</p>
              <span className="badge badge-emerald">Order Confirmed</span>
            </div>
          ) : (items || []).filter(item => item && item.book).length === 0 ? (
            <div className="cart-empty-state">
              <ShoppingBag size={48} className="empty-cart-icon" />
              <h4>Your bag is currently empty</h4>
              <p>Explore our curated catalogue of bestsellers and classic literature.</p>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  closeCart();
                  if (onBrowseCatalogue) onBrowseCatalogue();
                }}
              >
                Browse Books
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {(items || []).filter(item => item && item.book).map(({ book, quantity }) => (
                <div key={book.id} className="cart-item-row">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="cart-item-thumb"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                  <div className="cart-item-details">
                    <h4 className="cart-item-title">{book.title}</h4>
                    <p className="cart-item-author">{book.author}</p>
                    <div className="cart-item-bottom">
                      <span className="cart-item-price">${(book.price * quantity).toFixed(2)}</span>
                      
                      <div className="qty-counter-sm">
                        <button
                          onClick={() => updateQuantity(book.id, -1)}
                          className="qty-btn-sm"
                          aria-label="Decrease"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="qty-val-sm">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(book.id, 1)}
                          className="qty-btn-sm"
                          aria-label="Increase"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(book.id)}
                        className="btn-trash"
                        aria-label="Remove item"
                        title="Remove from bag"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer / Summary */}
        {items.length > 0 && !checkoutComplete && (
          <div className="cart-drawer-footer">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Estimated Shipping</span>
              <span>{shippingFee === 0 ? <strong className="text-emerald">FREE</strong> : `$${shippingFee.toFixed(2)}`}</span>
            </div>
            <div className="summary-row total-row">
              <strong>Order Total</strong>
              <strong className="grand-total-val">${grandTotal.toFixed(2)}</strong>
            </div>

            <button
              className="btn btn-primary btn-block checkout-submit-btn"
              onClick={handleCheckout}
              id="checkout-order-btn"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
