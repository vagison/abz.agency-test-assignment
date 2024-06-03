import createHttpError from 'http-errors';
import { errorMessagesConstants } from '../../constants';

const VALIDATION_ERRORS = ['count', 'page'];

function throwGetUsersValidationError(req, res, next) {
  if (!req.fails.isEmpty()) {
    const fails = req.fails.errors;
    let err;

    for (let index = 0; index < fails.length; index++) {
      const error = fails[index];

      if (VALIDATION_ERRORS.includes(error.path)) {
        err = createHttpError.UnprocessableEntity(errorMessagesConstants.User.ValidationError);
        err.fails = fails.reduce((acc, item) => {
          if (!acc[item.path]) {
            acc[item.path] = [];
          }
          acc[item.path].push(item.msg);
          return acc;
        }, {});

        return next(err);
      }
    }
  }

  return next();
}

export { throwGetUsersValidationError };
