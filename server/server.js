import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/auth.js';
import productRoutes from './src/routes/products.js';
import saleRoutes from './src/routes/sales.js';
import dashboardRoutes from './src/routes/dashboard.js';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // For parsing application/json
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'StockFlow API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
