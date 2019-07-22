import db from '../../../../models';
import dbErrors from '../../../../utils/dbErrors';

const { Bus } = db;

export default class BusController {
  static async create(req, res) {
    try {
      const { model, plateNumber } = req.body;
      const bus = await Bus.create({ model, plateNumber });
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

  static async findAll(_req, res) {
    try {
      const buses = await Bus.findAll();
      return res.status(200).json({ message: 'success', buses });
    } catch (err) {
      const error = err.message || 'Bad request';
      return res.status(400).json({ error });
    }
  }

  static async find(req, res) {
    try {
      const { id } = req.params;
      const bus = await Bus.findById(id);
      return res.status(200).json({ message: 'success', bus });
    } catch (err) {
      const error = err.message || 'Bad request';
      return res.status(400).json({ error });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { plateNumber, model } = req.body;
      const bus = await Bus.findById(id);
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
      const bus = await Bus.findById(id);
      await bus.destroy();
      return res.status(200).json({ message: 'Bus deleted successfully' });
    } catch (err) {
      const error = err.message || 'Bad request';
      return res.status(400).json({ error });
    }
  }
}
