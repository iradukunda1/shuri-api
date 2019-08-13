import '@babel/polyfill';
import request from '../../helpers/request';

const adminAttributes = ['id', 'email', 'updatedAt', 'createdAt', 'type'];
const admin = {
  email: 'shuri-app@example.com',
  password: 'password'
};
let adminId;
let authToken;

const get = url =>
  request
    .get(`/api/v1/${url}`)
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${authToken}`);

describe('Admin Controller', () => {
  let superAdminToken;
  beforeAll(async () => {
    const response = await request.post('/api/v1/admins/auth').send({
      email: 'admin1@example.com',
      password: 'password'
    });
    superAdminToken = response.body.token;
  });
  describe('Create admin', () => {
    it('should create admin successfully', done => {
      return request
        .post('/api/v1/admins')
        .send(admin)
        .set('Authorization', `Bearer ${superAdminToken}`)
        .then(res => {
          const { message, data } = res.body;
          adminId = data.id;
          expect(message).toBe('Success');
          expect(Object.keys(data)).toEqual(
            expect.arrayContaining(adminAttributes)
          );
          expect(Object.keys(data)).toEqual(
            expect.not.arrayContaining(['password'])
          );
          done();
        });
    });

    it('should not create an admin with existing username', done => {
      return request
        .post('/api/v1/admins')
        .send(admin)
        .set('Authorization', `Bearer ${superAdminToken}`)
        .then(res => {
          const { message, error } = res.body;
          expect(message).toMatch(/Admin registration failed/);
          expect(error).toEqual(
            expect.objectContaining({ email: 'email is already taken' })
          );
          done();
        });
    });
    it('should not create admin without a username', done => {
      return request
        .post('/api/v1/admins')
        .send({})
        .set('Authorization', `Bearer ${superAdminToken}`)
        .then(res => {
          const { message, error } = res.body;
          expect(message).toMatch(/Validation error/);
          expect(Object.keys(error)).toEqual(
            expect.arrayContaining(['email'])
          );
          done();
        });
    });

    it('should not create admin without a password', done => {
      return request
        .post('/api/v1/admins')
        .send({ ...admin, password: undefined })
        .set('Authorization', `Bearer ${superAdminToken}`)
        .then(res => {
          const { message, error } = res.body;
          expect(message).toMatch(/Validation error/);
          expect(Object.keys(error)).toEqual(
            expect.arrayContaining(['password'])
          );
          done();
        });
    });

    it('should not create admin with a short password', done => {
      return request
        .post('/api/v1/admins')
        .send({ ...admin, password: '123' })
        .set('Authorization', `Bearer ${superAdminToken}`)
        .then(res => {
          const { message, error } = res.body;
          expect(message).toMatch(/Validation error/);
          expect(Object.keys(error)).toEqual(
            expect.arrayContaining(['password'])
          );
          expect(error.password).toMatch(
            /Password should have minimum of 6 characters/
          );
          done();
        });
    });
  });

  describe('Admin authentication', () => {
    it('should authenticate admin successfully', done => {
      return request
        .post('/api/v1/admins/auth')
        .send(admin)
        .then(res => {
          const { message, token } = res.body;
          authToken = token;
          expect(res.status).toEqual(200);
          expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(['message', 'token'])
          );
          expect(message).toEqual('Success');
          done();
        });
    });
    it('should not authenticate admin on invalid username', done => {
      return request
        .post('/api/v1/admins/auth')
        .send({ ...admin, email: 'hello@me.com' })
        .then(res => {
          const { error } = res.body;
          expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(['error'])
          );
          expect(res.status).toEqual(400);
          expect(error.message).toEqual(`Invalid email/password`);
          done();
        });
    });

    it('should should not authenticate admin on invalid password', done => {
      return request
        .post('/api/v1/admins/auth')
        .send({ ...admin, password: 'damn@password' })
        .then(res => {
          const { error } = res.body;
          expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(['error'])
          );
          expect(res.status).toEqual(400);
          expect(error.message).toEqual(`Invalid email/password`);
          done();
        });
    });
    it('should return validation error', done => {
      return request
        .post('/api/v1/admins/auth')
        .send({})
        .then(res => {
          const { message, error } = res.body;

          expect(res.status).toEqual(400);
          expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(['message', 'error'])
          );
          expect(message).toMatch(/Validation error/);
          expect(error).toEqual(
            expect.objectContaining({ email: 'Email is required' })
          );
          done();
        });
    });

    it('should return current user', done => {
      return request
        .get('/api/v1/current')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .then(res => {
          const { message, data } = res.body;
          expect(res.status).toEqual(200);
          expect(message).toMatch(/Success/);
          expect(Object.keys(data)).toEqual(
            expect.arrayContaining(adminAttributes)
          );
          expect(Object.keys(data)).toEqual(
            expect.not.arrayContaining(['password'])
          );
          done();
        });
    });

    it('should not return current user without token', done => {
      return request
        .get('/api/v1/current')
        .set('Accept', 'application/json')
        .then(res => {
          expect(res.status).toEqual(401);
          expect(res.body).toEqual(
            expect.objectContaining({ error: 'User not authorized' })
          );
          done();
        });
    });
  });

  describe('Find Admin', () => {
    it('should return unauthorized error', done => {
      return request
        .get(`/api/v1/admins/${adminId}`)
        .set('Accept', 'application/json')
        .then(res => {
          expect(res.status).toEqual(401);
          expect(res.body).toEqual(
            expect.objectContaining({ error: 'User not authorized' })
          );
          done();
        });
    });

    test('should should find one admin', done => {
      return get(`/admins/${adminId}`).then(res => {
        const { message, data } = res.body;
        expect(res.status).toEqual(200);
        expect(message).toMatch(/Success/);
        expect(Object.keys(data)).toEqual(
          expect.arrayContaining(adminAttributes)
        );
        expect(Object.keys(data)).toEqual(
          expect.not.arrayContaining(['password'])
        );
        done();
      });
    });

    test('should return not found', done => {
      return get('/admins/f4d40af8-b73d-4715-bc7c-5513588a3560').then(res => {
        expect(res.status).toEqual(404);
        expect(res.body).toEqual(
          expect.objectContaining({ error: 'Record not found' })
        );
        done();
      });
    });

    test('should invalid id error', done => {
      return get('/admins/f4d40af8-b73dalkjdflkaj3560').then(res => {
        expect(res.status).toEqual(400);
        expect(Object.keys(res.body)).toEqual(
          expect.arrayContaining(['error'])
        );
        done();
      });
    });

    test('should find all admins', done => {
      return get('/admins').then(res => {
        const { message, data } = res.body;
        expect(res.status).toEqual(200);
        expect(message).toMatch(/Success/);
        expect(data).toEqual(expect.arrayContaining([]));
        done();
      });
    });

    test('should find all admins', done => {
      return get(`/admins?type=accountant`).then(res => {
        const { message, data } = res.body;
        expect(res.status).toEqual(200);
        expect(message).toMatch(/Success/);
        expect(data.length >= 1).toBeTruthy();
        done();
      });
    });
  });
});
