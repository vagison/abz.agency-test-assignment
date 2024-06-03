import path from 'path';
import express from 'express';
import multer from 'multer';

import { userController } from '../controllers';
import { requestValidator, jwtMiddleware } from '../middlewares';
import { throwRegistrationValidationError } from '../middlewares/user/create';
import { throwGetUsersValidationError } from '../middlewares/user/get';
import { registrationValidatorSchema, getUsersValidatorSchema } from '../utils/schemas';

const userRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(
      __dirname,
      '..',
      '..',
      'storage',
    ));
  },
  filename: (req, file, cb) => {
    const tmp = `tmp_${Date.now()}`;
    req.tmp = tmp;
    cb(null, `${tmp}_${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

userRouter.post('/', jwtMiddleware.jwt, upload.single('photo'), requestValidator.validate(registrationValidatorSchema), throwRegistrationValidationError, userController.registration);
userRouter.get('/', requestValidator.validate(getUsersValidatorSchema), throwGetUsersValidationError, userController.getUsers);
userRouter.get('/:id', userController.getUserById);

export default userRouter;
