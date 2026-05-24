import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import Notification from './components/Notification';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import OurLegacy from './pages/OurLegacy';
import BookAppointment from './pages/BookAppointment';
import LallaMinaBehari from './pages/LallaMinaBehari';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import SearchModal from './components/SearchModal';
import ProfileModal from './components/ProfileModal';

function App() {
  const [language, setLanguage] = useState('EN');
  const [searchOpen, setSearchOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [dir, setDir] = useState('ltr');

  useEffect(() => {
    if (language === 'AR') {
      setDir('rtl');
      document.body.style.direction = 'rtl';
      document.body.style.textAlign = 'right';
    } else {
      setDir('ltr');
      document.body.style.direction = 'ltr';
      document.body.style.textAlign = 'left';
    }
  }, [language]);

  const showNotification = (message) => {
    setNotification({ show: true, message });
  };

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="app" dir={dir}>
          <TopBar language={language} setLanguage={setLanguage} />
          <Header 
            language={language} 
            setSearchOpen={setSearchOpen}
            setBagOpen={setBagOpen}
            setProfileOpen={setProfileOpen}
            setWishlistOpen={setWishlistOpen}
          />
          <Routes>
            <Route path="/" element={<Home language={language} showNotification={showNotification} />} />
            <Route path="/product/:id" element={<ProductDetail language={language} showNotification={showNotification} />} />
            <Route path="/our-legacy" element={<OurLegacy language={language} />} />
            <Route path="/book-appointment" element={<BookAppointment language={language} />} />
            <Route path="/lalla-mina-behari" element={<LallaMinaBehari language={language} />} />
            <Route path="/admin" element={<AdminDashboard language={language} />} />
            <Route path="/dashboard" element={<UserDashboard language={language} />} />
            <Route path="/checkout" element={<Checkout language={language} />} />
            <Route path="/order-confirmation" element={<OrderConfirmation language={language} />} />
          </Routes>
          <Footer language={language} />
          
          <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} language={language} />
          <CartDrawer isOpen={bagOpen} onClose={() => setBagOpen(false)} language={language} showNotification={showNotification} />
          <WishlistDrawer isOpen={wishlistOpen} onClose={() => setWishlistOpen(false)} language={language} showNotification={showNotification} />
          <ProfileModal isOpen={profileOpen} onClose={() => setProfileOpen(false)} language={language} />
          <Notification 
            show={notification.show} 
            message={notification.message} 
            onClose={() => setNotification({ show: false, message: '' })}
            language={language}
          />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;