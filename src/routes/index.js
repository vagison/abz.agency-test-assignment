import express from 'express';

import testRouter from './test';

const indexRouter = express.Router();

indexRouter.use('/api/test', testRouter);

export default indexRouter;
