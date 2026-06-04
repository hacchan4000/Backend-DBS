import express from 'express';
import { ErrorHandler } from './middlewares/Error.js';
import router from './routes/index.js';

const app = express();

// body parser
app.use(express.json());

// static uploads
app.use('/uploads', express.static('src/uploads'));

// routes
app.use(router);

// error handler HARUS paling bawah
app.use(ErrorHandler);

export default app;