module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SchoolCompanyPartnerships', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      schoolId: {
        type: Sequelize.UUID
      },
      companyId: {
        type: Sequelize.UUID
      },
      status: {
        type: Sequelize.ENUM('approved', 'pending', 'rejected'),
        defaultValue: 'pending'
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
    return queryInterface.dropTable('SchoolCompanyPartnerships');
  }
};
