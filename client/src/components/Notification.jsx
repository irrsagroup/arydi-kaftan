import React, { useEffect } from 'react';

const Notification = ({ message, show, onClose, language }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      backgroundColor: '#000',
      color: 'white',
      padding: '16px 24px',
      borderRadius: '8px',
      zIndex: 3000,
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      animation: 'slideIn 0.3s ease'
    }}>
      <p style={{ margin: 0, fontSize: '14px' }}>
        ✓ {message}
      </p>
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Notification;