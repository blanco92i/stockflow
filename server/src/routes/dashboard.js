import express from 'express';
const router = express.Router();
import {protect, adminProtect} from '../middleware/auth.js';
import { getDashboard } from '../controllers/dashboardController.js';

router.get('/', protect, getDashboard);

export default router;
