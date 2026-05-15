import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductDetail = ({ language, showNotification }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/id/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
      }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
      }}>
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'white',
      padding: '100px 24px 80px 24px'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px'
      }}>
        <div>
          <div style={{
            width: '100%',
            height: 'auto',
            minHeight: '600px',
            backgroundColor: '#f8f8f8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            overflow: 'hidden',
            borderRadius: '4px'
          }}>
            {product.images && product.images.length > 0 && product.images[selectedImage] ? (
              <img
                src={`http://localhost:5000${product.images[selectedImage]}`}
                alt={product.name}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  maxHeight: '700px'
                }}
              />
            ) : (
              <div style={{ 
                color: '#999', 
                fontSize: '16px',
                padding: '40px',
                textAlign: 'center'
              }}>
                No Image Available
              </div>
            )}
          </div>
          
          {product.images && product.images.length > 1 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 100px))',
              gap: '15px',
              marginTop: '20px'
            }}>
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  style={{
                    width: '100%',
                    height: '100px',
                    backgroundColor: '#f0f0f0',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    border: selectedImage === idx ? '2px solid #000' : '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                >
                  <img
                    src={`http://localhost:5000${img}`}
                    alt={`Thumbnail ${idx}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: '400',
            marginBottom: '20px',
            color: '#000',
            letterSpacing: '1px'
          }}>
            {language === 'EN' ? product.name : (product.nameAr || product.name)}
          </h1>
          
          <p style={{
            fontSize: 'clamp(24px, 4vw, 32px)',
            fontWeight: '300',
            marginBottom: '30px',
            color: '#666'
          }}>
            {product.price} MAD
          </p>
          
          <div style={{
            width: '50px',
            height: '1px',
            backgroundColor: '#ccc',
            marginBottom: '30px'
          }}></div>
          
          <p style={{
            fontSize: 'clamp(15px, 2vw, 17px)',
            lineHeight: '1.8',
            marginBottom: '40px',
            color: '#444'
          }}>
            {language === 'EN' ? product.bio : (product.bioAr || product.bio)}
          </p>
          
          <button 
            onClick={() => addToCart(product, 1, showNotification)}
            style={{
              backgroundColor: '#000',
              color: '#fff',
              padding: '16px 50px',
              border: 'none',
              fontSize: 'clamp(13px, 2vw, 14px)',
              cursor: 'pointer',
              transition: 'opacity 0.3s',
              letterSpacing: '2px',
              width: '100%',
              maxWidth: '300px'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.8'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}>
            {language === 'EN' ? 'ADD TO CART' : 'أضف إلى السلة'}
          </button>
        </div>
      </div>

      {product.images && product.images.length > 1 && (
        <div style={{
          marginTop: '80px',
          borderTop: '1px solid #eee',
          paddingTop: '60px'
        }}>
          <h3 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '24px',
            fontWeight: '400',
            marginBottom: '40px',
            textAlign: 'center',
            letterSpacing: '1px'
          }}>
            {language === 'EN' ? 'More Details' : 'المزيد من التفاصيل'}
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {product.images.slice(1, 8).map((img, idx) => (
              <div key={idx} style={{
                width: '100%',
                backgroundColor: '#f8f8f8',
                overflow: 'hidden',
                borderRadius: '4px'
              }}>
                <img
                  src={`http://localhost:5000${img}`}
                  alt={`${product.name} detail ${idx + 1}`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    maxHeight: '500px'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;