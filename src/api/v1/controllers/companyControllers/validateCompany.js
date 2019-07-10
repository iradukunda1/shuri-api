import Joi from '@hapi/joi';
import joiError from '../../../../utils/joiError';

const allSchema = {
  PUT: Joi.object().keys({
    name: Joi.string().label('Name should be a string'),
    email: Joi.string()
      .email()
      .label('Invalid email'),
    password: Joi.string()
      .min(6)
      .label('Password should be more than 6 characters')
  }),
  POST: Joi.object().keys({
    name: Joi.string()
      .required()
      .label('Name is required'),
    email: Joi.string()
      .email()
      .required()
      .label('Invalid email'),
    password: Joi.string()
      .min(6)
      .required()
      .label('Password should be more than 6 characters')
  })
};
export default (req, res, next) => {
  const { name, email, password } = req.body;
  const schema = allSchema[req.method];
  Joi.validate({ name, email, password }, schema, (err, _value) => {
    if (err) {
      const error = joiError(err);
      return res.status(400).json({ message: 'Validation error', error });
    }
    return next();
  });
};
