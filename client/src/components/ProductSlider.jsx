import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductSlider = ({ language }) => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 1, name: 'Kimono', nameAr: 'كيمونو' },
    { id: 2, name: 'Kaftan', nameAr: 'قفطان' },
    { id: 3, name: 'One piece Kaftan', nameAr: 'قفطان قطعة واحدة' },
    { id: 4, name: 'Two piece Kaftan', nameAr: 'قفطان قطعتين' },
    { id: 5, name: 'Djelaba', nameAr: 'جلابة' },
    { id: 6, name: 'Jewelry', nameAr: 'مجوهرات' }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setAllProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  const getProductsByCategory = (categoryName) => {
    return allProducts.filter(p => p.category === categoryName);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
      }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'white', paddingBottom: '80px' }}>
      {categories.map((category, catIndex) => {
        const products = getProductsByCategory(category.name);
        
        if (products.length === 0) return null;
        
        return (
          <div key={catIndex} style={{ marginBottom: '80px' }}>
            <div style={{
              textAlign: 'center',
              padding: '40px 20px 30px 20px'
            }}>
              <h2 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(32px, 6vw, 48px)',
                fontWeight: '400',
                letterSpacing: '2px',
                color: '#000',
                margin: 0,
                display: 'inline-block'
              }}>
                {language === 'EN' ? category.name : category.nameAr}
              </h2>
              <div style={{
                width: '50px',
                height: '2px',
                backgroundColor: '#000',
                margin: '15px auto 0'
              }}></div>
            </div>

            <div style={{ padding: '10px 0' }}>
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                slidesPerView={1}
                spaceBetween={0}
                breakpoints={{
                  640: { slidesPerView: 2, spaceBetween: 15 },
                  768: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 3, spaceBetween: 25 },
                  1280: { slidesPerView: 4, spaceBetween: 30 }
                }}
                style={{ padding: '15px 20px' }}
              >
                {products.map((product) => (
                  <SwiperSlide key={product._id}>
                    <div
                      onClick={() => handleProductClick(product._id)}
                      style={{
                        cursor: 'pointer',
                        textAlign: 'center',
                        padding: '8px',
                        transition: 'transform 0.3s ease',
                        backgroundColor: '#fff'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <div style={{
                        width: '100%',
                        aspectRatio: '3/4',
                        backgroundColor: '#f8f8f8',
                        marginBottom: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        position: 'relative'
                      }}>
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={`http://localhost:5000${product.images[0]}`}
                            alt={product.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              objectPosition: 'center'
                            }}
                          />
                        ) : (
                          <div style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#e0e0e0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#999',
                            fontSize: '12px'
                          }}>
                            No Image
                          </div>
                        )}
                      </div>
                      <h3 style={{
                        fontSize: 'clamp(14px, 4vw, 16px)',
                        fontWeight: '500',
                        marginBottom: '6px',
                        color: '#000',
                        letterSpacing: '0.5px'
                      }}>
                        {language === 'EN' ? product.name : (product.nameAr || product.name)}
                      </h3>
                      <p style={{
                        fontSize: 'clamp(12px, 3.5vw, 14px)',
                        color: '#888',
                        marginBottom: '6px'
                      }}>
                        {product.price} MAD
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductSlider;