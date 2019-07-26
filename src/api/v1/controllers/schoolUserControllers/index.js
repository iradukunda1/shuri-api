import model from '../../../../models';
import { badRequest, notFound } from '../../../../utils/response';

const { User, School } = model;
export default class SchoolUserController {
  static async create(req, res) {
    try {
      const { schoolId } = req.user;
      const newUser = { schoolId };
      ({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
        phoneNumber: newUser.phoneNumber
      } = req.body);
      const response = await User.create({ ...newUser, schoolId });
      response.password = undefined;
      return res
        .status(201)
        .json({ message: 'User registered successfully', data: response });
    } catch (err) {
      return badRequest(res, err);
    }
  }

  static async findAll(req, res) {
    try {
      const { schoolId } = req.params;
      const data = await School.findOne({
        where: {
          id: schoolId
        },
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
      return res.json({ message: 'Success', data });
    } catch (err) {
      return badRequest(res, err);
    }
  }

  static async find(req, res) {
    try {
      const { id, schoolId } = req.params;
      const user = await User.findOne({
        where: {
          id,
          schoolId
        },
        attributes: {
          exclude: ['password']
        }
      });
      if (!user) {
        return notFound(res);
      }
      return res.json({ message: 'Success', data: user });
    } catch (err) {
      return badRequest(res, err);
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { schoolId } = req.user;
      const newUser = {};
      ({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phoneNumber: newUser.phoneNumber
      } = req.body);
      const user = await User.findOne({
        where: {
          id,
          schoolId
        }
      });
      if (!user) {
        return notFound(res);
      }
      const response = await user.update(newUser);
      response.password = undefined;
      return res
        .status(200)
        .json({ message: 'User update successfully', data: response });
    } catch (err) {
      return badRequest(res, err);
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return notFound(res);
      }
      await user.destroy();
      return res.status(200).json({ message: 'User removed successfully' });
    } catch (err) {
      return badRequest(res, err);
    }
  }
}
