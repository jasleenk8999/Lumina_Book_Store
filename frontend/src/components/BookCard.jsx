import React from 'react';
import { Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function BookCard({ book, onQuickView }) {
  const { addToCart, items } = useCart();
  
  if (!book || typeof book !== 'object') return null;

  const inCart = (items || []).some(item => item && item.book && Number(item.book.id) === Number(book.id));

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (book) {
      addToCart(book, 1);
    }
  };

  const formattedPrice = typeof book.price === 'number' ? book.price.toFixed(2) : Number(book.price || 0).toFixed(2);
  const formattedRating = typeof book.rating === 'number' ? book.rating.toFixed(1) : Number(book.rating || 5).toFixed(1);

  return (
    <div className="book-card glass-panel" onClick={() => onQuickView && onQuickView(book)}>
      {/* Book Cover Image Container */}
      <div className="book-card-media">
        <img
          src={book.coverImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'}
          alt={book.title || 'Book cover'}
          className="book-cover-img"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80';
          }}
        />
        {book.featured && (
          <div className="card-badge-container">
            <span className="badge badge-gold">Bestseller</span>
          </div>
        )}
        <div className="card-overlay-actions">
          <button
            className="btn btn-secondary btn-sm overlay-action-btn"
            onClick={(e) => { e.stopPropagation(); onQuickView && onQuickView(book); }}
            title="Quick Details"
          >
            <Eye size={15} /> View
          </button>
        </div>
      </div>

      {/* Book Details Info */}
      <div className="book-card-body">
        <div className="book-meta-top">
          <span className="book-category-tag">{book.category || 'General'}</span>
          <div className="book-rating" title={`${formattedRating} / 5 based on ${book.reviewsCount || 0} reviews`}>
            <Star size={14} className="star-filled" />
            <span className="rating-num">{formattedRating}</span>
          </div>
        </div>

        <h3 className="book-title" title={book.title}>{book.title || 'Untitled Book'}</h3>
        <p className="book-author">by {book.author || 'Unknown Author'}</p>

        <div className="book-card-footer">
          <div className="book-price-block">
            <span className="currency">$</span>
            <span className="price-amount">{formattedPrice}</span>
          </div>

          <button
            className={`btn btn-sm ${inCart ? 'btn-indigo' : 'btn-primary'} add-cart-btn`}
            onClick={handleAddToCart}
            id={`add-to-cart-btn-${book.id}`}
            title="Add to Shopping Bag"
            type="button"
          >
            {inCart ? <Check size={16} /> : <ShoppingBag size={16} />}
            <span>{inCart ? 'Added' : 'Add'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
