import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('EN');
  const [dir, setDir] = useState('ltr');

  useEffect(() => {
    setDir(language === 'AR' ? 'rtl' : 'ltr');
    document.body.style.direction = dir;
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};