import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { jwtConfig } from '.';

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      secretOrKey: jwtConfig.secret,
    },
    (jwtPayload, done) => {
      try {
        if (jwtPayload) {
          return done(null, jwtPayload);
        }
        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);
