import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ language }) => {
  return (
    <footer style={{
      backgroundColor: 'white',
      borderTop: '1px solid #eaeaea',
      padding: '60px 40px 40px 40px',
      marginTop: '60px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '40px'
      }}>
        <div>
          <h3 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '20px',
            fontWeight: '500',
            letterSpacing: '2px',
            marginBottom: '20px',
            color: '#000'
          }}>
            ARYDI KAFTAN
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#666',
            lineHeight: '1.6'
          }}>
            {language === 'EN' 
              ? 'Luxury Moroccan kaftans crafted with tradition and elegance.'
              : 'قفطان مغربي فاخر مصنوع بالتقاليد والأناقة.'}
          </p>
        </div>

        <div>
          <h4 style={{
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '20px',
            color: '#000'
          }}>
            {language === 'EN' ? 'Quick Links' : 'روابط سريعة'}
          </h4>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>
                {language === 'EN' ? 'Moroccan KAFTAN' : 'القفطان المغربي'}
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/our-legacy" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>
                {language === 'EN' ? 'Our Legacy' : 'إرثنا'}
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/book-appointment" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>
                {language === 'EN' ? 'Book Appointment' : 'احجز موعداً'}
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/lalla-mina-behari" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>
                Lalla Mina Behari
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 style={{
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '20px',
            color: '#000'
          }}>
            {language === 'EN' ? 'Contact' : 'اتصل بنا'}
          </h4>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Email: info@arydikaftan.com</p>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Phone: +212 6XX XXX XXX</p>
        </div>

        <div>
          <h4 style={{
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '20px',
            color: '#000'
          }}>
            {language === 'EN' ? 'Follow Us' : 'تابعونا'}
          </h4>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#" style={{ color: '#000', textDecoration: 'none', fontSize: '14px' }}>Instagram</a>
            <a href="#" style={{ color: '#000', textDecoration: 'none', fontSize: '14px' }}>TikTok</a>
            <a href="#" style={{ color: '#000', textDecoration: 'none', fontSize: '14px' }}>LinkedIn</a>
            <a href="#" style={{ color: '#000', textDecoration: 'none', fontSize: '14px' }}>WhatsApp</a>
          </div>
        </div>
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: '60px',
        paddingTop: '30px',
        borderTop: '1px solid #eaeaea',
        fontSize: '12px',
        color: '#999'
      }}>
        (c) 2024 ARYDI KAFTAN. {language === 'EN' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
      </div>
    </footer>
  );
};

export default Footer;