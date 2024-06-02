import express from 'express';

import { tokenController } from '../controllers';

const tokenRouter = express.Router();

tokenRouter.get('/', tokenController.getToken);

export default tokenRouter;
