import { isEmpty } from 'lodash';
import { UNIQUE_VIOLATION } from '../constants';

export default err => {
  const error = {};
  if (isEmpty(err.errors)) {
    error.message = err.message || 'Bad request';
    return error;
  }
  err.errors.forEach(element => {
    const { path, message, type } = element;
    switch (type) {
      case UNIQUE_VIOLATION:
        error[path] = `${path} is already taken`;
        break;
      default:
        error[path] = message;
        break;
    }
  });
  return error;
};
