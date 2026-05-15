import React from 'react';

const LallaMinaBehari = ({ language }) => {
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
          Lalla Mina Behari
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
            ? 'A tribute to the timeless elegance of Lalla Mina Behari. Her legacy inspires every collection at ARYDI KAFTAN.'
            : 'تحية للأناقة الخالدة للالة مينة بهاري. إرثها يلهم كل مجموعة في قفطان أريدي.'}
        </p>
        <p style={{ 
          fontSize: '16px', 
          lineHeight: '1.8',
          color: '#666'
        }}>
          {language === 'EN' 
            ? 'Lalla Mina Behari represents the epitome of Moroccan grace and sophistication. Her influence on traditional fashion continues to inspire our designs, blending heritage with contemporary elegance.'
            : 'تمثل لالة مينة بهاري مثالاً للرقة والرقي المغربي. يستمر تأثيرها على الأزياء التقليدية في إلهام تصاميمنا، حيث تمزج بين التراث والأناقة العصرية.'}
        </p>
      </div>
    </div>
  );
};

export default LallaMinaBehari;