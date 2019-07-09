import db from '../../../models';
import { UNIQUE_VIOLATION } from '../../../constants/dbErrors';

const { Admin } = db;
export default class AdminController {
  static async create(req, res) {
    try {
      const newUser = {};
      ({ username: newUser.username, password: newUser.password } = req.body);
      const user = await Admin.create(newUser);
      return res.json({ user });
    } catch (err) {
      const error = {};
      const { errors } = err;
      errors.forEach(element => {
        const { path, message, type } = element;
        switch (type) {
          case UNIQUE_VIOLATION:
            error[path] = `${path} already taken`;
            break;
          default:
            error[path] = message;
            break;
        }
      });
      return res
        .status(400)
        .json({ message: 'Admin registration failed', error });
    }
  }
}
