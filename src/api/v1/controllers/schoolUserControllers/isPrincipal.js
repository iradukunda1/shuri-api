import { PRINCIPAL } from './types';

export default (req, res, next) => {
  const { schoolId: sklId, type } = req.user;
  const { schoolId } = req.params;
  if (schoolId !== sklId && type !== PRINCIPAL) {
    return res.status(401).json({
      error: 'Access is denied',
      message:
        'You may not have the appropriate permissions to perform this action'
    });
  }
  return next();
};
