import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Header = ({ language, setSearchOpen, setBagOpen, setProfileOpen, setWishlistOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = {
    EN: ['Moroccan KAFTAN', 'our legacy', 'Book Your Appointment', 'Lalla Mina Behari'],
    AR: ['القفطان المغربي', 'إرثنا', 'احجز موعدك', 'لالة مينة بهاري']
  };

  const links = ['/', '/our-legacy', '/book-appointment', '/lalla-mina-behari'];

  return (
    <>
      <header style={{
        position: 'sticky',
        top: 0,
        backgroundColor: isScrolled ? 'rgba(255,255,255,0.95)' : 'white',
        color: 'black',
        padding: '12px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: isScrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
        transition: 'all 0.3s ease',
        zIndex: 1000,
        borderBottom: '1px solid #eee',
        flexWrap: 'wrap'
      }}>
        <div style={{ 
          fontWeight: 'bold', 
          fontSize: 'clamp(16px, 5vw, 20px)', 
          letterSpacing: '1px' 
        }}>
          ARYDI KAFTAN
        </div>

        {/* Desktop Navigation */}
        <nav style={{
          display: 'flex',
          gap: 'clamp(15px, 4vw, 32px)',
          display: window.innerWidth < 768 ? 'none' : 'flex'
        }}>
          {navItems[language].map((item, index) => (
            <Link
              key={index}
              to={links[index]}
              style={{
                textDecoration: 'none',
                color: 'black',
                fontSize: 'clamp(11px, 3vw, 14px)',
                fontWeight: index === 0 ? '600' : '400',
                letterSpacing: '0.5px',
                whiteSpace: 'nowrap'
              }}
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Desktop Icons */}
        <div style={{
          display: 'flex',
          gap: 'clamp(12px, 4vw, 20px)',
          display: window.innerWidth < 768 ? 'none' : 'flex',
          alignItems: 'center'
        }}>
          <span style={{ cursor: 'pointer', fontSize: '13px' }} onClick={() => setProfileOpen(true)}>PROFILE</span>
          
          {/* Wishlist Icon */}
          <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setWishlistOpen(true)}>
            <span style={{ fontSize: '16px' }}>♥</span>
            {wishlistCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-12px',
                backgroundColor: '#000',
                color: 'white',
                fontSize: '10px',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {wishlistCount}
              </span>
            )}
          </div>
          
          {/* Cart Icon */}
          <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setBagOpen(true)}>
            <span style={{ fontSize: '13px' }}>BAG</span>
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-12px',
                backgroundColor: '#000',
                color: 'white',
                fontSize: '10px',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cartCount}
              </span>
            )}
          </div>
          
          <span style={{ cursor: 'pointer', fontSize: '13px' }} onClick={() => setSearchOpen(true)}>SEARCH</span>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            display: window.innerWidth < 768 ? 'block' : 'none'
          }}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '60px',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          zIndex: 999,
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}>
          {navItems[language].map((item, index) => (
            <Link
              key={index}
              to={links[index]}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                textDecoration: 'none',
                color: 'black',
                fontSize: '16px',
                fontWeight: index === 0 ? '600' : '400',
                padding: '10px 0',
                borderBottom: '1px solid #eee'
              }}
            >
              {item}
            </Link>
          ))}
          <div style={{
            display: 'flex',
            gap: '25px',
            paddingTop: '15px',
            justifyContent: 'center'
          }}>
            <span style={{ cursor: 'pointer' }} onClick={() => { setProfileOpen(true); setIsMobileMenuOpen(false); }}>PROFILE</span>
            <span style={{ cursor: 'pointer' }} onClick={() => { setWishlistOpen(true); setIsMobileMenuOpen(false); }}>♥</span>
            <span style={{ cursor: 'pointer' }} onClick={() => { setBagOpen(true); setIsMobileMenuOpen(false); }}>BAG</span>
            <span style={{ cursor: 'pointer' }} onClick={() => { setSearchOpen(true); setIsMobileMenuOpen(false); }}>SEARCH</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;