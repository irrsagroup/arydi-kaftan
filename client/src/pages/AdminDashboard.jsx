import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = ({ language }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    nameAr: '',
    category: 'Kimono',
    price: '',
    bio: '',
    bioAr: '',
    images: []
  });
  const [settings, setSettings] = useState({
    siteName: 'ARYDI KAFTAN',
    siteEmail: 'info@arydikaftan.com',
    sitePhone: '+212 6XX XXX XXX',
    shippingFee: '50'
  });

  const categories = ['Kimono', 'Kaftan', 'One piece Kaftan', 'Two piece Kaftan', 'Djelaba', 'Jewelry'];

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchBookings();
    loadSettings();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const savedOrders = localStorage.getItem('arydi_orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const savedBookings = localStorage.getItem('arydi_bookings');
      if (savedBookings) {
        setBookings(JSON.parse(savedBookings));
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const loadSettings = () => {
    const savedSettings = localStorage.getItem('arydi_settings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error('Error loading settings:', e);
      }
    }
  };

  const saveSettings = () => {
    localStorage.setItem('arydi_settings', JSON.stringify(settings));
    alert(language === 'EN' ? 'Settings saved!' : 'تم حفظ الإعدادات!');
  };

  const handleSettingChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('arydi_orders', JSON.stringify(updatedOrders));
  };

  const updateBookingStatus = (bookingId, newStatus) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('arydi_bookings', JSON.stringify(updatedBookings));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const totalImages = formData.images.length + files.length;
    
    if (totalImages > 8) {
      alert(language === 'EN' ? 'Maximum 8 images allowed' : 'الحد الأقصى 8 صور');
      return;
    }

    setUploading(true);
    const formDataUpload = new FormData();
    files.forEach(file => formDataUpload.append('images', file));

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formDataUpload);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...response.data.images]
      }));
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Error uploading images');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/products', formData);
      }
      fetchProducts();
      setShowForm(false);
      setEditingProduct(null);
      setFormData({
        name: '',
        nameAr: '',
        category: 'Kimono',
        price: '',
        bio: '',
        bioAr: '',
        images: []
      });
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      nameAr: product.nameAr || '',
      category: product.category,
      price: product.price,
      bio: product.bio || '',
      bioAr: product.bioAr || '',
      images: product.images || []
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm(language === 'EN' ? 'Delete this product?' : 'هل تريد حذف هذا المنتج؟')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product');
      }
    }
  };

  const tabs = [
    { id: 'dashboard', name: language === 'EN' ? 'Dashboard' : 'لوحة التحكم', icon: '📊' },
    { id: 'add', name: language === 'EN' ? 'Add Product' : 'إضافة منتج', icon: '➕' },
    { id: 'products', name: language === 'EN' ? 'Manage Products' : 'إدارة المنتجات', icon: '📦' },
    { id: 'bookings', name: language === 'EN' ? 'Manage Bookings' : 'إدارة المواعيد', icon: '📅' },
    { id: 'settings', name: language === 'EN' ? 'Owner Settings' : 'إعدادات المالك', icon: '⚙️' }
  ];

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>;

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
          marginBottom: '30px'
        }}>
          {language === 'EN' ? 'Admin Dashboard' : 'لوحة تحكم الإدمن'}
        </h1>

        <div style={{
          display: 'flex',
          gap: '5px',
          backgroundColor: 'white',
          padding: '10px',
          marginBottom: '30px',
          flexWrap: 'wrap',
          borderBottom: '2px solid #eee'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 24px',
                backgroundColor: activeTab === tab.id ? '#000' : 'transparent',
                color: activeTab === tab.id ? 'white' : '#333',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'all 0.3s',
                borderRadius: '4px'
              }}
            >
              <span style={{ marginRight: '8px' }}>{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {activeTab === 'dashboard' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            <div style={{ backgroundColor: 'white', padding: '25px', textAlign: 'center', borderRadius: '8px' }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>📦</div>
              <h3>{products.length}</h3>
              <p>{language === 'EN' ? 'Total Products' : 'إجمالي المنتجات'}</p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '25px', textAlign: 'center', borderRadius: '8px' }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>🛒</div>
              <h3>{orders.length}</h3>
              <p>{language === 'EN' ? 'Total Orders' : 'إجمالي الطلبات'}</p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '25px', textAlign: 'center', borderRadius: '8px' }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>📅</div>
              <h3>{bookings.length}</h3>
              <p>{language === 'EN' ? 'Total Bookings' : 'إجمالي المواعيد'}</p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '25px', textAlign: 'center', borderRadius: '8px' }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>💰</div>
              <h3>{orders.reduce((sum, o) => sum + (o.total || 0), 0)} MAD</h3>
              <p>{language === 'EN' ? 'Total Revenue' : 'إجمالي الإيرادات'}</p>
            </div>
          </div>
        )}

        {activeTab === 'add' && (
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px' }}>
            <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '400' }}>
              {language === 'EN' ? 'Add New Product' : 'إضافة منتج جديد'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name (EN)"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{ padding: '12px', border: '1px solid #ddd', fontSize: '14px' }}
                />
                <input
                  type="text"
                  name="nameAr"
                  placeholder="اسم المنتج (AR)"
                  value={formData.nameAr}
                  onChange={handleChange}
                  style={{ padding: '12px', border: '1px solid #ddd', fontSize: '14px' }}
                />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  style={{ padding: '12px', border: '1px solid #ddd', fontSize: '14px' }}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <input
                  type="number"
                  name="price"
                  placeholder="Price (MAD)"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  style={{ padding: '12px', border: '1px solid #ddd', fontSize: '14px' }}
                />
                <textarea
                  name="bio"
                  placeholder="Description (EN)"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="3"
                  style={{ padding: '12px', border: '1px solid #ddd', fontSize: '14px', fontFamily: 'Inter' }}
                />
                <textarea
                  name="bioAr"
                  placeholder="الوصف (AR)"
                  value={formData.bioAr}
                  onChange={handleChange}
                  rows="3"
                  style={{ padding: '12px', border: '1px solid #ddd', fontSize: '14px', fontFamily: 'Inter' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500' }}>
                  {language === 'EN' ? 'Product Images' : 'صور المنتج'} ({formData.images.length}/8)
                </label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {formData.images.map((img, idx) => (
                    <div key={idx} style={{ position: 'relative' }}>
                      <img src={`http://localhost:5000${img}`} alt="" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                      <button type="button" onClick={() => removeImage(idx)} style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#ff4444', color: 'white', border: 'none', borderRadius: '50%', cursor: 'pointer', width: '22px', height: '22px' }}>X</button>
                    </div>
                  ))}
                  {formData.images.length < 8 && (
                    <label style={{ width: '80px', height: '80px', border: '2px dashed #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: '4px' }}>
                      <input type="file" accept="image/jpeg,image/png,image/svg+xml,image/webp" onChange={handleImageUpload} multiple style={{ display: 'none' }} />
                      <span style={{ fontSize: '30px', color: '#999' }}>+</span>
                    </label>
                  )}
                </div>
                {uploading && <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>Uploading...</p>}
              </div>

              <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
                <button type="submit" style={{ backgroundColor: '#000', color: 'white', padding: '12px 24px', border: 'none', cursor: 'pointer', fontSize: '14px' }}>
                  {language === 'EN' ? 'Save Product' : 'حفظ المنتج'}
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'products' && (
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', overflowX: 'auto' }}>
            <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '400' }}>{language === 'EN' ? 'All Products' : 'جميع المنتجات'}</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>{language === 'EN' ? 'Image' : 'صورة'}</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>{language === 'EN' ? 'Name' : 'الاسم'}</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>{language === 'EN' ? 'Category' : 'الفئة'}</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>{language === 'EN' ? 'Price' : 'السعر'}</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>{language === 'EN' ? 'Images' : 'الصور'}</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>{language === 'EN' ? 'Actions' : 'الإجراءات'}</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product._id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px' }}>
                      {product.images && product.images[0] ? (
                        <img src={`http://localhost:5000${product.images[0]}`} alt="" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                      ) : (
                        <div style={{ width: '50px', height: '50px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#999' }}>No img</div>
                      )}
                    </td>
                    <td style={{ padding: '12px' }}>{product.name}</td>
                    <td style={{ padding: '12px' }}>{product.category}</td>
                    <td style={{ padding: '12px' }}>{product.price} MAD</td>
                    <td style={{ padding: '12px' }}>{product.images?.length || 0} / 8</td>
                    <td style={{ padding: '12px' }}>
                      <button onClick={() => handleEdit(product)} style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#000', color: 'white', border: 'none', cursor: 'pointer', fontSize: '12px' }}>Edit</button>
                      <button onClick={() => handleDelete(product._id)} style={{ padding: '5px 10px', backgroundColor: '#ccc', border: 'none', cursor: 'pointer', fontSize: '12px' }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', overflowX: 'auto' }}>
            <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '400' }}>{language === 'EN' ? 'Appointment Bookings' : 'مواعيد الحجز'}</h2>
            {bookings.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#999', padding: '40px' }}>{language === 'EN' ? 'No bookings yet' : 'لا توجد مواعيد بعد'}</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <th style={{ padding: '12px', textAlign: 'left' }}>{language === 'EN' ? 'Name' : 'الاسم'}</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>{language === 'EN' ? 'Phone' : 'الهاتف'}</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>{language === 'EN' ? 'Date' : 'التاريخ'}</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>{language === 'EN' ? 'Message' : 'الرسالة'}</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>{language === 'EN' ? 'Status' : 'الحالة'}</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>{language === 'EN' ? 'Actions' : 'الإجراءات'}</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(booking => (
                    <tr key={booking.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '12px' }}>{booking.name}</td>
                      <td style={{ padding: '12px' }}>{booking.email}</td>
                      <td style={{ padding: '12px' }}>{booking.phone}</td>
                      <td style={{ padding: '12px' }}>{booking.date} {booking.time}</td>
                      <td style={{ padding: '12px' }}>{booking.message?.substring(0, 30)}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          backgroundColor: booking.status === 'Confirmed' ? '#e8f5e9' : (booking.status === 'Cancelled' ? '#ffebee' : '#fff3e0'),
                          color: booking.status === 'Confirmed' ? '#4caf50' : (booking.status === 'Cancelled' ? '#ff4444' : '#ff9800')
                        }}>
                          {booking.status || 'Pending'}
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <button onClick={() => updateBookingStatus(booking.id, 'Confirmed')} style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: '#4caf50', color: 'white', border: 'none', cursor: 'pointer', fontSize: '11px' }}>Confirm</button>
                        <button onClick={() => updateBookingStatus(booking.id, 'Cancelled')} style={{ padding: '5px 10px', backgroundColor: '#ff4444', color: 'white', border: 'none', cursor: 'pointer', fontSize: '11px' }}>Cancel</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px' }}>
            <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '400' }}>{language === 'EN' ? 'Owner Settings' : 'إعدادات المالك'}</h2>
            <div style={{ display: 'grid', gap: '20px', maxWidth: '500px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>{language === 'EN' ? 'Site Name' : 'اسم الموقع'}</label>
                <input type="text" name="siteName" value={settings.siteName} onChange={handleSettingChange} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', fontSize: '14px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Site Email</label>
                <input type="email" name="siteEmail" value={settings.siteEmail} onChange={handleSettingChange} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', fontSize: '14px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>{language === 'EN' ? 'Site Phone' : 'هاتف الموقع'}</label>
                <input type="text" name="sitePhone" value={settings.sitePhone} onChange={handleSettingChange} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', fontSize: '14px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>{language === 'EN' ? 'Shipping Fee (MAD)' : 'رسوم الشحن (MAD)'}</label>
                <input type="text" name="shippingFee" value={settings.shippingFee} onChange={handleSettingChange} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', fontSize: '14px' }} />
              </div>
              <button onClick={saveSettings} style={{ backgroundColor: '#000', color: 'white', padding: '14px 24px', border: 'none', cursor: 'pointer', fontSize: '14px', marginTop: '10px' }}>
                {language === 'EN' ? 'Save Settings' : 'حفظ الإعدادات'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;