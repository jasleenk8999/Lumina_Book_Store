import React, { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, RotateCcw, BookOpen, AlertCircle } from 'lucide-react';
import BookCard from '../components/BookCard';
import { getBooks, getCategories } from '../services/api';

export default function CataloguePage({ initialCategory, initialSearch, onQuickView }) {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All');
  const [searchQuery, setSearchQuery] = useState(initialSearch || '');
  const [sortBy, setSortBy] = useState('default');
  const [maxPrice, setMaxPrice] = useState(60);
  const [loading, setLoading] = useState(true);
  const [isLiveApi, setIsLiveApi] = useState(false);

  // Sync category if passed from parent
  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    if (initialSearch) setSearchQuery(initialSearch);
  }, [initialSearch]);

  // Fetch categories once
  useEffect(() => {
    const fetchCats = async () => {
      const cats = await getCategories();
      setCategories(['All', ...cats]);
    };
    fetchCats();
  }, []);

  // Fetch books whenever category, search, or sort changes
  useEffect(() => {
    let isMounted = true;
    const loadBooks = async () => {
      setLoading(true);
      const res = await getBooks(
        selectedCategory === 'All' ? '' : selectedCategory,
        searchQuery,
        sortBy === 'default' ? '' : sortBy
      );
      if (isMounted) {
        setBooks(res.data);
        setIsLiveApi(res.isLive);
        setLoading(false);
      }
    };
    const debounceTimer = setTimeout(loadBooks, 250);
    return () => {
      isMounted = false;
      clearTimeout(debounceTimer);
    };
  }, [selectedCategory, searchQuery, sortBy]);

  // Client side price ceiling filter
  const displayedBooks = books.filter(b => b.price <= maxPrice);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('default');
    setMaxPrice(60);
  };

  return (
    <div className="catalogue-page fade-in">
      <div className="container">
        {/* Header Title & Subtitle */}
        <div className="catalogue-header">
          <div className="catalogue-badge-wrap">
            <BookOpen size={16} className="header-icon" />
            <span>Curated Library</span>
          </div>
          <h1>Explore Literary Catalogue</h1>
          <p>
            Browse our full spectrum of computer science masterpieces, bestsellers, and literary treasures.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="catalogue-controls-panel glass-panel">
          {/* Top Search Input */}
          <div className="search-control-wrap">
            <Search size={18} className="search-icon-input" />
            <input
              type="text"
              placeholder="Search books by title, author, category, or ISBN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="catalogue-search-input"
              id="catalogue-search-input"
            />
            {searchQuery && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear Search"
              >
                &times;
              </button>
            )}
          </div>

          {/* Secondary Controls: Categories, Sort & Price Range */}
          <div className="filter-row">
            {/* Category Pills */}
            <div className="category-scroll-pills">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                  id={`cat-pill-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort & Price Controls */}
            <div className="sort-price-controls">
              {/* Price Filter Slider */}
              <div className="price-slider-wrap">
                <label className="filter-label">
                  <span>Max Price:</span> <strong>${maxPrice}</strong>
                </label>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="2"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="price-slider"
                  id="catalogue-price-slider"
                />
              </div>

              {/* Sort Dropdown */}
              <div className="sort-dropdown-wrap">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                  id="catalogue-sort-select"
                >
                  <option value="default">Sort: Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest Releases</option>
                  <option value="title">Alphabetical (A-Z)</option>
                </select>
              </div>

              {/* Reset Filter Button */}
              {(selectedCategory !== 'All' || searchQuery || sortBy !== 'default' || maxPrice < 60) && (
                <button
                  className="btn btn-secondary btn-sm reset-btn"
                  onClick={handleResetFilters}
                  title="Reset all filters"
                  id="catalogue-reset-filters-btn"
                >
                  <RotateCcw size={14} />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Bar */}
        <div className="results-status-bar">
          <p className="results-count">
            Showing <strong>{displayedBooks.length}</strong> {displayedBooks.length === 1 ? 'book' : 'books'}
            {selectedCategory !== 'All' && <span> in <em>{selectedCategory}</em></span>}
            {searchQuery && <span> matching "<strong>{searchQuery}</strong>"</span>}
          </p>
          <span className="database-sync-tag">
            {isLiveApi ? '● Live Spring Boot Database Sync' : '● In-Memory Preloaded Catalogue'}
          </span>
        </div>

        {/* Book Grid */}
        {loading ? (
          <div className="loading-state">
            <div className="spinner" />
            <p>Retrieving available books from database...</p>
          </div>
        ) : displayedBooks.length === 0 ? (
          <div className="empty-results glass-panel">
            <AlertCircle size={48} className="empty-icon" />
            <h3>No Books Match Your Criteria</h3>
            <p>Try searching for a different keyword or reset your filters to view all available titles.</p>
            <button className="btn btn-primary btn-sm" onClick={handleResetFilters}>
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="books-grid">
            {displayedBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
