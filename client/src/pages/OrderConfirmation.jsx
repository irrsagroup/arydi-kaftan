import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmation = ({ language }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};

  useEffect(() => {
    if (!order) {
      navigate('/');
    }
  }, [order, navigate]);

  if (!order) return null;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '120px 24px 80px 24px'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          backgroundColor: '#4caf50',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 30px auto'
        }}>
          <span style={{ color: 'white', fontSize: '35px' }}>✓</span>
        </div>
        
        <h1 style={{
          fontFamily: 'Playfair Display',
          fontSize: '32px',
          fontWeight: '400',
          marginBottom: '15px'
        }}>
          {language === 'EN' ? 'Thank You for Your Order!' : 'شكراً لطلبك!'}
        </h1>
        
        <p style={{ color: '#666', marginBottom: '30px' }}>
          {language === 'EN' 
            ? `Order #${order.id} has been placed successfully.`
            : `تم تقديم الطلب رقم ${order.id} بنجاح.`}
        </p>
        
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          textAlign: 'left',
          marginBottom: '30px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '15px', fontSize: '18px' }}>
            {language === 'EN' ? 'Order Details' : 'تفاصيل الطلب'}
          </h3>
          
          <p><strong>{language === 'EN' ? 'Order Number:' : 'رقم الطلب:'}</strong> {order.id}</p>
          <p><strong>{language === 'EN' ? 'Date:' : 'التاريخ:'}</strong> {order.date}</p>
          <p><strong>{language === 'EN' ? 'Payment Method:' : 'طريقة الدفع:'}</strong> 
            {order.paymentMethod === 'cash' 
              ? (language === 'EN' ? 'Cash on Delivery' : 'الدفع عند الاستلام')
              : (language === 'EN' ? 'Credit Card' : 'بطاقة ائتمان')}
          </p>
          
          <h3 style={{ margin: '20px 0 15px 0', fontSize: '16px' }}>
            {language === 'EN' ? 'Items:' : 'المنتوجات:'}
          </h3>
          {order.items.map((item, idx) => (
            <div key={idx} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '8px 0',
              borderBottom: '1px solid #eee'
            }}>
              <span>{language === 'EN' ? item.name : (item.nameAr || item.name)} x{item.quantity}</span>
              <span>{item.price * item.quantity} MAD</span>
            </div>
          ))}
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '15px',
            paddingTop: '15px',
            borderTop: '2px solid #eee',
            fontWeight: 'bold',
            fontSize: '16px'
          }}>
            <span>{language === 'EN' ? 'Total' : 'المجموع'}</span>
            <span>{order.total} MAD</span>
          </div>
        </div>
        
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          textAlign: 'left',
          marginBottom: '30px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '15px', fontSize: '16px' }}>
            {language === 'EN' ? 'Shipping Address' : 'عنوان الشحن'}
          </h3>
          <p>{order.customer?.fullName}</p>
          <p>{order.customer?.address}</p>
          <p>{order.customer?.city}</p>
          <p>{order.customer?.phone}</p>
          <p>{order.customer?.email}</p>
        </div>
        
        <button
          onClick={() => navigate('/')}
          style={{
            backgroundColor: '#000',
            color: 'white',
            padding: '14px 30px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            letterSpacing: '1px'
          }}
          onMouseEnter={(e) => e.target.style.opacity = '0.8'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          {language === 'EN' ? 'CONTINUE SHOPPING' : 'مواصلة التسوق'}
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;