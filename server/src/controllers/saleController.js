import Product from '../models/Product.js';
import Sale from '../models/Sale.js';

// Create sale
export const createSale = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const {_id: userId} = req.user;

    // Validation
    if (!productId || !quantity) {
      return res.status(400).json({ message: 'Please provide product and quantity' });
    }

    // Find product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check ownership
    if (!product.userId.equals(userId)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    // Calculate totals
    const totalPrice = product.sellingPrice * quantity;
    const profit = (product.sellingPrice - product.purchasePrice) * quantity;

    // Create sale
    const sale = new Sale({
      productId,
      quantity,
      totalPrice,
      profit,
      userId,
    });

    await sale.save();

    // Reduce stock
    product.stock -= quantity;
    await product.save();

    res.status(201).json({ message: 'Sale created successfully', sale });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get sales
export const getSales = async (req, res) => {
  try {
    const userId = req.user.id;
    const sales = await Sale.find({ userId })
      .populate('productId', 'name sellingPrice purchasePrice')
      .sort({ createdAt: -1 });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
