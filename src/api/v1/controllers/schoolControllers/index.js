import { isEmpty } from 'lodash';
import db from '../../../../models';
import dbErrors from '../../../../utils/dbErrors';

const { School } = db;

export default class SchoolController {
  static async create(req, res) {
    try {
      const newSchool = {};
      ({
        name: newSchool.name,
        province: newSchool.province,
        district: newSchool.district,
        sector: newSchool.sector,
        cell: newSchool.cell
      } = req.body);
      const school = await School.create(newSchool);
      return res
        .status(201)
        .json({ message: 'School registered successfully', school });
    } catch (err) {
      const error = dbErrors(err);
      return res
        .status(400)
        .json({ message: 'School registration failed', error });
    }
  }

  static async findAll(_req, res) {
    try {
      const schools = await School.findAll();
      return res.json({ message: 'success', schools });
    } catch (error) {
      return res.status(400).json({ error: error.message || 'Bad request' });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const attributes = {};
      ({
        name: attributes.name,
        province: attributes.province,
        district: attributes.district,
        sector: attributes.sector,
        cell: attributes.cell
      } = req.body);
      const school = await School.findOne({ where: { id } });
      if (isEmpty(school)) {
        return res.status(404).json({ message: 'Record not found' });
      }
      const updateSchool = await school.update(attributes);
      return res
        .status(201)
        .json({ message: 'School update successfully', school: updateSchool });
    } catch (err) {
      const error = dbErrors(err);
      return res.status(400).json({ message: 'School update failed', error });
    }
  }

  static async find(req, res) {
    try {
      const { id } = req.params;
      const school = await School.findOne({ where: { id } });
      if (isEmpty(school)) {
        return res.status(404).json({ message: 'Record not found' });
      }
      return res.json({ message: 'success', school });
    } catch (err) {
      const error = err.message || 'Bad request';
      return res.status(400).json({ error });
    }
  }

  static async destroy(req, res) {
    try {
      const { id } = req.params;
      const school = await School.findOne({ where: { id } });
      if (isEmpty(school)) {
        return res.status(404).json({ message: 'Record not found' });
      }
      await school.destroy();
      return res.status(202).json({ message: 'Record deleted' });
    } catch (err) {
      const error = err.message || 'Bad request';
      return res.status(400).json({ error });
    }
  }
}
