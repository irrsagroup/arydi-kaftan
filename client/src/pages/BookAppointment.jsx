import React, { useState } from 'react';

const BookAppointment = ({ language }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newBooking = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: formData.date,
      time: formData.time,
      message: formData.message,
      status: 'Pending',
      createdAt: new Date().toLocaleDateString()
    };
    
    const savedBookings = localStorage.getItem('arydi_bookings');
    let bookings = [];
    if (savedBookings) {
      try {
        bookings = JSON.parse(savedBookings);
      } catch(e) {
        console.error('Error loading bookings:', e);
      }
    }
    bookings.unshift(newBooking);
    localStorage.setItem('arydi_bookings', JSON.stringify(bookings));
    
    alert(language === 'EN' ? 'Appointment booked successfully! We will contact you soon.' : 'تم حجز الموعد بنجاح! سوف نتصل بك قريباً.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      message: ''
    });
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'white',
      padding: '120px 24px 80px 24px'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ 
          fontFamily: 'Playfair Display', 
          fontSize: '48px',
          fontWeight: '400',
          letterSpacing: '2px',
          marginBottom: '20px',
          textAlign: 'center',
          color: '#000'
        }}>
          {language === 'EN' ? 'Book Your Appointment' : 'احجز موعدك'}
        </h1>
        <div style={{
          width: '60px',
          height: '2px',
          backgroundColor: '#000',
          margin: '0 auto 40px auto'
        }}></div>
        <p style={{
          textAlign: 'center',
          color: '#666',
          marginBottom: '40px',
          fontSize: '14px'
        }}>
          {language === 'EN' 
            ? 'Schedule a private consultation with our style experts'
            : 'حدد موعداً لاستشارة خاصة مع خبراء الأناقة لدينا'}
        </p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <input
            type="text"
            name="name"
            placeholder={language === 'EN' ? 'Full Name' : 'الاسم الكامل'}
            value={formData.name}
            onChange={handleChange}
            required
            style={{ 
              padding: '16px', 
              border: '1px solid #ddd', 
              fontSize: '16px',
              backgroundColor: '#fff',
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
              padding: '16px', 
              border: '1px solid #ddd', 
              fontSize: '16px',
              backgroundColor: '#fff',
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
              padding: '16px', 
              border: '1px solid #ddd', 
              fontSize: '16px',
              backgroundColor: '#fff',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = '#000'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              style={{ 
                padding: '16px', 
                border: '1px solid #ddd', 
                fontSize: '16px',
                backgroundColor: '#fff',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#000'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
            
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              style={{ 
                padding: '16px', 
                border: '1px solid #ddd', 
                fontSize: '16px',
                backgroundColor: '#fff',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#000'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>
          
          <textarea
            name="message"
            placeholder={language === 'EN' ? 'Additional Notes (optional)' : 'ملاحظات إضافية (اختياري)'}
            value={formData.message}
            onChange={handleChange}
            rows="4"
            style={{ 
              padding: '16px', 
              border: '1px solid #ddd', 
              fontSize: '16px',
              backgroundColor: '#fff',
              outline: 'none',
              fontFamily: 'Inter, sans-serif'
            }}
            onFocus={(e) => e.target.style.borderColor = '#000'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
          
          <button
            type="submit"
            style={{
              backgroundColor: '#000',
              color: 'white',
              padding: '16px',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'opacity 0.3s',
              letterSpacing: '1px'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.8'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            {language === 'EN' ? 'CONFIRM APPOINTMENT' : 'تأكيد الموعد'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;