import express from 'express';
import userRoutes from '../services/users/routes/index.js';
import authRoutes from '../services/authentications/routes/index.js';
import documentRoutes from '../services/documents/routes/index.js';
import response from '../utils/response.js';

const router = express.Router();

router.get('/',(req,res)=>{
  return response(res, 200, 'API berhasil jalan', {success:true})
})
router.use('/users', userRoutes);
router.use('/authentications', authRoutes);
router.use('/documents', documentRoutes);




export default router