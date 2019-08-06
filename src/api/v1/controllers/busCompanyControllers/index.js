import { isEmpty } from 'lodash';
import db from '../../../../models';
import { badRequest, notFound } from '../../../../utils/response';

const { BusCompany } = db;
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
      return res.status(201).json({ message: 'Success', data: company });
    } catch (err) {
      return badRequest(res, err, 'Company registration failed');
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      const company = await BusCompany.findOne({ where: { id } });
      if (isEmpty(company)) {
        return notFound(res);
      }
      const updatedCompany = await company.update({ name, email, password });
      updatedCompany.password = undefined;
      return res.status(201).json({
        message: 'Company update successfully',
        data: updatedCompany
      });
    } catch (err) {
      return badRequest(res, err, 'Company update failed');
    }
  }

  static async findAll(_req, res) {
    try {
      const companies = await BusCompany.findAll({
        attributes: {
          exclude: ['password']
        }
      });
      return res.json({ message: 'Success', data: { companies } });
    } catch (error) {
      return badRequest(error);
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
        throw new Error('Record not found');
      }
      return res.json({ message: 'Success', data: company });
    } catch (error) {
      return res.status(400).json({ error: error.message || 'Bad request' });
    }
  }

  static async destroy(req, res) {
    try {
      const { id } = req.params;
      const company = await BusCompany.findOne({ where: { id } });
      if (isEmpty(company)) {
        return notFound(res);
      }
      await company.destroy();
      return res.status(200).json({ message: 'Record deleted' });
    } catch (err) {
      return badRequest(res, err);
    }
  }
}
