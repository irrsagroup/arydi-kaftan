import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const UserDashboard = ({ language }) => {
  const { cartItems, cartTotal, cartCount, clearCart } = useCart();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('arydi_orders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error('Error loading orders:', e);
      }
    }
  }, []);

  const saveOrder = () => {
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      items: [...cartItems],
      total: cartTotal,
      status: 'Pending'
    };
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem('arydi_orders', JSON.stringify(updatedOrders));
    clearCart();
    alert(language === 'EN' ? 'Order placed successfully!' : 'تم تقديم الطلب بنجاح!');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '100px 24px 60px 24px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{
          fontFamily: 'Playfair Display',
          fontSize: '36px',
          fontWeight: '400',
          marginBottom: '40px'
        }}>
          {language === 'EN' ? 'My Dashboard' : 'لوحة التحكم'}
        </h1>

        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          marginBottom: '40px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: '400', marginBottom: '20px' }}>
            {language === 'EN' ? 'Current Cart' : 'السلة الحالية'}
          </h2>
          {cartItems.length === 0 ? (
            <p style={{ color: '#999' }}>
              {language === 'EN' ? 'Your cart is empty' : 'سلتك فارغة'}
            </p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '15px 0',
                  borderBottom: '1px solid #eee'
                }}>
                  <span>{language === 'EN' ? item.name : (item.nameAr || item.name)} x{item.quantity}</span>
                  <span>{item.price * item.quantity} MAD</span>
                </div>
              ))}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '15px 0',
                fontWeight: 'bold',
                borderTop: '2px solid #eee',
                marginTop: '10px'
              }}>
                <span>{language === 'EN' ? 'Total' : 'المجموع'}</span>
                <span>{cartTotal} MAD</span>
              </div>
              <button
                onClick={saveOrder}
                style={{
                  marginTop: '20px',
                  backgroundColor: '#000',
                  color: 'white',
                  padding: '12px 24px',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                {language === 'EN' ? 'Place Order' : 'تأكيد الطلب'}
              </button>
            </>
          )}
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: '400', marginBottom: '20px' }}>
            {language === 'EN' ? 'Order History' : 'تاريخ الطلبات'}
          </h2>
          {orders.length === 0 ? (
            <p style={{ color: '#999' }}>
              {language === 'EN' ? 'No orders yet' : 'لا توجد طلبات بعد'}
            </p>
          ) : (
            orders.map((order) => (
              <div key={order.id} style={{
                marginBottom: '20px',
                padding: '20px',
                border: '1px solid #eee',
                borderRadius: '4px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '15px'
                }}>
                  <span style={{ fontWeight: 'bold' }}>
                    {language === 'EN' ? 'Order' : 'طلب'} #{order.id}
                  </span>
                  <span>{order.date}</span>
                  <span style={{ color: order.status === 'Pending' ? '#ff9800' : '#4caf50' }}>
                    {order.status}
                  </span>
                </div>
                {order.items.map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    fontSize: '14px',
                    color: '#666'
                  }}>
                    <span>{language === 'EN' ? item.name : (item.nameAr || item.name)} x{item.quantity}</span>
                    <span>{item.price * item.quantity} MAD</span>
                  </div>
                ))}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 0 0 0',
                  borderTop: '1px solid #eee',
                  marginTop: '10px',
                  fontWeight: 'bold'
                }}>
                  <span>{language === 'EN' ? 'Total' : 'المجموع'}</span>
                  <span>{order.total} MAD</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;