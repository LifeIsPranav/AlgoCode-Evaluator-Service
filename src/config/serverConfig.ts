import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 3000,
  REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
  REDIS_PORT: Number(process.env.REDIS_PORT) || 3000,
};

// export const PORT = process.env.PORT || 3000;
// export const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
// export const REDIS_PORT = process.env.REDIS_PORT || '6379';
