import { isEmpty } from 'lodash';
import db from '../../../../models';
import dbErrors from '../../../../utils/dbErrors';

const { BusCompany, Driver } = db;
export default class CompanyController {
  static async create(req, res) {
    try {
      const newUser = {};
      ({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password
      } = req.body);
      const company = await BusCompany.create(newUser);
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
      const company = await BusCompany.findOne({ where: { id } });
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
      const companies = await BusCompany.findAll({
        attributes: {
          exclude: ['password']
        },
        include: [
          {
            model: Driver
          }
        ]
      });
      res.json({ message: 'Success', companies });
    } catch (error) {
      res.status(400).json({ error: error.message || 'Bad request' });
    }
  }

  static async find(req, res) {
    try {
      const { id } = req.params;
      const company = await BusCompany.findOne({
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

  static async destroy(req, res) {
    try {
      const { id } = req.params;
      const company = await BusCompany.findOne({ where: { id } });
      if (isEmpty(company)) {
        return res.status(404).json({ message: 'Record not found' });
      }
      await company.destroy();
      return res.status(202).json({ message: 'Record deleted' });
    } catch (err) {
      const error = err.message || 'Bad request';
      return res.status(400).json({ error });
    }
  }
}
