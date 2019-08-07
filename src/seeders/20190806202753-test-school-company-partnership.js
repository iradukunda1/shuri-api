

module.exports = {
  up: (queryInterface, _Sequelize) => {
   
      return queryInterface.bulkInsert('SchoolCompanyPartnerships', [{
         id: '36e46bea-3f99-44ee-a610-23e7a997a641',
         schoolId:'36e46bea-3f99-44ee-a610-23e7a997c678',
         companyId:'36e46bea-3f99-44ee-a610-23e7a997a641',
         createdAt: new Date(),
         updatedAt: new Date()
      }], {});

  },

  down: (queryInterface, _Sequelize) => {
      return queryInterface.bulkDelete('SchoolCompanyPartnerships', null, {});
  }
};
