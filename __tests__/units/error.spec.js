import dbErrors from '../../src/utils/dbErrors';
import { UNIQUE_VIOLATION } from '../../src/constants';
import joiError from '../../src/utils/joiError';

const errorsUnique = [
  {
    path: 'email',
    message: 'Unique constraint violation',
    type: UNIQUE_VIOLATION
  }
];
const errorUndefined = [
  {
    path: 'password',
    message: 'Cant generate hash for nil value',
    type: 'SOME_THING_ELSE'
  }
];
describe('Database Error', () => {
  test('should return unique validation error', () => {
    const response = dbErrors({ errors: errorsUnique });
    expect(response).toEqual(
      expect.objectContaining({ email: 'email is already taken' })
    );
  });

  test('should return other db error', () => {
    const response = dbErrors({ errors: errorUndefined });
    expect(response).toEqual(
      expect.objectContaining({ password: 'Cant generate hash for nil value' })
    );
  });

  test('should return bad request error', () => {
    const response = dbErrors(() => {
      throw new Error();
    });
    expect(response).toEqual(
      expect.objectContaining({ message: 'Bad request' })
    );
  });

  test('should return readable joi error', () => {
    const response = joiError({
      details: [{ context: { key: 'email', label: 'Email is required' } }]
    });

    expect(response).toEqual(
      expect.objectContaining({ email: 'Email is required' })
    );
  });
});
