module.exports = (sequelize, DataTypes) => {
  const BusDriver = sequelize.define(
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
      },
      companyId: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },

    {
      tableName: 'BusDrivers'
    }
  );
  return BusDriver;
};
