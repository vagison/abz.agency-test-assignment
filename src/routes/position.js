import express from 'express';

import { positionController } from '../controllers';

const positionRouter = express.Router();

positionRouter.get('/', positionController.getPositions);

export default positionRouter;
