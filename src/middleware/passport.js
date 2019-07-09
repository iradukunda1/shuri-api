import passportJWT from 'passport-jwt';
import dotenv from 'dotenv';
import passport from 'passport';
import database from '../models';

dotenv.config();
const { JWT_SECRET_KEY } = process.env;
const { Strategy, ExtractJwt } = passportJWT;
const options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = JWT_SECRET_KEY;

passport.use(
  new Strategy(options, async (payload, done) => {
    const { resource, id } = payload;
    try {
      const user = await database[resource].findOne({ id });
      if (user) {
        return done(null, { id: user.id, resource });
      }
      return done(null, false);
    } catch (error) {
      return done(null, false);
    }
  })
);
