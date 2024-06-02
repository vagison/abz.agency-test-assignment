import createError from 'http-errors';
import passport from 'passport';

import { errorMessagesConstants } from '../constants';

function jwt(req, res, next) {
  return passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      return next(createError.Unauthorized(errorMessagesConstants.User.MalformedToken));
    }

    if (!user) {
      return next(createError.Unauthorized(errorMessagesConstants.User.ExpiredToken));
    }

    return next();
  })(req, res, next);
}

export default jwt;
