import express from 'express';

import { testController } from '../controllers';

const testRouter = express.Router();

testRouter.post('/temp', testController.temp);

export default testRouter;
