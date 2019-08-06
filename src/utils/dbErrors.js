import { isEmpty } from 'lodash';
import { UNIQUE_VIOLATION } from '../constants';

export default err => {
  const error = {};
  if (isEmpty(err.errors)) {
    return err.message || 'Bad request';
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
