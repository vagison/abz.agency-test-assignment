import express from 'express';
import multer from 'multer';

import { userController } from '../controllers';
import { requestValidator, jwtMiddleware } from '../middlewares';
import { registrationValidatorSchema } from '../utils/schemas';
import { throwError } from '../middlewares/user/error';

const userRouter = express.Router();

const userForm = multer();

userRouter.post('/', jwtMiddleware, userForm.any(), requestValidator.validate(registrationValidatorSchema), throwError, userController.registration);

export default userRouter;
