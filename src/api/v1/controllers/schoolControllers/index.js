import { isEmpty } from 'lodash';
import db from '../../../../models';
import { notFound, badRequest } from '../../../../utils/response';
import generatePassword from '../../../../utils/genPwd'

const { School, User, BusCompany: Company } = db;
/* 
{
	"principal":{
		"email":"principal@school.com",
		"password":"password"
	},
	"name":"KEP DAMN",
	"country":"Rwanda",
	"district":"Gasabo",
	"phoneNumber":"Kigali",
  "longitude":"some"
  "latitude":"some"
} 
*/
export default class SchoolController {
  static async create(req, res) {
    try {
      const newSchool = {};
      ({
        name: newSchool.name,
        country: newSchool.country,
        district: newSchool.district,
        phoneNumber: newSchool.phoneNumber,
        longitude: newSchool.longitude,
        latitude: newSchool.latitude
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
              password: generatePassword(), // password to be send to the user and user change them.
              phoneNumber: newSchool.phoneNumber,
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
        country: attributes.province,
        district: attributes.district,
        phoneNumber: attributes.phoneNumber,
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
        where: { id },
        include: [
          {
            model: Company,
            as: 'companies',
            attributes: {
              exclude: ['password']
            }
          }
        ]
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

  static async partnershipRequest(req, res) {
    try {
      const { schoolId } = req.user;
      const { companyId } = req.params;
      const school = await School.findByPk(schoolId);
      const company = await Company.findByPk(companyId);
      if (!company) {
        return notFound(res);
      }
      const partnershipExist = await school.hasCompany(company);
      if (partnershipExist) {
        throw new Error(`${company.name} is already your partner`);
      }
      const response = await school.addCompany(company);
      return res.status(201).json({
        message: 'Partnership request sent successfully',
        data: response
      });
    } catch (error) {
      return badRequest(res, error);
    }
  }
}
