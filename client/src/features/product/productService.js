import api from '../../services/api';

// Get all products
const getProducts = async () => {
  try {
    console.log('📡 Appel API /products...');
    const response = await api.get('/products');
    console.log('✅ Réponse brute:', response);
    console.log('✅ response.data:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Erreur API:', error);
    throw error.response?.data || error.message;
  }
};

// Get product by ID
const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Create a new product
const createProduct = async (productData) => {
  try {
    const response = await api.post('/products', productData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update a product
const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete a product
const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const productService = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default productService;
