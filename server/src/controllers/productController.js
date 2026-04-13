import Product from '../models/Product.js';

// Create product
export const createProduct = async (req, res) => {
  try {
    const { name, purchasePrice, sellingPrice, stock } = req.body;
    const userId = req.user.id;

    // Validation
    if (!name || purchasePrice === undefined || sellingPrice === undefined || stock === undefined) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    const product = new Product({
      name,
      purchasePrice,
      sellingPrice,
      stock,
      userId,
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products (globally available)
const getProducts = async (req, res) => {
  try {
    // Retourner TOUS les produits, pas juste ceux de l'utilisateur
    const products = await Product.find().sort({ createdAt: -1 });
    console.log('📦 Produits trouvés:', products.length);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, purchasePrice, sellingPrice, stock } = req.body;
    const userId = req.user.id;

    let product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check ownership
    if (!product.userId.equals(userId)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    product = await Product.findByIdAndUpdate(
      id,
      { name, purchasePrice, sellingPrice, stock },
      { new: true, runValidators: true }
    );

    res.json({ message: 'Product updated successfully', product });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check ownership
    if (!product.userId.equals(userId)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getProducts, updateProduct, deleteProduct };
