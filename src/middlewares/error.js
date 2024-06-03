import PrettyError from 'pretty-error';
import { errorMessagesConstants } from '../constants';

function errorLogger(error, req, res, next) {
  const pe = new PrettyError();
  console.log(pe.render(error));
  next(error);
}

function errorHandler(error, req, res, _) {
  const name = error.name || 'Internal Server Error';
  let statusCode = error.status || 500;
  let message = error.message || 'Something went wrong';
  let { fails } = error;

  if (error.code === 'LIMIT_FILE_SIZE') {
    message = 'Validation failed';
    statusCode = 422;
    fails = {
      photo: [
        errorMessagesConstants.User.PhotoTooLarge,
      ],
    };
  }

  const err = {
    success: false,
    message,
    fails,
    name: process.env.NODE_ENV === 'development' ? name : undefined,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
  };

  return res.status(statusCode).json(err);
}

function invalidPathHandler(req, res) {
  const statusCode = 404;
  const message = 'Invalid path';

  const response = {
    message,
  };

  return res.status(statusCode).json(response);
}

export { errorLogger, errorHandler, invalidPathHandler };
