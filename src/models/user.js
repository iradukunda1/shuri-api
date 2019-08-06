import bcrypt from '../utils/bcrypt';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phoneNumber: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type: {
        /**
         * TM: transport manager
         * DOD: director of discipline
         * PRINCIPAL: school admin or general manager
         */
        type: DataTypes.ENUM('TM', 'DOD', 'PRINCIPAL'),
        defaultValue: 'TM'
      }
    },
    {
      tableName: 'Users'
    }
  );
  User.beforeCreate((user, _options) => bcrypt(user));
  User.associate = models => {
    User.belongsTo(models.School, {
      foreignKey: 'schoolId',
      hooks: true
    });
  };
  return User;
};
