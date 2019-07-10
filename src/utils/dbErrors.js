import { UNIQUE_VIOLATION } from '../constants';

export default (errors = []) => {
  const error = {};
  errors.forEach(element => {
    const { path, message, type } = element;
    switch (type) {
      case UNIQUE_VIOLATION:
        error[path] = `${path} already taken`;
        break;
      default:
        error[path] = message;
        break;
    }
  });
  return error;
};
