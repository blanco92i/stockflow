import express from 'express';
const router = express.Router();
import {protect, adminProtect} from '../middleware/auth.js';
import { createSale, getSales } from '../controllers/saleController.js';

router.post('/', protect, createSale);
router.get('/', protect, getSales);
router.get('/admin', adminProtect, getSales);

export default router;
