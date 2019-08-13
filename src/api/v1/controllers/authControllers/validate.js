import Joi from '@hapi/joi';
import joiError from '../../../../utils/joiError';

export default (req, res, next) => {
  const { email, password } = req.body;
  const schema =  Joi.object().keys( {
    email: Joi.string()
      .required()
      .label('Email is required'),
    password: Joi.string()
      .required()
      .label('Password is required')
  });

  return Joi.validate({ email, password }, schema, (err, _value) => {
    if (err) {
      const error = joiError(err);
      return res.status(400).json({ message: 'Validation error', error });
    }
    return next();
  });
};

export const validateCompanyLogin = (req, res, next) => {
  const { email, password } = req.body;
  const schema =  Joi.object().keys( {
    email: Joi.string()
      .required()
      .label('Email is required'),
    password: Joi.string()
      .required()
      .label('Password is required')
  });

  return Joi.validate({ email, password }, schema, (err, _value) => {
    if (err) {
      const error = joiError(err);
      return res.status(400).json({ message: 'Validation error', error });
    }
    return next();
  });
};
