import express from 'express';
import userRoutes from '../services/users/routes/index.js';
import authRoutes from '../services/authentications/routes/index.js';
import documentRoutes from '../services/documents/routes/index.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/authentications', authRoutes);
router.use('/documents', documentRoutes);
router.use('/predict')


export default router