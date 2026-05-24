import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout = ({ language }) => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    notes: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const orderData = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      customer: formData,
      items: cartItems,
      total: cartTotal,
      paymentMethod: paymentMethod,
      status: 'Pending'
    };

    const savedOrders = localStorage.getItem('arydi_orders');
    let orders = [];
    if (savedOrders) {
      try {
        orders = JSON.parse(savedOrders);
      } catch (e) {
        console.error('Error loading orders:', e);
      }
    }
    orders.unshift(orderData);
    localStorage.setItem('arydi_orders', JSON.stringify(orders));
    
    clearCart();
    
    navigate('/order-confirmation', { state: { order: orderData } });
  };

  if (cartItems.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '100px 24px 80px 24px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{
          fontFamily: 'Playfair Display',
          fontSize: '36px',
          fontWeight: '400',
          marginBottom: '40px',
          textAlign: 'center'
        }}>
          {language === 'EN' ? 'Checkout' : 'إتمام الشراء'}
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: '40px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            height: 'fit-content'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '500',
              marginBottom: '20px',
              paddingBottom: '10px',
              borderBottom: '1px solid #eee'
            }}>
              {language === 'EN' ? 'Order Summary' : 'ملخص الطلب'}
            </h2>
            
            {cartItems.map((item) => (
              <div key={item.id} style={{
                display: 'flex',
                gap: '15px',
                padding: '15px 0',
                borderBottom: '1px solid #f0f0f0'
              }}>
                <div style={{
                  width: '60px',
                  height: '80px',
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
                      fontSize: '10px',
                      color: '#999'
                    }}>
                      No img
                    </div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 5px 0', fontSize: '14px' }}>
                    {language === 'EN' ? item.name : (item.nameAr || item.name)}
                  </h4>
                  <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>
                    {item.price} MAD x {item.quantity}
                  </p>
                  <p style={{ margin: '5px 0 0 0', fontSize: '14px', fontWeight: '600' }}>
                    {item.price * item.quantity} MAD
                  </p>
                </div>
              </div>
            ))}
            
            <div style={{
              marginTop: '20px',
              paddingTop: '20px',
              borderTop: '2px solid #eee'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '18px',
                fontWeight: '600'
              }}>
                <span>{language === 'EN' ? 'Total' : 'المجموع'}</span>
                <span>{cartTotal} MAD</span>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gap: '20px' }}>
                <input
                  type="text"
                  name="fullName"
                  placeholder={language === 'EN' ? 'Full Name' : 'الاسم الكامل'}
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  style={{
                    padding: '14px',
                    border: '1px solid #ddd',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#000'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'}
                />
                
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    padding: '14px',
                    border: '1px solid #ddd',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#000'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'}
                />
                
                <input
                  type="tel"
                  name="phone"
                  placeholder={language === 'EN' ? 'Phone Number' : 'رقم الهاتف'}
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  style={{
                    padding: '14px',
                    border: '1px solid #ddd',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#000'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'}
                />
                
                <input
                  type="text"
                  name="address"
                  placeholder={language === 'EN' ? 'Address' : 'العنوان'}
                  value={formData.address}
                  onChange={handleChange}
                  required
                  style={{
                    padding: '14px',
                    border: '1px solid #ddd',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#000'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'}
                />
                
                <input
                  type="text"
                  name="city"
                  placeholder={language === 'EN' ? 'City' : 'المدينة'}
                  value={formData.city}
                  onChange={handleChange}
                  required
                  style={{
                    padding: '14px',
                    border: '1px solid #ddd',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#000'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'}
                />
                
                <textarea
                  name="notes"
                  placeholder={language === 'EN' ? 'Order Notes (optional)' : 'ملاحظات على الطلب (اختياري)'}
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  style={{
                    padding: '14px',
                    border: '1px solid #ddd',
                    fontSize: '14px',
                    fontFamily: 'Inter',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#000'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'}
                />
                
                <div style={{ marginTop: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500' }}>
                    {language === 'EN' ? 'Payment Method' : 'طريقة الدفع'}
                  </label>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="payment"
                        value="cash"
                        checked={paymentMethod === 'cash'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span>{language === 'EN' ? 'Cash on Delivery' : 'الدفع عند الاستلام'}</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span>{language === 'EN' ? 'Credit Card' : 'بطاقة ائتمان'}</span>
                    </label>
                  </div>
                </div>
                
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#000',
                    color: 'white',
                    padding: '16px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    letterSpacing: '2px',
                    marginTop: '20px'
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                  onMouseLeave={(e) => e.target.style.opacity = '1'}
                >
                  {language === 'EN' ? 'PLACE ORDER' : 'تأكيد الطلب'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;