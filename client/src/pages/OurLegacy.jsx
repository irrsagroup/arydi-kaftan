import React from 'react';

const OurLegacy = ({ language }) => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'white',
      padding: '120px 24px 80px 24px'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ 
          fontFamily: 'Playfair Display', 
          fontSize: '64px',
          fontWeight: '400',
          letterSpacing: '2px',
          marginBottom: '40px',
          color: '#000'
        }}>
          {language === 'EN' ? 'Our Legacy' : 'إرثنا'}
        </h1>
        <div style={{
          width: '60px',
          height: '2px',
          backgroundColor: '#000',
          margin: '0 auto 40px auto'
        }}></div>
        <p style={{ 
          fontSize: '18px', 
          lineHeight: '1.8',
          color: '#333',
          marginBottom: '30px'
        }}>
          {language === 'EN' 
            ? 'ARYDI KAFTAN represents generations of Moroccan craftsmanship. Each piece tells a story of tradition, elegance, and modern luxury.'
            : 'قفطان أريدي يمثل أجيالاً من الحرفية المغربية. كل قطعة تحكي قصة من التقاليد والأناقة والفخامة العصرية.'}
        </p>
        <p style={{ 
          fontSize: '16px', 
          lineHeight: '1.8',
          color: '#666'
        }}>
          {language === 'EN' 
            ? 'Founded with a passion for preserving the art of Moroccan kaftan making, we blend centuries-old techniques with contemporary design. Every garment is handcrafted by master artisans who have inherited their skills through generations.'
            : 'تأسست بشغف للحفاظ على فن صناعة القفطان المغربي، نمزج تقنيات عمرها قرون مع التصميم المعاصر. كل قطعة مصنوعة يدوياً على يد حرفيين مهرة ورثوا مهاراتهم عبر الأجيال.'}
        </p>
      </div>
    </div>
  );
};

export default OurLegacy;