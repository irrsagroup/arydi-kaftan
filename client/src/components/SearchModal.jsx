import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchModal = ({ isOpen, onClose, language }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      fetchAllProducts();
    }
  }, [isOpen]);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setAllProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setResults([]);
      return;
    }
    const filtered = allProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.nameAr && product.nameAr.includes(searchTerm))
    );
    setResults(filtered);
  }, [searchTerm, allProducts]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    onClose();
    setSearchTerm('');
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.8)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }} onClick={onClose}>
      <div style={{
        backgroundColor: 'white',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '80%',
        borderRadius: '0',
        overflow: 'hidden'
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #eee'
        }}>
          <input
            type="text"
            placeholder={language === 'EN' ? 'Search for kaftans, kimonos, jewelry...' : 'ابحث عن قفطان، كيمونو، مجوهرات...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            style={{
              width: '100%',
              padding: '16px',
              border: '1px solid #ddd',
              fontSize: '16px',
              outline: 'none'
            }}
          />
        </div>
        <div style={{
          padding: '24px',
          maxHeight: '400px',
          overflowY: 'auto'
        }}>
          {results.length === 0 && searchTerm && (
            <p style={{ color: '#999', textAlign: 'center' }}>
              {language === 'EN' ? 'No products found' : 'لا توجد منتجات'}
            </p>
          )}
          {results.map(product => (
            <div
              key={product._id}
              onClick={() => handleProductClick(product._id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                borderBottom: '1px solid #f0f0f0',
                cursor: 'pointer',
                transition: 'backgroundColor 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '12px', color: '#999' }}>IMG</span>
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '16px', color: '#000' }}>
                  {language === 'EN' ? product.name : product.nameAr}
                </h4>
                <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#666' }}>
                  {product.price} MAD
                </p>
              </div>
            </div>
          ))}
        </div>
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid #eee',
          textAlign: 'center'
        }}>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '14px',
              cursor: 'pointer',
              color: '#999'
            }}
          >
            {language === 'EN' ? 'Close' : 'إغلاق'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;