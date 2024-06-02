const corsConfig = {
  origin: [
    process.env.CORS_ORIGIN,
    'http://localhost:3000',
  ],
  credentials: true,
};

export {
  corsConfig,
};
