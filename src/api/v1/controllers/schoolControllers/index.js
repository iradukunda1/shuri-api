import { isEmpty } from 'lodash';
import db from '../../../../models';
import { notFound, badRequest, okResponse } from '../../../../utils/response';
import generatePassword from '../../../../utils/genPwd';

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
      const data = await School.create(
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

      return okResponse(res, data, 201, 'School registered successfully');
    } catch (err) {
      return badRequest(res, err);
    }
  }

  static async findAll(_req, res) {
    try {
      const data = await School.findAll({
        include: [
          {
            model: User,
            as: 'users',
            where: {
              type: 'PRINCIPAL'
            },
            attributes: {
              exclude: ['password', 'schoolId']
            }
          }
        ]
      });
      return okResponse(res, data, 200, 'Success');
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
        phoneNumber: attributes.phoneNumber
      } = req.body);
      const school = await School.findOne({ where: { id } });
      if (isEmpty(school)) {
        return notFound(res);
      }
      const data = await school.update(attributes);
      const message = 'School update successfully';
      return okResponse(res, data, 200, message);
    } catch (err) {
      return badRequest(res, err);
    }
  }

  static async find(req, res) {
    try {
      const { id } = req.params;
      const data = await School.findOne({
        where: { id },
        include: [
          {
            model: User,
            as: 'users',
            where: {
              type: 'PRINCIPAL'
            },
            attributes: {
              exclude: ['password', 'schoolId']
            }
          }
        ]
      });
      if (isEmpty(data)) {
        return notFound(res);
      }
      return okResponse(res, data);
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
      return okResponse(
        res,
        undefined,
        undefined,
        'School removed successfully'
      );
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
      return okResponse(
        res,
        response,
        201,
        'Partnership request sent successfully'
      );
    } catch (error) {
      return badRequest(res, error);
    }
  }
}
