import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
const MONGO_URI = 'mongodb+srv://kaftan:kaftanKAFTANlallaMINA@cluster0.jrllmao.mongodb.net/arydi_kaftan?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB error:', err.message));

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameAr: { type: String },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  bio: { type: String },
  bioAr: { type: String },
  images: [{ type: String }],
  featured: { type: Boolean, default: false }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|svg|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed (jpeg, jpg, png, svg, webp)'));
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// ============ API ROUTES ============

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'ARYDI KAFTAN API is working!' });
});

// Upload images
app.post('/api/upload', upload.array('images', 8), (req, res) => {
  try {
    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
    res.json({ images: imageUrls });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get products by category
app.get('/api/products/category/:category', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single product by ID
app.get('/api/products/id/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create product
app.post('/api/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product
app.put('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Seed products
app.get('/api/seed', async (req, res) => {
  try {
    const count = await Product.countDocuments();
    if (count > 0) {
      return res.json({ message: `Database already has ${count} products` });
    }
    
    const sampleProducts = [
      { name: 'Kimono Silk Gold', nameAr: 'كيمونو حرير ذهبي', category: 'Kimono', price: 1200, bio: 'Luxurious silk kimono with gold embroidery', bioAr: 'كيمونو حريري فاخر بتطريز ذهبي', images: [] },
      { name: 'Kimono Velvet Red', nameAr: 'كيمونو مخمل أحمر', category: 'Kimono', price: 1350, bio: 'Velvet kimono in deep red', bioAr: 'كيمونو مخملي أحمر داكن', images: [] },
      { name: 'Kaftan Golden', nameAr: 'قفطان ذهبي', category: 'Kaftan', price: 2500, bio: 'Luxury kaftan with gold threads', bioAr: 'قفطان فاخر بخيوط ذهبية', images: [] },
      { name: 'Kaftan Emerald', nameAr: 'قفطان زمردي', category: 'Kaftan', price: 2800, bio: 'Emerald green kaftan', bioAr: 'قفطان أخضر زمردي', images: [] },
      { name: 'One Piece Classic', nameAr: 'قفطان قطعة واحدة كلاسيك', category: 'One piece Kaftan', price: 1800, bio: 'Classic one piece kaftan', bioAr: 'قفطان كلاسيك قطعة واحدة', images: [] },
      { name: 'Two Piece Set Gold', nameAr: 'طقم قطعتين ذهبي', category: 'Two piece Kaftan', price: 3200, bio: 'Two piece gold set', bioAr: 'طقم ذهبي قطعتين', images: [] },
      { name: 'Djelaba Wool', nameAr: 'جلابة صوف', category: 'Djelaba', price: 1500, bio: 'Warm wool djelaba', bioAr: 'جلابة صوف دافئة', images: [] },
      { name: 'Amber Set', nameAr: 'طقم كهرمان', category: 'Jewelry', price: 800, bio: 'Traditional amber jewelry set', bioAr: 'طقم مجوهرات كهرمان تقليدي', images: [] }
    ];
    
    await Product.insertMany(sampleProducts);
    res.json({ message: `Added ${sampleProducts.length} products successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});