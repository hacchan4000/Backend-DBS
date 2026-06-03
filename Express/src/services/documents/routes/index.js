import express from 'express';

import { authMiddleware } from '../../../middlewares/Auth.js';
import { upload } from '../../../middlewares/Upload.js';
import { uploadError } from '../../../exceptions/uploadError.js';

import {
  uploadDocument,
  getDocumentById,
  deleteDocument,
  getAllDocument
} from '../controllers/doc-controller.js';

const router=express.Router();

router.post(
  '/',
  authMiddleware,
  upload.single('document'),
  uploadError,
  uploadDocument
);

router.get(
  '/',
  getAllDocument
);

router.get(
  '/:id',
  getDocumentById
);

router.delete(
  '/:id',
  authMiddleware,
  deleteDocument
);

export default router;