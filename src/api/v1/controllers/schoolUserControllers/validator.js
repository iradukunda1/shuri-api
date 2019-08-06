import Joi from '@hapi/joi';
import joiError from '../../../../utils/joiError';

export default (req, res, next) => {
  const { schoolId } = req.params;
  const { firstName, lastName, email, password, phoneNumber } = req.body;
  const schema = Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string()
      .email()
      .required()
      .label('Invalid email'),
    password: Joi.string()
      .min(6)
      .required()
      .label('Password should have minimum of 6 characters'),
    phoneNumber: Joi.string()
      .min(10)
      .max(13)
      .label('Invalid phone number'),
    schoolId: Joi.string().guid({
      version: ['uuidv4', 'uuidv5']
    })
  });
  Joi.validate(
    { firstName, lastName, email, password, phoneNumber, schoolId },
    schema,
    (err, _value) => {
      if (err) {
        const error = joiError(err);
        return res.status(400).json({ message: 'Validation error', error });
      }
      return next();
    }
  );
};
