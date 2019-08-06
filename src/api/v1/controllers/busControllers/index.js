import db from '../../../../models';
import dbErrors from '../../../../utils/dbErrors';

const { Bus, BusCompany } = db;

export default class BusController {
  static async create(req, res) {
    try {
      const { model, plateNumber } = req.body;
      const { companyId } = req.params;
      const bus = await Bus.create({
        model,
        plateNumber,
        busCompanyId: companyId
      });
      return res
        .status(201)
        .json({ message: 'Bus registered successfully', bus });
    } catch (err) {
      const error = dbErrors(err);
      return res
        .status(400)
        .json({ message: 'Bus registration failed', error });
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
            model: Bus,
            as: 'buses'
          }
        ]
      });
      return res.status(200).json({ message: 'success', data });
    } catch (err) {
      const error = err.message || 'Bad request';
      return res.status(400).json({ error });
    }
  }

  static async find(req, res) {
    try {
      const { id, companyId } = req.params;
      const bus = await Bus.findOne({
        where: {
          id,
          busCompanyId: companyId
        }
      });
      return res.status(200).json({ message: 'success', bus });
    } catch (err) {
      const error = err.message || 'Bad request';
      return res.status(400).json({ error });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { id: busCompanyId } = req.user;
      const { plateNumber, model } = req.body;
      const bus = await Bus.Bus.findOne({
        where: {
          id,
          busCompanyId
        }
      });
      const data = await bus.update({ plateNumber, model });
      return res
        .status(201)
        .json({ message: 'Bus updated successfully', bus: data });
    } catch (err) {
      const error = dbErrors(err);
      return res.status(400).json({ error });
    }
  }

  static async destroy(req, res) {
    try {
      const { id } = req.params;
      const { id: busCompanyId } = req.user;
      const bus = await Bus.findOne({
        where: {
          id,
          busCompanyId
        }
      });
      await bus.destroy();
      return res.status(200).json({ message: 'Bus deleted successfully' });
    } catch (err) {
      const error = err.message || 'Bad request';
      return res.status(400).json({ error });
    }
  }
}
