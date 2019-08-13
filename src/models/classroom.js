module.exports = (sequelize, DataTypes) => {
  const Classroom = sequelize.define(
    'Classroom',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false
      },
      avatar: {
        type: DataTypes.STRING
      },
      schoolId: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {}
  );
  Classroom.associate = models => {
    Classroom.belongsTo(models.School, {
      foreignKey: 'schoolId',
      as: 'school'
    });
    Classroom.hasOne(models.User, {
      foreignKey: 'classroomId',
      as: 'teacher'
    });
  };
  return Classroom;
};
