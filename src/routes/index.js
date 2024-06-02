import express from 'express';

import testRouter from './test';
import userRouter from './user';
import tokenRouter from './token';

const indexRouter = express.Router();
const apiV1Prefix = '/api/v1';

indexRouter.use(`${apiV1Prefix}/test`, testRouter);
indexRouter.use(`${apiV1Prefix}/users`, userRouter);
indexRouter.use(`${apiV1Prefix}/token`, tokenRouter);

export default indexRouter;
