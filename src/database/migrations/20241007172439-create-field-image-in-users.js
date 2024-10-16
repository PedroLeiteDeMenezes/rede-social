'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'image', 
      {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      });

  },

  async down (queryInterface) {
    await queryInterface.removeColumn('users', 'image');
  }
};
