import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toast } = useCart();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'error':
        return <AlertCircle size={18} className="toast-icon-error" />;
      case 'info':
        return <Info size={18} className="toast-icon-info" />;
      default:
        return <CheckCircle2 size={18} className="toast-icon-success" />;
    }
  };

  return (
    <div className={`toast-notification fade-in toast-${toast.type || 'success'}`}>
      {getIcon()}
      <span className="toast-message">{toast.message}</span>
    </div>
  );
}
