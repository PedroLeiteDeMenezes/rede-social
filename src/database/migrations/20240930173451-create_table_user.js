module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER, // Corrigido de INTERGER para INTEGER
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      first_name:{
        type: Sequelize.STRING(40)
      },
      last_name:{
        type: Sequelize.STRING(40)
      },
      email:{
        type:Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      date_of_birth:{
        type: Sequelize.DATE,
        allowNull: false
      },
      password_hash:{
        type: Sequelize.STRING(255),
        allowNull: false
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('users');
  },
};
