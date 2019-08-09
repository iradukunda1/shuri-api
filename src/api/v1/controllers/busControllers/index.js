import db from '../../../../models';
import { notFound, badRequest } from '../../../../utils/response';

const { Bus, BusCompany } = db;

export default class BusController {
  static async create(req, res) {
    try {
      const { model, plateNumber } = req.body;
      const { id } = req.user;
      const bus = await Bus.create({
        model,
        plateNumber,
        busCompanyId: id
      });
      return res
        .status(201)
        .json({ message: 'Bus registered successfully', data: bus });
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
            model: Bus,
            as: 'buses'
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
      const { id} = req.params;
      const bus = await Bus.findOne({
        where: {
          id
        }
      });
      if (!bus) {
        return notFound(res);
      }
      return res.status(200).json({ message: 'Success', data: bus });
    } catch (err) {
      return badRequest(res, err);
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { id: busCompanyId } = req.user;
      const { plateNumber, model } = req.body;
      const bus = await Bus.findOne({
        where: {
          id,
          busCompanyId
        }
      });
      const data = await bus.update({ plateNumber, model });
      return res
        .status(201)
        .json({ message: 'Bus updated successfully', data });
    } catch (err) {
      return badRequest(res, err, 'Bus update failed');
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
      if (!bus) {
        return notFound(res);
      }
      await bus.destroy();
      return res.status(200).json({ message: 'Bus deleted successfully' });
    } catch (err) {
      return badRequest(res, err);
    }
  }
}
