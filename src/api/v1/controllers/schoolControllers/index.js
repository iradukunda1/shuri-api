import { isEmpty } from 'lodash';
import db from '../../../../models';
import { notFound, badRequest } from '../../../../utils/response';

const { School, User } = db;
/* 
{
	"principal":{
		"email":"principal@school.com",
		"password":"password"
	},
	"name":"KEP DAMN",
	"sector":"Kimironko",
	"district":"Gasabo",
	"province":"Kigali",
	"cell":"Kimironko"
} 
*/
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
      const user = await User.findOne({
        where: {
          email: req.body.principal.email
        }
      });
      if (user) {
        throw new Error('Principal email already taken');
      }
      const school = await School.create(
        {
          ...newSchool,
          users: [
            {
              ...req.body.principal,
              type: 'PRINCIPAL'
            }
          ]
        },
        {
          include: [
            {
              model: User,
              as: 'users'
            }
          ]
        }
      );

      return res
        .status(201)
        .json({ message: 'School registered successfully', data: school });
    } catch (err) {
      return badRequest(res, err);
    }
  }

  static async findAll(_req, res) {
    try {
      const schools = await School.findAll({
        include: [
          {
            model: User,
            as: 'users',
            attributes: {
              exclude: ['password']
            }
          }
        ]
      });
      return res.json({ message: 'Success', data: schools });
    } catch (error) {
      return badRequest(res, error);
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
        return notFound(res);
      }
      const updateSchool = await school.update(attributes);
      return res
        .status(200)
        .json({ message: 'School update successfully', data: updateSchool });
    } catch (err) {
      return badRequest(res, err);
    }
  }

  static async find(req, res) {
    try {
      const { id } = req.params;
      const school = await School.findOne({
        where: { id }
      });
      if (isEmpty(school)) {
        return notFound(res);
      }
      return res.json({ message: 'Success', data: school });
    } catch (err) {
      return badRequest(res, err);
    }
  }

  static async destroy(req, res) {
    try {
      const { id } = req.params;
      const school = await School.findOne({ where: { id } });
      if (isEmpty(school)) {
        return notFound(res);
      }
      await school.destroy();
      return res.status(200).json({ message: 'School removed successfully' });
    } catch (err) {
      return badRequest(res, err);
    }
  }
}
