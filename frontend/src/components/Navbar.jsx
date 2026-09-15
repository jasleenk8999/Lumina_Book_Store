import React, { useState, useEffect } from 'react';
import { BookOpen, ShoppingBag, User, LogOut, Search, Menu, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { checkBackendHealth } from '../services/api';

export default function Navbar({ activePage, setActivePage }) {
  const { user, logout } = useAuth();
  const { totalItems, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [apiConnected, setApiConnected] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const check = async () => {
      const res = await checkBackendHealth();
      if (isMounted) setApiConnected(res.connected);
    };
    check();
    const interval = setInterval(check, 10000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleNav = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar-root">
      <div className="container nav-container">
        {/* Brand Logo */}
        <div className="brand" onClick={() => handleNav('home')} style={{ cursor: 'pointer' }}>
          <div className="logo-icon">
            <BookOpen size={22} className="book-symbol" />
          </div>
          <div className="brand-text">
            <span className="brand-name">LUMINA</span>
            <span className="brand-sub">BOOKS</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          <button
            className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
            onClick={() => handleNav('home')}
            id="nav-home-btn"
          >
            Home
          </button>
          <button
            className={`nav-link ${activePage === 'catalogue' ? 'active' : ''}`}
            onClick={() => handleNav('catalogue')}
            id="nav-catalogue-btn"
          >
            Catalogue
          </button>
        </nav>

        {/* Right Actions (Status, Auth, Cart) */}
        <div className="nav-actions">
          {/* Spring Boot Backend Status Badge */}
          <div className="api-status-badge" title={apiConnected ? "Connected to Spring Boot Backend on :8080" : "Connecting to Spring Boot REST API..."}>
            <span className={`status-dot ${apiConnected ? 'live' : 'offline'}`} />
            <span className="status-label">{apiConnected ? 'Spring Boot Live' : 'API Standby'}</span>
          </div>

          {/* User Auth Section */}
          {user ? (
            <div className="user-profile-menu">
              <div className="user-avatar" title={user.email}>
                <User size={16} />
                <span className="user-name-abbr">{user.fullName.split(' ')[0]}</span>
              </div>
              <button
                className="btn-icon btn-logout"
                onClick={logout}
                title="Sign Out"
                id="user-logout-btn"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button
                className={`btn btn-sm ${activePage === 'login' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => handleNav('login')}
                id="nav-login-btn"
              >
                Sign In
              </button>
              <button
                className={`btn btn-sm ${activePage === 'register' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => handleNav('register')}
                id="nav-register-btn"
              >
                Register
              </button>
            </div>
          )}

          {/* Shopping Bag Button */}
          <button
            className="cart-trigger-btn"
            onClick={openCart}
            aria-label="View shopping bag"
            id="open-cart-drawer-btn"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            className="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-nav-menu fade-in">
          <button
            className={`mobile-nav-item ${activePage === 'home' ? 'active' : ''}`}
            onClick={() => handleNav('home')}
          >
            Home
          </button>
          <button
            className={`mobile-nav-item ${activePage === 'catalogue' ? 'active' : ''}`}
            onClick={() => handleNav('catalogue')}
          >
            Browse Catalogue
          </button>
          {user ? (
            <div className="mobile-user-section">
              <p className="mobile-user-greeting">Signed in as <strong>{user.fullName}</strong></p>
              <button className="btn btn-secondary btn-sm" onClick={logout}>Sign Out</button>
            </div>
          ) : (
            <div className="mobile-auth-actions">
              <button className="btn btn-primary" onClick={() => handleNav('login')}>Sign In</button>
              <button className="btn btn-secondary" onClick={() => handleNav('register')}>Register New Account</button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
