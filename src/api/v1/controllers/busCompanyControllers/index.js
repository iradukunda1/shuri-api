import { isEmpty } from 'lodash';
import db from '../../../../models';
import { badRequest, notFound } from '../../../../utils/response';

const { BusCompany, School, SchoolCompanyPartnership: Partners } = db;
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

  static async partners(req, res) {
    try {
      const { id } = req.params;
      const data = await Partners.findAll({
        where: {
          companyId: id
        },
        include: [
          {
            model: School
          }
        ]
      });
      return res.status(200).json({ message: 'Success', data });
    } catch (error) {
      return badRequest(res, error);
    }
  }

  static async approvePartner(req, res) {
    try {
      const { schoolId } = req.params;
      const { id: companyId } = req.user;
      const record = await Partners.findOne({ where: { schoolId, companyId } });
      if (!record) {
        return notFound(res);
      } if (record.status === 'approved') {
        throw new Error('Request already approved');
      }
      await record.update({ status: 'approved' });
      return res.status(200).json({ message: 'Partnership request approved ' });
    } catch (error) {
      return badRequest(res, error);
    }
  }

  static async rejectPartner(req, res) {
    try {
      const { schoolId } = req.params;
      const { id: companyId } = req.user;
      const record = await Partners.findOne({ where: { schoolId, companyId } });
      if (!record) {
        return notFound(res);
      }
      if (record.status === 'rejected') {
        throw new Error('Request already rejected');
      }
      await record.update({ status: 'rejected' });
      return res.status(200).json({ message: 'Partnership request rejected ' });
    } catch (error) {
      return badRequest(res, error);
    }
  }
}
