import createHttpError from 'http-errors';
import { errorMessagesConstants } from '../../constants';

const VALIDATION_ERRORS = ['name', 'email', 'phone', 'position_id', 'photo'];

function throwError(req, res, next) {
  if (!req.fails.isEmpty()) {
    let err;

    const fails = req.fails.errors;
    for (let index = 0; index < fails.length; index++) {
      const error = fails[index];

      if (VALIDATION_ERRORS.includes(error.path)) {
        if (error.msg === 'User with this phone or email already exist') {
          err = createHttpError.Conflict(errorMessagesConstants.User.AlreadyExists);
        } else {
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
    }
  }

  return next();
}

export { throwError };
