import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartDrawer = ({ isOpen, onClose, language }) => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, cartCount, removeFromCart, updateQuantity, clearCart } = useCart();

  if (!isOpen) return null;

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '100%',
      maxWidth: '450px',
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
          {language === 'EN' ? 'Shopping Bag' : 'سلة التسوق'} ({cartCount})
        </h3>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer'
          }}
        >
          X
        </button>
      </div>
      
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        {cartItems.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#999'
          }}>
            <p>{language === 'EN' ? 'Your bag is empty' : 'سلتك فارغة'}</p>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  gap: '16px',
                  padding: '16px 0',
                  borderBottom: '1px solid #f0f0f0'
                }}
              >
                <div style={{
                  width: '80px',
                  height: '100px',
                  backgroundColor: '#f5f5f5',
                  overflow: 'hidden'
                }}>
                  {item.image ? (
                    <img
                      src={`http://localhost:5000${item.image}`}
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      color: '#999'
                    }}>
                      No img
                    </div>
                  )}
                </div>
                
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    margin: '0 0 5px 0',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    {language === 'EN' ? item.name : (item.nameAr || item.name)}
                  </h4>
                  <p style={{
                    margin: '0 0 10px 0',
                    fontSize: '14px',
                    color: '#666'
                  }}>
                    {item.price} MAD x {item.quantity}
                  </p>
                  <p style={{
                    margin: '0 0 10px 0',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#000'
                  }}>
                    {(item.price * item.quantity)} MAD
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{
                        width: '28px',
                        height: '28px',
                        border: '1px solid #ddd',
                        background: 'white',
                        cursor: 'pointer'
                      }}
                    >
                      -
                    </button>
                    <span style={{ fontSize: '14px' }}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{
                        width: '28px',
                        height: '28px',
                        border: '1px solid #ddd',
                        background: 'white',
                        cursor: 'pointer'
                      }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        marginLeft: 'auto',
                        background: 'none',
                        border: 'none',
                        color: '#999',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      {language === 'EN' ? 'Remove' : 'إزالة'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <button
              onClick={clearCart}
              style={{
                marginTop: '20px',
                background: 'none',
                border: 'none',
                color: '#ff4444',
                cursor: 'pointer',
                fontSize: '12px',
                textDecoration: 'underline'
              }}
            >
              {language === 'EN' ? 'Clear All' : 'مسح الكل'}
            </button>
          </>
        )}
      </div>
      
      {cartItems.length > 0 && (
        <div style={{
          padding: '24px',
          borderTop: '1px solid #eee'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            <span>{language === 'EN' ? 'Total' : 'المجموع'}</span>
            <span>{cartTotal} MAD</span>
          </div>
          <button
            onClick={handleCheckout}
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
      )}
    </div>
  );
};

export default CartDrawer;