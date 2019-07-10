import db from '../../../../models';
import { ADMIN_TYPES } from '../../../../constants';
import dbErrors from '../../../../utils/dbErrors';

const { Admin } = db;

export default class AdminController {
  static async create(req, res) {
    try {
      const newUser = {};
      ({ username: newUser.username, password: newUser.password } = req.body);
      const user = await Admin.create(newUser);
      user.password = undefined;
      return res.json({ message: 'Success', user });
    } catch (err) {
      const error = dbErrors(err);
      return res
        .status(400)
        .json({ message: 'Admin registration failed', error });
    }
  }

  static async findAll(req, res) {
    try {
      const filters = {};
      const { type: adminType } = req.query;
      const type = adminType ? adminType.toString().toLowerCase() : null;
      if (type && ADMIN_TYPES.includes(type)) {
        filters.type = type;
      }
      const allAdmins = await Admin.findAll({
        where: {
          ...filters
        },
        attributes: {
          exclude: ['password']
        }
      });
      return res.json({ message: 'success', admins: allAdmins });
    } catch (err) {
      const message = err.message || 'Bad request';
      return res.status(400).json({ message });
    }
  }

  static async findOne(req, res) {
    try {
      const { id } = req.params;
      const admin = await Admin.findOne({
        where: { id },
        attributes: {
          exclude: ['password']
        }
      });
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
      return res.json({ message: 'Success', admin });
    } catch (err) {
      const message = err.message || 'Bad request';
      return res.status(400).json({ message });
    }
  }
}
