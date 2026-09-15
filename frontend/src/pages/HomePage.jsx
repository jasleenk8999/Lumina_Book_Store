import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, BookOpen, Star, ShieldCheck, Flame, Compass, Award, Quote } from 'lucide-react';
import BookCard from '../components/BookCard';
import { getFeaturedBooks } from '../services/api';

export default function HomePage({ setActivePage, setSelectedCategory, setInitialSearch, onQuickView }) {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroSearch, setHeroSearch] = useState('');

  useEffect(() => {
    let isMounted = true;
    const fetchFeatured = async () => {
      setLoading(true);
      const books = await getFeaturedBooks();
      if (isMounted) {
        setFeaturedBooks(books);
        setLoading(false);
      }
    };
    fetchFeatured();
    return () => { isMounted = false; };
  }, []);

  const handleHeroSearchSubmit = (e) => {
    e.preventDefault();
    if (setInitialSearch) setInitialSearch(heroSearch);
    setActivePage('catalogue');
  };

  const handleCategoryClick = (category) => {
    if (setSelectedCategory) setSelectedCategory(category);
    setActivePage('catalogue');
  };

  const categories = [
    { name: 'Technology & AI', icon: '💻', count: '4 Titles' },
    { name: 'Self-Improvement', icon: '⚡', count: '3 Titles' },
    { name: 'Fiction', icon: '✨', count: '4 Titles' },
    { name: 'Business & Finance', icon: '📈', count: '2 Titles' },
    { name: 'Psychology & Science', icon: '🧠', count: '3 Titles' },
    { name: 'History & Philosophy', icon: '🏛️', count: '2 Titles' }
  ];

  return (
    <div className="home-page fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-pill-badge">
              <Sparkles size={15} className="pill-sparkle" />
              <span>Modern Literary Sanctuary</span>
            </div>

            <h1 className="hero-title">
              Expand Your Mind with Every <span className="gradient-text">Turn of the Page</span>
            </h1>

            <p className="hero-subtitle">
              Explore curated modern engineering epics, timeless literature, cognitive science, and bestsellers. Built with Spring Boot and React for uncompromising speed and precision.
            </p>

            {/* Quick Hero Search Form */}
            <form className="hero-search-form" onSubmit={handleHeroSearchSubmit}>
              <input
                type="text"
                className="hero-search-input"
                placeholder="Search by title, author, or ISBN (e.g., Kleppmann, Clean Architecture)..."
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                id="hero-search-input"
              />
              <button type="submit" className="btn btn-primary hero-search-btn" id="hero-search-submit-btn">
                <span>Search</span>
                <ArrowRight size={16} />
              </button>
            </form>

            {/* Quick Action Buttons */}
            <div className="hero-actions">
              <button
                className="btn btn-primary"
                onClick={() => setActivePage('catalogue')}
                id="hero-explore-catalogue-btn"
              >
                <span>Browse Catalogue</span>
                <ArrowRight size={16} />
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setActivePage('register')}
                id="hero-join-club-btn"
              >
                Join Lumina Club
              </button>
            </div>
          </div>

          {/* Hero Visual Collage */}
          <div className="hero-visual">
            <div className="hero-visual-card glass-panel">
              <img
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
                alt="Featured Book Spotlight"
                className="hero-card-img"
              />
              <div className="hero-card-floating-badge">
                <Star size={16} className="star-filled" />
                <span>4.9 / 5.0 Rating</span>
              </div>
              <div className="hero-card-footer-info">
                <h4>Designing Data-Intensive Applications</h4>
                <p>Martin Kleppmann &bull; Software Engineering Classic</p>
                <div className="hero-card-price-row">
                  <span className="price-tag">$38.99</span>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setActivePage('catalogue')}
                  >
                    View in Catalogue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics / Social Proof Counter Bar */}
      <section className="stats-bar">
        <div className="container stats-grid">
          <div className="stat-card">
            <h3>10,000+</h3>
            <p>Curated Literary Works</p>
          </div>
          <div className="stat-card">
            <h3>99.4%</h3>
            <p>Customer Satisfaction</p>
          </div>
          <div className="stat-card">
            <h3>24-48h</h3>
            <p>Fast Dispatch & Delivery</p>
          </div>
          <div className="stat-card">
            <h3>100%</h3>
            <p>Secure Spring Boot Backend</p>
          </div>
        </div>
      </section>

      {/* Category Explorer */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <div className="section-subtitle-wrap">
              <Compass size={18} className="section-icon" />
              <span>Browse by Genre</span>
            </div>
            <h2>Explore Our Curated Collections</h2>
            <p>Discover hand-selected volumes tailored to inspire and enlighten.</p>
          </div>

          <div className="categories-grid">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="category-card glass-panel"
                onClick={() => handleCategoryClick(cat.name)}
                style={{ cursor: 'pointer' }}
              >
                <span className="category-emoji">{cat.icon}</span>
                <div className="category-info">
                  <h4>{cat.name}</h4>
                  <span className="category-count">{cat.count}</span>
                </div>
                <ArrowRight size={16} className="category-arrow" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Bestsellers Section */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header flex-header">
            <div>
              <div className="section-subtitle-wrap">
                <Flame size={18} className="section-icon flame-icon" />
                <span>Reader Favorites</span>
              </div>
              <h2>Featured Bestsellers</h2>
              <p>Top picks loved by avid readers and technical leaders alike.</p>
            </div>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => setActivePage('catalogue')}
            >
              View Full Catalogue ({featuredBooks.length}+)
            </button>
          </div>

          {loading ? (
            <div className="loading-spinner-wrap">
              <div className="spinner" />
              <p>Loading curated bestsellers from Spring Boot API...</p>
            </div>
          ) : (
            <div className="books-grid">
              {featuredBooks.slice(0, 4).map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Literary Quote / Inspiration */}
      <section className="quote-section">
        <div className="container">
          <div className="quote-box glass-panel">
            <Quote size={40} className="quote-icon" />
            <blockquote>
              "A reader lives a thousand lives before he dies. The man who never reads lives only one."
            </blockquote>
            <cite>&mdash; George R.R. Martin</cite>
          </div>
        </div>
      </section>

      {/* Call to Action Bar */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-banner glass-panel">
            <div className="cta-text">
              <h2>Join Lumina Readers Society</h2>
              <p>Sign up in under 30 seconds to save bookmarks, review books, and unlock exclusive discounts.</p>
            </div>
            <div className="cta-actions">
              <button
                className="btn btn-primary"
                onClick={() => setActivePage('register')}
              >
                Create Free Account
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setActivePage('login')}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
