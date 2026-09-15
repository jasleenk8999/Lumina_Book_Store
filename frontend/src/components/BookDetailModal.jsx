import React, { useState } from 'react';
import { X, Star, ShoppingBag, Check, Shield, BookCheck, Hash, Calendar, Building2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function BookDetailModal({ book, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, items } = useCart();
  
  if (!book || typeof book !== 'object') return null;

  const inCart = (items || []).some(item => item && item.book && Number(item.book.id) === Number(book.id));

  const handleAdd = () => {
    if (book) {
      addToCart(book, quantity);
    }
  };

  return (
    <div className="modal-backdrop fade-in" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-grid">
          {/* Cover & Gallery Column */}
          <div className="modal-media-col">
            <div className="modal-cover-wrapper">
              <img
                src={book.coverImage}
                alt={book.title}
                className="modal-cover-img"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80';
                }}
              />
              {book.featured && (
                <span className="modal-badge-featured badge badge-gold">Featured Bestseller</span>
              )}
            </div>
          </div>

          {/* Details & Action Column */}
          <div className="modal-info-col">
            <span className="modal-category-badge">{book.category}</span>
            <h2 className="modal-title">{book.title}</h2>
            <p className="modal-author">by <strong>{book.author}</strong></p>

            <div className="modal-rating-row">
              <div className="stars-wrapper">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(book.rating) ? 'star-filled' : 'star-empty'}
                  />
                ))}
              </div>
              <span className="rating-score">{book.rating.toFixed(1)}</span>
              <span className="reviews-count">({book.reviewsCount.toLocaleString()} verified reader reviews)</span>
            </div>

            <div className="modal-price-row">
              <span className="modal-price">${book.price.toFixed(2)}</span>
              <span className={`stock-status ${book.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                {book.stock > 0 ? `In Stock (${book.stock} copies available)` : 'Temporarily Out of Stock'}
              </span>
            </div>

            <div className="modal-synopsis">
              <h4>Synopsis</h4>
              <p>{book.description}</p>
            </div>

            {/* Specifications Meta Grid */}
            <div className="modal-specs-grid">
              <div className="spec-item">
                <Building2 size={16} className="spec-icon" />
                <div>
                  <span className="spec-label">Publisher</span>
                  <p className="spec-value">{book.publisher || 'Independent Press'}</p>
                </div>
              </div>
              <div className="spec-item">
                <Calendar size={16} className="spec-icon" />
                <div>
                  <span className="spec-label">Year</span>
                  <p className="spec-value">{book.publicationYear || '2022'}</p>
                </div>
              </div>
              <div className="spec-item">
                <Hash size={16} className="spec-icon" />
                <div>
                  <span className="spec-label">ISBN-13</span>
                  <p className="spec-value">{book.isbn || '978-0000000000'}</p>
                </div>
              </div>
              <div className="spec-item">
                <BookCheck size={16} className="spec-icon" />
                <div>
                  <span className="spec-label">Format</span>
                  <p className="spec-value">Hardcover / Collector Edition</p>
                </div>
              </div>
            </div>

            {/* Quantity Selector & Add Button */}
            <div className="modal-actions-bar">
              <div className="qty-selector">
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="qty-num">{quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(Math.min(book.stock || 10, quantity + 1))}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                className="btn btn-primary modal-add-btn"
                onClick={handleAdd}
                id="modal-add-to-cart-btn"
              >
                <ShoppingBag size={18} />
                <span>Add to Bag &bull; ${(book.price * quantity).toFixed(2)}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
