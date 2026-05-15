import React, { useState } from 'react';

const ShoppingBag = ({ isOpen, onClose, language }) => {
  const [cart, setCart] = useState([]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '400px',
      height: '100%',
      backgroundColor: 'white',
      zIndex: 2000,
      boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        padding: '24px',
        borderBottom: '1px solid #eee',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '400' }}>
          {language === 'EN' ? 'Shopping Bag' : 'سلة التسوق'}
        </h3>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer'
          }}
        >
          X
        </button>
      </div>
      
      <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
        {cart.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999', marginTop: '60px' }}>
            {language === 'EN' ? 'Your bag is empty' : 'سلتك فارغة'}
          </p>
        ) : (
          cart.map((item, idx) => (
            <div key={idx}>Item</div>
          ))
        )}
      </div>
      
      <div style={{
        padding: '24px',
        borderTop: '1px solid #eee'
      }}>
        <button
          style={{
            width: '100%',
            backgroundColor: '#000',
            color: 'white',
            padding: '16px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            letterSpacing: '1px'
          }}
        >
          {language === 'EN' ? 'CHECKOUT' : 'إتمام الشراء'}
        </button>
      </div>
    </div>
  );
};

export default ShoppingBag;