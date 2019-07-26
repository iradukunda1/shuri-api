import db from '../../../../models';
import { badRequest, notFound } from '../../../../utils/response';

const { Driver, BusCompany } = db;

export default class DriverController {
  static async create(req, res) {
    try {
      const { id: companyId } = req.user;
      const newDriver = { busCompanyId: companyId };
      ({
        firstName: newDriver.firstName,
        lastName: newDriver.lastName,
        phoneNumber: newDriver.phoneNumber,
        username: newDriver.username,
        password: newDriver.password
      } = req.body);
      const driver = await Driver.create(newDriver);
      driver.password = undefined;
      return res
        .status(201)
        .json({ message: 'Driver registered successfully', data: driver });
    } catch (err) {
      return badRequest(res, err);
    }
  }

  static async findAll(req, res) {
    try {
      const { companyId } = req.params;
      const data = await BusCompany.findOne({
        where: {
          id: companyId
        },
        attributes: {
          exclude: ['password']
        },
        include: [
          {
            model: Driver,
            as: 'drivers',
            attributes: {
              exclude: ['password']
            }
          }
        ]
      });
      return res.status(200).json({ message: 'Success', data });
    } catch (err) {
      return badRequest(res, err);
    }
  }

  static async find(req, res) {
    try {
      const { id, companyId: busCompanyId } = req.params;
      const driver = await Driver.findOne({
        where: {
          id,
          busCompanyId
        },
        attributes: {
          exclude: ['password']
        }
      });
      if (!driver) {
        return notFound(res);
      }
      return res.status(200).json({ message: 'Success', data: driver });
    } catch (err) {
      return badRequest(res, err);
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { id: busCompanyId } = req.user;
      const { firstName, lastName } = req.body;
      const driver = await Driver.findOne({
        where: {
          id,
          busCompanyId
        }
      });
      if (!driver) {
        return notFound(res);
      }
      const data = await driver.update({ firstName, lastName });
      data.password = undefined;
      return res.status(200).json({ message: 'Success', data });
    } catch (err) {
      return badRequest(res, err);
    }
  }

  static async destroy(req, res) {
    try {
      const { id } = req.params;
      const { id: busCompanyId } = req.user;
      const driver = await Driver.findOne({
        where: {
          id,
          busCompanyId
        }
      });
      if (!driver) {
        return notFound(res);
      }
      await driver.destroy();
      return res.status(200).json({ message: 'Driver removed successfully' });
    } catch (err) {
      return badRequest(res, err);
    }
  }
}
