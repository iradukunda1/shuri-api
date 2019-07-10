import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const { JWT_SECRET_KEY } = process.env;

export default (password, hash, payload) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (_err, match) => {
      if (!match) {
        reject(new Error('Invalid username/password'));
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
