import fs from 'fs/promises';
import createHttpError from 'http-errors';
import { errorMessagesConstants } from '../../constants';

function throwRegistrationValidationError(req, res, next) {
  if (!req.fails.isEmpty()) {
    // If the photo was uploaded then removing the file
    if (req.file) {
      fs.rm(req.file.path);
    }

    const fails = req.fails.errors;
    let err;

    for (let index = 0; index < fails.length; index++) {
      const fail = fails[index];

      if (fail.msg === errorMessagesConstants.User.AlreadyExists) {
        return next(createHttpError.Conflict(errorMessagesConstants.User.AlreadyExists));
      }

      err = createHttpError.UnprocessableEntity(errorMessagesConstants.User.ValidationError);
      err.fails = fails.reduce((acc, item) => {
        if (!acc[item.path]) {
          acc[item.path] = [];
        }
        acc[item.path].push(item.msg);
        return acc;
      }, {});
    }

    return next(err);
  }

  return next();
}

export { throwRegistrationValidationError };
