import React, { useState, useEffect } from 'react';

const TopBar = ({ language, setLanguage }) => {
  const [currentText, setCurrentText] = useState(0);
  const texts = {
    EN: ['WORLDWIDE SHOPPING', 'PROUDLY MOROCCAN, TRULY INTERNATIONAL'],
    AR: ['تسوق عالمي', 'مغربي بفخر، عالمي حقيقية']
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts[language].length);
    }, 5000);
    return () => clearInterval(interval);
  }, [language]);

  return (
    <div style={{
      backgroundColor: '#1a1a1a',
      color: 'white',
      padding: '8px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '12px',
      fontFamily: 'Inter, sans-serif',
      position: 'relative',
      zIndex: 1001
    }}>
      <div style={{ display: 'flex', gap: '16px' }}>
        <a href="#" style={{ color: 'white', textDecoration: 'none' }}>IG</a>
        <a href="#" style={{ color: 'white', textDecoration: 'none' }}>TT</a>
        <a href="#" style={{ color: 'white', textDecoration: 'none' }}>IN</a>
        <a href="#" style={{ color: 'white', textDecoration: 'none' }}>WA</a>
      </div>

      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        width: 'auto'
      }}>
        <span style={{
          animation: 'marquee 10s linear infinite',
          display: 'inline-block'
        }}>
          {texts[language][currentText]}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <button 
          onClick={() => setLanguage(language === 'EN' ? 'AR' : 'EN')}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          {language === 'EN' ? 'EN / AR' : 'AR / EN'}
        </button>
        <span style={{ cursor: 'pointer' }}>CART</span>
        <span style={{ cursor: 'pointer' }}>SEARCH</span>
      </div>
    </div>
  );
};

export default TopBar;