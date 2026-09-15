import React, { useState } from 'react';
import { LogIn, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function LoginPage({ setActivePage }) {
  const { login, authLoading } = useAuth();
  const { showToast } = useCart();

  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validate = () => {
    const errs = {};
    if (!formData.identifier.trim()) {
      errs.identifier = 'Email or Username is required';
    }
    if (!formData.password) {
      errs.password = 'Password is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const res = await login(formData.identifier, formData.password);
    if (res.success) {
      setSuccessMessage(res.message || 'Login successful!');
      showToast(`Welcome back, ${res.user.fullName}!`, 'success');
      setTimeout(() => {
        setActivePage('catalogue');
      }, 1000);
    } else {
      setServerError(res.message || 'Invalid credentials.');
    }
  };

  const handleFillDemo = () => {
    setFormData({
      identifier: 'demo@bookstore.com',
      password: 'secret123'
    });
    setErrors({});
    setServerError('');
  };

  return (
    <div className="auth-page-container fade-in">
      <div className="container auth-flex-wrapper">
        {/* Left Side Aesthetic Visual Card */}
        <div className="auth-brand-card glass-panel">
          <div className="auth-brand-header">
            <div className="logo-icon">
              <BookOpen size={24} />
            </div>
            <h2>Welcome Back to Lumina</h2>
            <p>Access your literary sanctuary, track reading history, and enjoy exclusive member pricing.</p>
          </div>

          <div className="auth-features-list">
            <div className="feature-bullet">
              <Sparkles size={16} className="bullet-icon" />
              <span>Full-stack security powered by Spring Boot & BCrypt</span>
            </div>
            <div className="feature-bullet">
              <Sparkles size={16} className="bullet-icon" />
              <span>Personalized recommendations & synchronized reading cart</span>
            </div>
            <div className="feature-bullet">
              <Sparkles size={16} className="bullet-icon" />
              <span>Immediate access to pre-seeded demo user account</span>
            </div>
          </div>

          <div className="demo-credentials-box">
            <h4>Quick Evaluation Demo Credentials:</h4>
            <p><strong>Email:</strong> demo@bookstore.com</p>
            <p><strong>Password:</strong> secret123</p>
            <button
              type="button"
              className="btn btn-secondary btn-sm fill-demo-btn"
              onClick={handleFillDemo}
              id="fill-demo-credentials-btn"
            >
              Fill Demo Credentials
            </button>
          </div>
        </div>

        {/* Right Side Login Form */}
        <div className="auth-form-card glass-panel">
          <div className="form-header">
            <div className="form-icon-wrap">
              <LogIn size={24} className="form-head-icon" />
            </div>
            <h2>Member Sign In</h2>
            <p>Enter your credentials to access your account</p>
          </div>

          {serverError && (
            <div className="auth-alert error fade-in">
              <AlertCircle size={18} />
              <span>{serverError}</span>
            </div>
          )}

          {successMessage && (
            <div className="auth-alert success fade-in">
              <CheckCircle2 size={18} />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            {/* Email/Username Field */}
            <div className="form-group">
              <label className="form-label" htmlFor="identifier">
                Email Address or Username
              </label>
              <div className="input-with-icon">
                <Mail size={18} className="input-inner-icon" />
                <input
                  type="text"
                  id="identifier"
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleChange}
                  placeholder="e.g. demo@bookstore.com or demouser"
                  className={`form-input has-icon ${errors.identifier ? 'error' : ''}`}
                />
              </div>
              {errors.identifier && <span className="form-error-msg">{errors.identifier}</span>}
            </div>

            {/* Password Field */}
            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label" htmlFor="password">Password</label>
                <span className="label-hint">Default: secret123</span>
              </div>
              <div className="input-with-icon">
                <Lock size={18} className="input-inner-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your account password"
                  className={`form-input has-icon ${errors.password ? 'error' : ''}`}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <span className="form-error-msg">{errors.password}</span>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary btn-block auth-submit-btn"
              disabled={authLoading}
              id="login-submit-btn"
            >
              {authLoading ? 'Verifying with Spring Boot...' : 'Sign In to Account'}
            </button>
          </form>

          {/* Switch to Registration */}
          <div className="auth-switch-footer">
            <p>
              Don't have an account yet?{' '}
              <button
                type="button"
                className="switch-link"
                onClick={() => setActivePage('register')}
                id="switch-to-register-btn"
              >
                Register Here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
