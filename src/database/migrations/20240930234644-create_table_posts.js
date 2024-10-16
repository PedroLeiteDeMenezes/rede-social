'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('posts', { 
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_id:{
      type: Sequelize.INTEGER,
      allowNull: false,
      references:{
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    content:{
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    likes_count:{
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    comments_count:{
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW, // Define a data de criação
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW, // Define a data de atualização
    }
  });
     
  },

  async down (queryInterface) {
    return queryInterface.dropTable('posts');
  }
};
