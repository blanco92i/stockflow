import express from 'express';
const router = express.Router();
import {protect, adminProtect} from '../middleware/auth.js';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../controllers/productController.js';

router.post('/', protect, createProduct);
router.get('/', protect, getProducts);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

export default router;
