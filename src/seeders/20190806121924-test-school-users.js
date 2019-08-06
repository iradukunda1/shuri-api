module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          id: '36e46bea-3f99-44ee-a610-23e7a997a641',
          email: 'principal@school.org',
          password:
            '$2b$10$CzfqN8d7S0hhrsMceldTO.Cv9Zxey2Ibd3U6Nmh95NSPyva5z.jeW',
          type: 'PRINCIPAL',
          schoolId: '36e46bea-3f99-44ee-a610-23e7a997c678',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
