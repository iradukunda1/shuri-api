/* eslint-disable func-names */
module.exports = (sequelize, DataTypes) => {
  const Bus = sequelize.define(
    'Bus',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      model: DataTypes.STRING,
      plateNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      tableName: 'Buses'
    }
  );
  Bus.findById = async function(id, options) {
    const data = await this.findByPk(id, options);
    if (!data) {
      throw new Error('Record not found');
    }
    return data;
  };
  return Bus;
};
