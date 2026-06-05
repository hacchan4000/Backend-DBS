import express from 'express';
import { ErrorHandler } from './middlewares/Error.js';
import router from './routes/index.js';
import cors from 'cors';


const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://smart-finance-tawny.vercel.app', // ganti dengan domain Vercel kamu
  ],
  credentials: true,
}));
// body parser
app.use(express.json());

// static uploads
app.use('/uploads', express.static('src/uploads'));

// routes
app.use(router);

// error handler HARUS paling bawah
app.use(ErrorHandler);

export default app;