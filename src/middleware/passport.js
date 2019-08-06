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
      const user = await database[resource].findByPk(id);
      if (user) {
        const role = {
          type: user.role || user.type || undefined,
          resource: resource.toLowerCase()
        };
        user.dataValues.password = undefined;
        return done(null, { ...user.dataValues, resource, role });
      }
      return done(null, false);
    } catch (error) {
      return done(null, false);
    }
  })
);
