import dbErrors from './dbErrors';

export const badRequest = (res, err, message) => {
  const error = dbErrors(err);
  return res.status(400).json({ message, error });
};
export const notFound = res =>
  res.status(404).json({ error: 'Record not found' });
