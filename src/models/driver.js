/* eslint-disable func-names */
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const { BCRYPT_SALT_FACTOR } = process.env;

module.exports = (sequelize, DataTypes) => {
  const Driver = sequelize.define(
    'Driver',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'Drivers'
    }
  );
  Driver.beforeCreate((driver, _options) => {
    return bcrypt
      .hash(driver.password, parseInt(BCRYPT_SALT_FACTOR, 10))
      .then(hash => {
        driver.setDataValue('password', hash);
      })
      .catch(err => {
        throw new Error(err);
      });
  });
  Driver.findById = async function(id, options) {
    const data = await this.findByPk(id, options);
    if (!data) {
      throw Error('Record not found');
    }
    return data;
  };

  Driver.associate = models => {
    Driver.belongsTo(models.BusCompany, {
      foreignKey: 'busCompanyId',
      hooks: true
    });
  };
  return Driver;
};
