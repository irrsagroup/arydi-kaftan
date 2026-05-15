import React, { useState } from 'react';

const ProfileModal = ({ isOpen, onClose, language }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(language === 'EN' ? 'Coming soon!' : 'قريباً!');
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.8)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }} onClick={onClose}>
      <div style={{
        backgroundColor: 'white',
        width: '90%',
        maxWidth: '450px',
        padding: '40px'
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '400' }}>
            {language === 'EN' ? (isLogin ? 'Sign In' : 'Sign Up') : (isLogin ? 'تسجيل الدخول' : 'إنشاء حساب')}
          </h2>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}
          >
            X
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder={language === 'EN' ? 'Full Name' : 'الاسم الكامل'}
              value={formData.name}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '14px',
                marginBottom: '16px',
                border: '1px solid #ddd',
                fontSize: '14px'
              }}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '14px',
              marginBottom: '16px',
              border: '1px solid #ddd',
              fontSize: '14px'
            }}
          />
          <input
            type="password"
            name="password"
            placeholder={language === 'EN' ? 'Password' : 'كلمة المرور'}
            value={formData.password}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '14px',
              marginBottom: '24px',
              border: '1px solid #ddd',
              fontSize: '14px'
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#000',
              color: 'white',
              padding: '14px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              letterSpacing: '1px',
              marginBottom: '16px'
            }}
          >
            {language === 'EN' ? (isLogin ? 'SIGN IN' : 'SIGN UP') : (isLogin ? 'تسجيل الدخول' : 'إنشاء حساب')}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', fontSize: '14px', color: '#666' }}>
          {language === 'EN' ? (isLogin ? "Don't have an account? " : "Already have an account? ") : (isLogin ? "ليس لديك حساب؟ " : "لديك حساب بالفعل؟ ")}
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{
              background: 'none',
              border: 'none',
              color: '#000',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: '14px'
            }}
          >
            {language === 'EN' ? (isLogin ? 'Sign Up' : 'Sign In') : (isLogin ? 'إنشاء حساب' : 'تسجيل الدخول')}
          </button>
        </p>
      </div>
    </div>
  );
};

export default ProfileModal;