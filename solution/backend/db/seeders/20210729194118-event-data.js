'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
  */
    return queryInterface.bulkInsert('Events', [{
      title: 'a/A March 2021 Graduation',
      max_guests: 100,
      location: 'Main Zoom Room',
      date: '08/27/21',
      time: '5:00pm pst',
      description: 'Bring your own food and drinks. This will be an online event.'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      */
    return queryInterface.bulkDelete('Events', null, {});
  }
};
