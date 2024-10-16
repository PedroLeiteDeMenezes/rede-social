module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user', {
      id: {
        type: Sequelize.INTEGER, // Corrigido de INTERGER para INTEGER
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false
      }
      // Adicione outras colunas aqui, se necessário
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('user');
  },
};
