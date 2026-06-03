import express from 'express';

import { Validate } from '../../../middlewares/Validasi.js';
import { userSchema } from '../validator/schema.js';
import { registerController } from '../controllers/user-controller.js';


const router = express.Router();

// POST /users
router.post( '/', Validate(userSchema), registerController);

export default router;