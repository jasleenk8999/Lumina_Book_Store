import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('lumina_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('lumina_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('lumina_user');
    }
  }, [user]);

  const login = async (identifier, password) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const res = await loginUser(identifier, password);
      if (res.success) {
        const userData = {
          id: res.id,
          fullName: res.fullName,
          username: res.username,
          email: res.email,
          role: res.role,
          token: res.token
        };
        setUser(userData);
        setAuthLoading(false);
        return { success: true, user: userData, message: res.message };
      } else {
        setAuthError(res.message);
        setAuthLoading(false);
        return { success: false, message: res.message };
      }
    } catch (err) {
      const msg = err.message || 'Login failed. Please check your network connection.';
      setAuthError(msg);
      setAuthLoading(false);
      return { success: false, message: msg };
    }
  };

  const register = async (formData) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const res = await registerUser(formData);
      if (res.success) {
        const userData = {
          id: res.id,
          fullName: res.fullName,
          username: res.username,
          email: res.email,
          role: res.role,
          token: res.token
        };
        setUser(userData);
        setAuthLoading(false);
        return { success: true, user: userData, message: res.message };
      } else {
        setAuthError(res.message);
        setAuthLoading(false);
        return { success: false, message: res.message };
      }
    } catch (err) {
      const msg = err.message || 'Registration failed.';
      setAuthError(msg);
      setAuthLoading(false);
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lumina_user');
  };

  return (
    <AuthContext.Provider value={{ user, authLoading, authError, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
