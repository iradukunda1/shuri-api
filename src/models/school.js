module.exports = (sequelize, DataTypes) => {
  const School = sequelize.define(
    'School',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        unique: true
      },
      province: DataTypes.STRING,
      district: DataTypes.STRING,
      sector: DataTypes.STRING,
      cell: DataTypes.STRING
    },
    {
      tableName: 'Schools'
    }
  );
  School.associate = _models => {};
  return School;
};
