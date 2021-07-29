'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      */

   return queryInterface.bulkInsert('Foodlists', [{
     eventId: 1,
     type: 'Beverage',
     description: 'Beer'
   }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      */

   return queryInterface.bulkDelete('Foodlists', null, {});
  }
};
