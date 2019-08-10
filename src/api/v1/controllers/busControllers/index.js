import db from '../../../../models';
import { notFound, badRequest, okResponse } from '../../../../utils/response';

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
      return okResponse(res, bus, 201, 'Bus registered successfully');
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
      return okResponse(res, data);
    } catch (err) {
      return badRequest(res, err);
    }
  }

  static async find(req, res) {
    try {
      const { id } = req.params;
      const bus = await Bus.findOne({
        where: {
          id
        }
      });
      if (!bus) {
        return notFound(res);
      }
      return okResponse(res, bus);
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
      return okResponse(res, data, 200, 'Bus updated successfully');
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
      return okResponse(res, undefined, 200, 'Bus deleted successfully');
    } catch (err) {
      return badRequest(res, err);
    }
  }
}
