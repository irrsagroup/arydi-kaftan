import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const WishlistDrawer = ({ isOpen, onClose, language, showNotification }) => {
  const navigate = useNavigate();
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const handleProductClick = (productId) => {
    onClose();
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (item, e) => {
    e.stopPropagation();
    const product = {
      _id: item.id,
      name: item.name,
      nameAr: item.nameAr,
      price: item.price,
      images: item.image ? [item.image] : []
    };
    addToCart(product, 1, showNotification);
  };

  const handleRemove = (id, name, e) => {
    e.stopPropagation();
    removeFromWishlist(id, showNotification);
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
          {language === 'EN' ? 'My Wishlist' : 'المفضلة'} ({wishlistCount})
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
        {wishlistItems.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#999'
          }}>
            <p>{language === 'EN' ? 'Your wishlist is empty' : 'قائمة المفضلة فارغة'}</p>
          </div>
        ) : (
          <>
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleProductClick(item.id)}
                style={{
                  display: 'flex',
                  gap: '16px',
                  padding: '16px 0',
                  borderBottom: '1px solid #f0f0f0',
                  cursor: 'pointer'
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
                    {item.price} MAD
                  </p>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      onClick={(e) => handleAddToCart(item, e)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#000',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '11px',
                        letterSpacing: '1px'
                      }}
                    >
                      {language === 'EN' ? 'ADD TO CART' : 'أضف للسلة'}
                    </button>
                    <button
                      onClick={(e) => handleRemove(item.id, item.name, e)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#eee',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '11px',
                        color: '#666'
                      }}
                    >
                      {language === 'EN' ? 'REMOVE' : 'إزالة'}
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => clearWishlist()}
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
    </div>
  );
};

export default WishlistDrawer;