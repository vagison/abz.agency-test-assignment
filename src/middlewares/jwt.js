/* eslint-disable no-restricted-syntax */
import createError from 'http-errors';
import passport from 'passport';

import { errorMessagesConstants } from '../constants';

const usedTokens = {}; // In-memory blacklist

function jwt(req, res, next) {
  return passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      return next(createError.Unauthorized(errorMessagesConstants.User.MalformedToken));
    }

    // Expired token
    if (!user) {
      delete usedTokens[req.headers.token];
      return next(createError.Unauthorized(errorMessagesConstants.User.ExpiredToken));
    }

    // Used token
    if (usedTokens[req.headers.token] && usedTokens[req.headers.token].used) {
      return next(createError.Unauthorized(errorMessagesConstants.User.ExpiredToken));
    }

    // Marking the token as used
    if (process.env.NODE_ENV === 'production') {
      usedTokens[req.headers.token].used = true;
    }

    return next();
  })(req, res, next);
}

const removeExpiredProperties = () => {
  const now = Date.now();
  for (const key in usedTokens) {
    if (usedTokens[key].expiration <= now) {
      delete usedTokens[key];
    }
  }
};

// Schedule cleanup of used tokens
setInterval(removeExpiredProperties, 1000 * process.env.JWT_EXPIRES_IN);

export { jwt, usedTokens };
