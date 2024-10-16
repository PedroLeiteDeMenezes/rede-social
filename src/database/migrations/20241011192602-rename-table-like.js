'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.renameTable('like', 'likes');
  },

  down: async (queryInterface) => {
    // Reverte a alteração, renomeando de volta para o nome antigo
    await queryInterface.renameTable('like', 'likes');
  }
};
