import Joi from '@hapi/joi';
import joiError from '../../../../utils/joiError';

const allSchema = {
  PUT:  Joi.object().keys( {
    name: Joi.string().label('Name should be a string'),
    email: Joi.string()
      .email()
      .label('Invalid email'),
    password: Joi.string()
      .min(6)
      .label('Password should be more than 6 characters')
  }),
  POST:  Joi.object().keys( {
    name: Joi.string()
      .required()
      .label('Name is required'),
    email: Joi.string().email().required().label('Invalid email'),
    country: Joi.string()
      .required()
      .label('Country is required'),
    district: Joi.string()
      .required()
      .label('District is required'),
    phoneNumber: Joi.string()
      .required()
      .min(10)
      .max(12)
      .label('Invalid phone number'),
    password: Joi.string().min(4).label('Password too short'),
    description: Joi.string().min(100).max(250).label('Description should be between 100 and 250 characters')
  })
};
export default (req, res, next) => {
  const schema = allSchema[req.method];
  Joi.validate({ ...req.body }, schema, (err, _value) => {
    if (err) {
      const error = joiError(err);
      return res.status(400).json({ message: 'Validation error', error });
    }
    return next();
  });
};
