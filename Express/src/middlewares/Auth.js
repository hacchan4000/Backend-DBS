import dotenv from 'dotenv';
import response from '../utils/response.js';
import { TokenManager } from '../security/token-manager.js';

dotenv.config();

export const authMiddleware = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return response(
        res,
        401,
        'Token tidak ditemukan',
        null
      );
    }

    const token = header.replace(
      'Bearer ',
      ''
    );

    const user =
      await TokenManager.verifyToken(
        token,
        process.env.ACCESS_TOKEN_KEY
      );

    req.user = user;

    next();

  } catch (error) {
    return response(
      res,
      401,
      error.message,
      null
    );
  }
};