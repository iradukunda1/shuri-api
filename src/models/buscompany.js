import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const { BCRYPT_SALT_FACTOR } = process.env;
module.exports = (sequelize, DataTypes) => {
  const BusCompany = sequelize.define(
    'BusCompany',
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
      tableName: 'BusCompanies'
    }
  );
  BusCompany.beforeSave((company, _options) => {
    return bcrypt
      .hash(company.password, parseInt(BCRYPT_SALT_FACTOR, 10))
      .then(hash => {
        company.setDataValue('password', hash);
      })
      .catch(err => {
        throw new Error(err);
      });
  });
  BusCompany.associate = models => {
    BusCompany.hasMany(models.Driver, {
      as: 'drivers',
      onDelete: 'CASCADE',
      foreignKey: 'busCompanyId'
    });

    BusCompany.hasMany(models.Bus, {
      as: 'buses',
      onDelete: 'CASCADE',
      foreignKey: 'busCompanyId'
    });
  };

  return BusCompany;
};
