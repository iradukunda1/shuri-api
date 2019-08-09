/* eslint-disable prefer-promise-reject-errors */
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const { JWT_SECRET_KEY } = process.env;

export default (password, hash, payload) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (_err, match) => {
      if (!match) {
        reject({ message: `Invalid email/password`, status: 401 });
      }

      jwt.sign(
        payload,
        JWT_SECRET_KEY,
        { algorithm: 'HS256' },
        (error, token) => {
          if (token) {
            resolve(token);
          }
          reject(error);
        }
      );
    });
  });
};
