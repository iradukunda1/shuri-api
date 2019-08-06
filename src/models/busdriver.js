module.exports = (sequelize, DataTypes) => {
  const busDriver = sequelize.define(
    'BusDriver',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      busId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      driverId: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },

    {
      tableName: 'BusDrivers'
    }
  );

  return busDriver;
};
