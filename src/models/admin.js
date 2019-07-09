import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const { BCRYPT_SALT_FACTOR } = process.env;
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    'Admin',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type: DataTypes.ENUM(['accountant', 'general'])
    },
    {
      tableName: 'Admins',
      hooks: {
        beforeCreate(admin, _options) {
          if (!admin.changed('password')) {
            return sequelize.Promise.reject('not modified');
          }
          return bcrypt
            .hash(admin.password, BCRYPT_SALT_FACTOR)
            .then(hash => {
              admin.setDataValue('password', hash);
            })
            .catch(err => {
              return sequelize.Promise.reject(err);
            });
        }
      }
    }
  );
  return Admin;
};
