import express from 'express';
import routes from './routes/index.js';
import { ErrorHandler } from './middlewares/Error.js';

const app = express();

// body parser
app.use(express.json());

// static upload kalau nanti ada PDF
app.use('/uploads', express.static('src/uploads'));

// error handler (harus paling bawah)
app.use(ErrorHandler);

export default app;