import express from 'express';

import { Validate } from '../../../middlewares/Validasi.js';
import { authSchema, refreshSchema } from '../validator/schema.js';
import { login,refresh,logout } from '../controllers/auth-controller.js'

const router = express.Router();

router.post(
  '/',
  Validate(authSchema),
  login
);

router.put(
  '/',
  Validate(refreshSchema),
  refresh
);

router.delete(
  '/',
  Validate(refreshSchema),
  logout
);

export default router;