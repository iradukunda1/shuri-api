import { isEmpty } from 'lodash';
import db from '../../../../models';
import getToken from './getToken';

const { Admin, Company } = db;
export default class AuthController {
  static async admin(req, res) {
    try {
      const { username, password } = req.body;
      const errMsg = 'Invalid username/password';
      const admin = await Admin.findOne({ where: { username } });
      if (!admin) {
        return res.status(401).json({ message: errMsg });
      }
      const payload = { id: admin.id, type: admin.type, resource: 'Admin' };
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
      const company = await Company.findOne({ where: { email } });
      if (isEmpty(company)) {
        return res.status(401).json({ message });
      }
      const payload = { id: company.id, resource: 'Company' };
      const token = await getToken(password, company.password, payload, true);
      return res.json({ message: 'Login success', token });
    } catch (error) {
      const message = error.message || 'Bad request';
      return res.status(400).json({ message });
    }
  }

  static async current(req, res) {
    try {
      const { id, resource } = req.user;
      const user = await db[resource].findOne({ id });
      user.password = undefined;
      return res.json({ message: 'Success', user });
    } catch (error) {
      const message = error.message || 'Bad request';
      return res.status(400).json({ message });
    }
  }
}
