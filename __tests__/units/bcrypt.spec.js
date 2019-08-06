import bcrypt from '../../src/utils/bcrypt';

const user = {
  password: 'password',
  username: 'luc',
  setDataValue(key, password) {
    this.password = password;
    return this;
  }
};

describe('Password Bcrypt', () => {
  it('should should generate a encrypted password', done => {
    jest.spyOn(user, 'setDataValue');
    return bcrypt(user).then(res => {
      expect(res.password).not.toMatch(/password/);
      expect(user.setDataValue).toBeCalledWith('password', user.password);
      done();
    });
  });

  it('should should through en error on password bcrypt error', done => {
    return bcrypt({ ...user, password: undefined }).then(res => {
      expect(res.message).toMatch(/data and salt arguments required/);
      done();
    });
  });
});
