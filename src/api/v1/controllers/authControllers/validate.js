import Joi from '@hapi/joi';
import joiError from '../../../../utils/joiError';

export default (req, res, next) => {
  const { username, password } = req.body;
  const schema = Joi.object().keys({
    username: Joi.string()
      .required()
      .label('Username is required'),
    password: Joi.string()
      .required()
      .label('Password is required')
  });

  return Joi.validate({ username, password }, schema, (err, _value) => {
    if (err) {
      const error = joiError(err);
      return res.status(400).json({ message: 'Validation error', error });
    }
    return next();
  });
};
