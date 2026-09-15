import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Lumina Bookstore Uncaught UI Error:', error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.removeItem('lumina_cart');
    } catch {}
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0d14',
          color: '#f8fafc',
          padding: '2rem',
          textAlign: 'center',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <div style={{
            background: 'rgba(30, 41, 59, 0.7)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '16px',
            padding: '2.5rem',
            maxWidth: '500px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
          }}>
            <h2 style={{ color: '#f59e0b', marginBottom: '1rem', fontSize: '1.5rem' }}>
              Oops! Something went wrong
            </h2>
            <p style={{ color: '#94a3b8', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
              An unexpected display error occurred. Clicking below will clear any corrupted session data and reload the application safely.
            </p>
            <button
              onClick={this.handleReset}
              style={{
                background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '0.95rem'
              }}
            >
              Reset & Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
