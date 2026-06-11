import express from 'express';

import { Validate } from '../../../middlewares/Validasi.js';

import { purchaseSchema } from '../validator/schema.js';
import { create, read, update, del } from '../controllers/purchase-controller.js';

const router = express.Router();

router.post(
  '/',
  Validate(purchaseSchema),
  create
);

router.get(
  '/',
  read
);
router.put(
  '/',
  Validate(purchaseSchema),
  update
);

router.delete(
  '/',
  del
);

export default router;