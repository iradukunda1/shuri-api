import Joi from '@hapi/joi';
import joiError from '../../../../utils/joiError';

const Schemas = {
  POST: Joi.object().keys({
    name: Joi.string()
      .required()
      .label('Name is required'),
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
      .label('Cell is required')
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
