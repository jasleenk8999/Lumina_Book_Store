import React, { useState } from 'react';
import { UserPlus, User, Mail, Lock, Eye, EyeOff, Check, X, AlertCircle, CheckCircle2, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function RegistrationPage({ setActivePage }) {
  const { register, authLoading } = useAuth();
  const { showToast } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Password strength calculation
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, text: 'Empty', color: 'gray' };
    let score = 0;
    if (pwd.length >= 6) score += 1;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 2) return { score: 1, text: 'Weak', color: '#f43f5e' };
    if (score <= 3) return { score: 2, text: 'Moderate', color: '#f59e0b' };
    return { score: 3, text: 'Strong', color: '#10b981' };
  };

  const strength = getPasswordStrength(formData.password);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData.username.trim()) {
      errs.username = 'Username is required';
    } else if (formData.username.trim().length < 3) {
      errs.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username.trim())) {
      errs.username = 'Username can only contain letters, numbers, and underscores';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email format';
    }

    if (!formData.password) {
      errs.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      errs.confirmPassword = 'Confirmation password is required';
    } else if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
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

    const payload = {
      fullName: formData.fullName.trim(),
      username: formData.username.trim(),
      email: formData.email.trim(),
      password: formData.password
    };

    const res = await register(payload);
    if (res.success) {
      setSuccessMessage('Account registered successfully into the database!');
      showToast('Registration complete! Welcome to Lumina.', 'success');
      setTimeout(() => {
        setActivePage('catalogue');
      }, 1500);
    } else {
      setServerError(res.message || 'Registration could not be completed.');
    }
  };

  return (
    <div className="auth-page-container fade-in">
      <div className="container auth-flex-wrapper">
        {/* Left Side Aesthetic Showcase */}
        <div className="auth-brand-card glass-panel">
          <div className="auth-brand-header">
            <div className="logo-icon">
              <BookOpen size={24} />
            </div>
            <h2>Join the Lumina Community</h2>
            <p>Become part of a flourishing circle of curious minds, software craftspeople, and passionate readers.</p>
          </div>

          <div className="auth-features-list">
            <div className="feature-bullet">
              <ShieldCheck size={16} className="bullet-icon" />
              <span>Zero plain-text passwords &mdash; hashed with Spring Security BCrypt</span>
            </div>
            <div className="feature-bullet">
              <Sparkles size={16} className="bullet-icon" />
              <span>Instant database persistence into H2 / MySQL</span>
            </div>
            <div className="feature-bullet">
              <Sparkles size={16} className="bullet-icon" />
              <span>Full synchronization between React frontend and REST backend</span>
            </div>
          </div>

          <div className="registration-quote-box">
            <p>
              "To read is to fly: it is to soar to a point of vantage which gives a view over wide terrains of history, human variety, ideas, shared experience and dreams."
            </p>
          </div>
        </div>

        {/* Right Side Registration Form */}
        <div className="auth-form-card glass-panel">
          <div className="form-header">
            <div className="form-icon-wrap">
              <UserPlus size={24} className="form-head-icon" />
            </div>
            <h2>Create New Account</h2>
            <p>Fill in the details below to register into the system</p>
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
            {/* Full Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="fullName">Full Name</label>
              <div className="input-with-icon">
                <User size={18} className="input-inner-icon" />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Jasleen Kaur"
                  className={`form-input has-icon ${errors.fullName ? 'error' : ''}`}
                />
              </div>
              {errors.fullName && <span className="form-error-msg">{errors.fullName}</span>}
            </div>

            {/* Username */}
            <div className="form-group">
              <label className="form-label" htmlFor="username">Choose Username</label>
              <div className="input-with-icon">
                <span className="input-inner-prefix">@</span>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="e.g. jasleen_reader"
                  className={`form-input has-icon ${errors.username ? 'error' : ''}`}
                />
              </div>
              {errors.username && <span className="form-error-msg">{errors.username}</span>}
            </div>

            {/* Email Address */}
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-inner-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. jasleen@example.com"
                  className={`form-input has-icon ${errors.email ? 'error' : ''}`}
                />
              </div>
              {errors.email && <span className="form-error-msg">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label" htmlFor="reg-password">Password</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-inner-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="reg-password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a secure password (min 6 chars)"
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

              {/* Password Strength Meter */}
              {formData.password && (
                <div className="password-strength-indicator">
                  <div className="strength-header">
                    <span>Strength:</span>
                    <strong style={{ color: strength.color }}>{strength.text}</strong>
                  </div>
                  <div className="strength-track">
                    <div
                      className="strength-fill"
                      style={{
                        width: `${(strength.score / 3) * 100}%`,
                        backgroundColor: strength.color
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-inner-icon" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password to confirm"
                  className={`form-input has-icon ${errors.confirmPassword ? 'error' : ''}`}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && <span className="form-error-msg">{errors.confirmPassword}</span>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary btn-block auth-submit-btn"
              disabled={authLoading}
              id="register-submit-btn"
            >
              {authLoading ? 'Registering Account...' : 'Complete Registration'}
            </button>
          </form>

          {/* Switch to Login */}
          <div className="auth-switch-footer">
            <p>
              Already have an account?{' '}
              <button
                type="button"
                className="switch-link"
                onClick={() => setActivePage('login')}
                id="switch-to-login-btn"
              >
                Sign In Instead
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
