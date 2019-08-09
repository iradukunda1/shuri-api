import '@babel/polyfill';
import request from '../../helpers/request';

let token;
describe('Authentication Controller', () => {
  describe('Failing Authentication', () => {
    test('should return auth error: admins', () => {
      return request
        .post('/api/v1/admins/auth')
        .send({
          email: 'shuri-app@wxampl.com',
          password: 'hello'
        })
        .then(res => {
          const {error} = res.body
          expect(error).toEqual(
            expect.objectContaining({ message: 'Invalid email/password' })
          );
        });
    });

    test('should return auth error: companies', () => {
      return request
        .post('/api/v1/companies/auth')
        .send({
          email: 'company_1@example.com',
          password: 'hello'
        })
        .then(res => {
          const {error} = res.body
          expect(error).toEqual(
            expect.objectContaining({ message: 'Invalid email/password' })
          );
        });
    });

    test('should return auth error: companies', () => {
      return request
        .post('/api/v1/companies/auth')
        .send({
          email: 'godamin@example.com',
          password: 'hello'
        })
        .then(res => {
          const {error} =res.body
          expect(error).toEqual(
            expect.objectContaining({ message: 'Invalid email/password' })
          );
        });
    });

    test('should return auth error: users', () => {
      return request
        .post('/api/v1/users/auth')
        .send({
          email: 'godamin@example.com',
          password: 'hello'
        })
        .then(res => {
          const {error} = res.body
          expect(error).toEqual(
            expect.objectContaining({ message: 'Invalid email/password' })
          );
        });
    });
    test('should return auth error: users ', () => {
      return request
        .post('/api/v1/users/auth')
        .send({
          email: 'principal@school.org',
          password: 'hello'
        })
        .then(res => {
          const {error} = res.body
          expect(error).toEqual(
            expect.objectContaining({ message: 'Invalid email/password' })
          );
        });
    });

    test('should return auth error: users', () => {
      return request
        .post('/api/v1/companies/auth')
        .send({
          email: 'company_1@example.com',
          password: 'damn'
        })
        .expect(400)
        .then(res => {
          const {error} = res.body
          expect(error).toEqual(
            expect.objectContaining({ message: 'Invalid email/password' })
          );
        });
    });

    test('should return current user', () => {
      return request
        .get('/api/v1/current')

        .expect(401)
        .then(res => {
          const { error } = res.body;
          expect(error).toMatch(/User not authorized/);
        });
    });
  });

  describe('Authentication Success', () => {
    test('should return auth success: user', () => {
      return request
        .post('/api/v1/companies/auth')
        .send({
          email: 'company_1@example.com',
          password: 'password'
        })
        .expect(200)
        .then(res => {
          ({ token } = res.body);
          expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(['message', 'token'])
          );
        });
    });

    test('should return current user', () => {
      return request
        .get('/api/v1/current')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });
  });
});
