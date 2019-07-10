import { isEmpty } from 'lodash';
import db from '../../../../models';
import dbErrors from '../../../../utils/dbErrors';

const { Company } = db;
export default class CompanyController {
  static async create(req, res) {
    try {
      const newUser = {};
      ({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password
      } = req.body);
      const company = await Company.create(newUser);
      res.json({ message: 'Success', company });
    } catch (err) {
      console.log(err.message);
      let error = dbErrors(err.errors);
      if (isEmpty(error)) {
        error = error.message || 'Bad request';
      }
      res.status(400).json({ message: 'Company registration failed', error });
    }
  }

  static async findAll(req, res) {
    try {
      const companies = await Company.findAll({
        attributes: {
          exclude: ['password']
        }
      });
      res.json({ message: 'Success', companies });
    } catch (error) {
      res.status(400).json({ error: error.message || 'Bad request' });
    }
  }
}
