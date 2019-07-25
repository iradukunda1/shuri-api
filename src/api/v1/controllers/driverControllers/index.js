import db from '../../../../models';
import dbErrors from '../../../../utils/dbErrors';

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
      res
        .status(201)
        .json({ message: ' Driver registered successfully', driver });
    } catch (err) {
      const error = dbErrors(err);
      res.status(500).json({ message: 'Driver registration failed', error });
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
      res.status(200).json({ message: 'success', data });
    } catch (err) {
      const error = err.message || 'Bad request';
      res.status(400).json({ error });
    }
  }

  static async find(req, res) {
    try {
      const { id } = req.params;
      const driver = await Driver.findById(id, {
        attributes: {
          exclude: ['password']
        }
      });
      return res.status(200).json({ message: 'success', driver });
    } catch (err) {
      const error = err.message || 'Bad request';
      return res.status(400).json({ error });
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
      const data = await driver.update({ firstName, lastName });
      data.password = undefined;
      return res.status(201).json({ message: 'success', driver: data });
    } catch (err) {
      const error = dbErrors(err);
      return res.status(400).json({ error });
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
      await driver.destroy();
      return res.status(201).json({ message: 'Driver removed successfully' });
    } catch (err) {
      const error = err.message || 'Bad request';
      return res.status(400).json({ error });
    }
  }
}
