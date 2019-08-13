import { isEmpty } from 'lodash';
import db from '../../../../models';
import getToken from './getToken';
import { badRequest } from '../../../../utils/response';

const { Admin, BusCompany, User } = db;
const okRes = (res, token) => res.status(200).json({ message: 'Success', token });
export default class AuthController {
  static async admin(req, res) {
    try {
      const { email, password } = req.body;
      const errMsg = 'Invalid email/password';
      const admin = await Admin.findOne({ where: { email } });
      if (!admin) {
        throw new Error(errMsg)
      }
      const payload = { id: admin.id, resource: 'Admin' };
      const token = await getToken(password, admin.password, payload);
      return okRes(res, token)
    } catch (error) {
      return badRequest(res, error)
    }
  }

  static async company(req, res) {
    try {
      const { email, password } = req.body;
      const message = 'Invalid email/password';
      const company = await BusCompany.findOne({ where: { email } });
      if (isEmpty(company)) {
        throw new Error(message)
      }
      const payload = { id: company.id, resource: 'BusCompany' };
      const token = await getToken(password, company.password, payload);
      return okRes(res, token)
    } catch (error) {
      return badRequest(res, error);
    }
  }

  static async user(req, res) {
    try {
      const { email, password } = req.body;
      const message = 'Invalid email/password';
      const user = await User.findOne({ where: { email } });
      if (isEmpty(user)) {
       throw new Error(message)
      }
      const payload = { id: user.id, resource: 'User' };
      const token = await getToken(password, user.password, payload);
      return okRes(res, token)
    } catch (error) {
      return badRequest(res, error)
    }
  }

  static async currentUser(req, res) {
    try {
      const { id, resource } = req.user;
      const user = await db[resource].findByPk(id);
      user.password = undefined;
      return res.status(200).json({ message: 'Success', data: user });
    } catch (error) {
      return badRequest(res, error)
    }
  }
}
