import dotenv from 'dotenv';

dotenv.config();

const corsConfig = {
  origin: [
    process.env.CORS_ORIGIN,
    'http://localhost:3000',
  ],
  credentials: true,
};

const dbConfig = {
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
};

const jwtConfig = {
  secret: process.env.JWT_SECRET || 'cats and mouse',
  expiresIn: +process.env.JWT_EXPIRES_IN || 2400,
};

export {
  corsConfig, dbConfig, jwtConfig,
};
