module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('BusCompanies', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
       password: {
        type: Sequelize.STRING
      },
      phoneNumber:{
        type: Sequelize.STRING,
        unique: true
      },
      district: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
     description:{
       type: Sequelize.STRING(250),
     },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('BusCompanies');
  }
};
