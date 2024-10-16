import Sequelize, { Model } from 'sequelize';


export default class Post extends Model{
  static init(sequelize){
    super.init({
      user_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'users',
          key: 'id'
        },
      },
      content:{
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      likes_count:{
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      comments_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    },{
      sequelize,
      tableName: 'posts',
      timestamps: true
    }
  );
    return this
  }

  static associate(models){
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    })
    this.hasMany(models.Comments, {
      foreignKey: 'post_id',
      as: 'comments'
    });
  }
}