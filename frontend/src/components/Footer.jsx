import React from 'react';
import { BookOpen, Heart, ShieldCheck, Truck, RefreshCw, Send } from 'lucide-react';

export default function Footer({ setActivePage }) {
  return (
    <footer className="footer-root">
      {/* Trust & Guarantee Banner */}
      <div className="footer-guarantee-bar">
        <div className="container guarantee-grid">
          <div className="guarantee-item">
            <Truck size={24} className="guarantee-icon" />
            <div>
              <h4>Free Priority Shipping</h4>
              <p>On all domestic literary orders over $50</p>
            </div>
          </div>
          <div className="guarantee-item">
            <ShieldCheck size={24} className="guarantee-icon" />
            <div>
              <h4>Authentic Editions</h4>
              <p>Direct publisher partnerships & vetted prints</p>
            </div>
          </div>
          <div className="guarantee-item">
            <RefreshCw size={24} className="guarantee-icon" />
            <div>
              <h4>30-Day Hassle-Free Returns</h4>
              <p>Love your books or exchange with no questions asked</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container footer-main-content">
        <div className="footer-col brand-col">
          <div className="brand" style={{ marginBottom: '1rem' }}>
            <div className="logo-icon">
              <BookOpen size={22} />
            </div>
            <div className="brand-text">
              <span className="brand-name">LUMINA</span>
              <span className="brand-sub">BOOKS</span>
            </div>
          </div>
          <p className="footer-bio">
            A boutique bookstore and literary sanctuary. Connecting readers with timeless classics, modern engineering masterpieces, and illuminating ideas.
          </p>
          <div className="tech-stack-badges">
            <span className="badge badge-indigo">React 19</span>
            <span className="badge badge-gold">Spring Boot 3</span>
            <span className="badge badge-emerald">JPA & Database</span>
          </div>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <ul className="footer-links">
            <li><button onClick={() => setActivePage('home')}>Home</button></li>
            <li><button onClick={() => setActivePage('catalogue')}>All Books</button></li>
            <li><button onClick={() => setActivePage('catalogue')}>Bestsellers</button></li>
            <li><button onClick={() => setActivePage('catalogue')}>New Releases</button></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Account</h4>
          <ul className="footer-links">
            <li><button onClick={() => setActivePage('login')}>Sign In</button></li>
            <li><button onClick={() => setActivePage('register')}>Register Account</button></li>
            <li><a href="#demo-login" onClick={() => setActivePage('login')}>Demo Access</a></li>
            <li><a href="http://localhost:8080/h2-console" target="_blank" rel="noreferrer">H2 Database Console</a></li>
          </ul>
        </div>

        <div className="footer-col newsletter-col">
          <h4>Literary Dispatch</h4>
          <p>Subscribe for curated weekly reading lists, author interviews, and exclusive discounts.</p>
          <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to Lumina Dispatch!'); }}>
            <input
              type="email"
              placeholder="Enter your email address..."
              required
              className="newsletter-input"
            />
            <button type="submit" className="btn btn-primary btn-sm" aria-label="Subscribe">
              <Send size={15} />
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="container footer-bottom-flex">
          <p>&copy; {new Date().getFullYear()} Lumina Book Store. Built with React & Spring Boot. All rights reserved.</p>
          <p className="developer-tag">Designed with <Heart size={14} className="heart-icon" /> by <strong>Jasleen Kaur Multani (12410014)</strong></p>
        </div>
      </div>
    </footer>
  );
}
