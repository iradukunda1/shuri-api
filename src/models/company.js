import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const { BCRYPT_SALT_FACTOR } = process.env;
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    'Company',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'Companies',
      hooks: {
        beforeCreate(company, _options) {
          if (!company.changed('password')) {
            return sequelize.Promise.reject('not modified');
          }
          return bcrypt
            .hash(company.password, BCRYPT_SALT_FACTOR)
            .then(hash => {
              company.setDataValue('password', hash);
            })
            .catch(err => {
              return sequelize.Promise.reject(err);
            });
        }
      }
    }
  );
  Company.associate = _models => {};
  return Company;
};
