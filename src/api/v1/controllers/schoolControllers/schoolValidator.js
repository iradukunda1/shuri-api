import Joi from '@hapi/joi';
import joiError from '../../../../utils/joiError';

const Schemas = {
  POST: Joi.object().keys({
    name: Joi.string()
      .required()
      .label('Name is required'),
    country: Joi.string()
      .required()
      .label('Country is required'),
    province: Joi.string()
      .required()
      .label('Province is required'),
    district: Joi.string()
      .required()
      .label('District is required'),
    sector: Joi.string()
      .required()
      .label('Sector is required'),
    cell: Joi.string()
      .required()
      .label('Cell is required'),

    email: Joi.string()
      .email()
      .required()
      .label('Invalid principal email'),
    password: Joi.string()
      .min(6)
      .required()
      .label('Password should have minimum of 6 characters'),
    phoneNumber: Joi.string()
      .min(10)
      .max(13)
      .label('Invalid principal phone number'),
    longitude: Joi.number()
      .precision(8)
      .required()
      .label('Invalid longitude value'),
    latitude: Joi.number()
      .precision(8)
      .required()
      .label('Invalid latitude value')
  })
};
export default (req, res, next) => {
  const school = req.body;
  const { method } = req;
  const schema = Schemas[method];

  Joi.validate(school, schema, (err, _value) => {
    if (err) {
      const error = joiError(err);
      return res.status(400).json({ message: 'Validation error', error });
    }
    return next();
  });
};
