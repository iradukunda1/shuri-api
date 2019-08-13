import dbErrors from './dbErrors';

export const badRequest = (res, err, message) => {
  const error = dbErrors(err);
  return res.status(400).json({ message, error });
};
export const notFound = (res, message) =>
  res.status(404).json({ error: message || 'Record not found' });

export const okResponse = (res, data, code, message) =>
  res.status(code || 200).json({ message: message || 'Success', data });
