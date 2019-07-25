import { isEmpty } from 'lodash';
import db from '../../../../models';
import getToken from './getToken';

const { Admin, BusCompany, User } = db;
export default class AuthController {
  static async admin(req, res) {
    try {
      const { username, password } = req.body;
      const errMsg = 'Invalid username/password';
      const admin = await Admin.findOne({ where: { username } });
      if (!admin) {
        return res.status(401).json({ message: errMsg });
      }
      const payload = { id: admin.id, resource: 'Admin' };
      const token = await getToken(password, admin.password, payload);
      return res.json({ message: 'Login success', token });
    } catch (error) {
      const message = error.message || 'Bad request';
      return res.status(400).json({ message });
    }
  }

  static async company(req, res) {
    try {
      const { email, password } = req.body;
      const message = 'Invalid email/password';
      const company = await BusCompany.findOne({ where: { email } });
      if (isEmpty(company)) {
        return res.status(401).json({ message });
      }
      const payload = { id: company.id, resource: 'BusCompany' };
      const token = await getToken(password, company.password, payload, true);
      return res.json({ message: 'Login success', token });
    } catch (error) {
      const message = error.message || 'Bad request';
      return res.status(400).json({ message });
    }
  }

  static async user(req, res) {
    try {
      const { email, password } = req.body;
      const message = 'Invalid email/password';
      const user = await User.findOne({ where: { email } });
      if (isEmpty(user)) {
        return res.status(401).json({ message });
      }
      const payload = { id: user.id, resource: 'User' };
      const token = await getToken(password, user.password, payload, true);
      return res.json({ message: 'Login success', token });
    } catch (error) {
      const message = error.message || 'Bad request';
      return res.status(400).json({ message });
    }
  }

  static async current(req, res) {
    try {
      const { id, resource } = req.user;
      const user = await db[resource].findByPk(id);
      user.password = undefined;
      return res.json({ message: 'Success', user });
    } catch (error) {
      const message = error.message || 'Bad request';
      return res.status(400).json({ message });
    }
  }
}
