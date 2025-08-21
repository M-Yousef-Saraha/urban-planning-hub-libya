import dotenv from 'dotenv';

dotenv.config();

function required(name: string, fallback?: string) {
  const val = process.env[name] ?? fallback;
  if (!val) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return val;
}

export const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3001', 10),
  DATABASE_URL: required('DATABASE_URL'),
  JWT_SECRET: required('JWT_SECRET'),
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || '',
  FROM_EMAIL: process.env.FROM_EMAIL || 'noreply@urbanplanninghub.ly',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || '',
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10),
};

export default config;
