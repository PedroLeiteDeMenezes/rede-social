import Sequelize, { Model } from 'sequelize'

export default class Comments extends Model{
  static init(sequelize){
    super.init({
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
      post_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'posts',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      content:{
        type: Sequelize.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
      tableName: 'comments',
      timestamps: true,
      underscored: true
    })
  }

  static associate(models){
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
    this.belongsTo(models.Post, {
      foreignKey: 'post_id',
      as: 'post'
    });
  }
}

