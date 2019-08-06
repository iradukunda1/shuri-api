module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert(
      'Admins',
      [
        {
          id: '36e46bea-3f99-44ee-a610-23e7a997a641',
          username: 'admin-1',
          password:
            '$2b$10$CzfqN8d7S0hhrsMceldTO.Cv9Zxey2Ibd3U6Nmh95NSPyva5z.jeW',
          type: 'general',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'f4d40af8-b73d-4715-bc7d-5513588a3560',
          username: 'admin-2',
          password:
            '$2b$10$CzfqN8d7S0hhrsMceldTO.Cv9Zxey2Ibd3U6Nmh95NSPyva5z.jeW',
          type: 'accountant',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('Admins', null, {});
  }
};
