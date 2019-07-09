import Joi from '@hapi/joi';

export default (req, res, next) => {
  const { username, password } = req.body;
  const schema = Joi.object().keys({
    username: Joi.string()
      .min(4)
      .max(12)
      .required()
      .label('Username should be between 4-12 characters'),
    password: Joi.string()
      .min(6)
      .required()
      .label('Password should be have minimum of 6 characters')
  });
  Joi.validate({ username, password }, schema, (err, _value) => {
    if (err) {
      const error = {};
      const { details } = err;
      details.forEach(element => {
        const {
          context: { key, label }
        } = element;
        error[key] = label;
      });
      return res.status(400).json({ message: 'Validation error', error });
    }
    return next();
  });
};
