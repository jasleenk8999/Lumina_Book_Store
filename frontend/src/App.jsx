import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import BookDetailModal from './components/BookDetailModal';
import Toast from './components/Toast';
import ErrorBoundary from './components/ErrorBoundary';

import HomePage from './pages/HomePage';
import CataloguePage from './pages/CataloguePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';

import './App.css';

function MainLayout() {
  const [activePage, setActivePage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewBook, setQuickViewBook] = useState(null);

  const handleOpenBookModal = (book) => {
    setQuickViewBook(book);
  };

  const handleCloseBookModal = () => {
    setQuickViewBook(null);
  };

  return (
    <div className="app-layout">
      {/* Navigation Header */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* Main Routed Page Body */}
      <main className="main-content">
        {activePage === 'home' && (
          <HomePage
            setActivePage={setActivePage}
            setSelectedCategory={setSelectedCategory}
            setInitialSearch={setSearchQuery}
            onQuickView={handleOpenBookModal}
          />
        )}

        {activePage === 'catalogue' && (
          <CataloguePage
            initialCategory={selectedCategory}
            initialSearch={searchQuery}
            onQuickView={handleOpenBookModal}
          />
        )}

        {activePage === 'login' && (
          <LoginPage
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'register' && (
          <RegistrationPage
            setActivePage={setActivePage}
          />
        )}
      </main>

      {/* Persistent Components */}
      <BookDetailModal
        book={quickViewBook}
        onClose={handleCloseBookModal}
      />

      <CartDrawer
        onBrowseCatalogue={() => setActivePage('catalogue')}
      />

      <Toast />

      <Footer
        setActivePage={setActivePage}
      />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <MainLayout />
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
