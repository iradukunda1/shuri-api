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
      company.password = undefined;
      res.status(201).json({ message: 'Success', company });
    } catch (err) {
      const error = dbErrors(err);
      res.status(400).json({ message: 'Company registration failed', error });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      const company = await Company.findOne({ where: { id } });
      if (isEmpty(company)) {
        return res.status(404).json({ error: 'Record not found' });
      }
      const updatedCompany = await company.update({ name, email, password });
      updatedCompany.password = undefined;
      return res.status(201).json({
        message: 'Company update successfully',
        company: updatedCompany
      });
    } catch (err) {
      const error = dbErrors(err);
      return res.status(400).json({ message: 'Update failed', error });
    }
  }

  static async findAll(_req, res) {
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

  static async find(req, res) {
    try {
      const { id } = req.params;
      const company = await Company.findOne({
        where: { id },
        attributes: {
          exclude: ['password']
        }
      });
      if (isEmpty(company)) {
        return res.status(404).json({ error: 'Record not found' });
      }
      return res.json({ message: 'Success', company });
    } catch (error) {
      return res.status(400).json({ error: error.message || 'Bad request' });
    }
  }
}
