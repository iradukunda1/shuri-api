import Joi from '@hapi/joi';
import joiError from '../../../../utils/joiError';

const Schemas = {
  POST:  Joi.object().keys( {
    name: Joi.string()
      .required()
      .label('Name is required'),
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
    longitude: Joi.string(),
    latitude: Joi.string(),
    principal:  Joi.object().keys( {
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string()
        .email()
        .required()
        .label('Invalid principal email'),
      password: Joi.string().min(4).label('Password too short')
    })
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
