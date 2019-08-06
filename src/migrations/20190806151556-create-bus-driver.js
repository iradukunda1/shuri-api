module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('BusDrivers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      busId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      driverId: {
        type: Sequelize.UUID,
        allowNull: false
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
    return queryInterface.dropTable('BusDrivers');
  }
};
