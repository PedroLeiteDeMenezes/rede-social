import Sequelize, { Model } from 'sequelize'
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize){
    super.init({
      first_name: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      last_name:{
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      email:{
        type: Sequelize.STRING(100),
        allowNull:false,
        unique: true,
        validate:{
          isEmail:true
        },
      },
      password_hash:{
        type: Sequelize.STRING(255)
      },
      password:{
        type: Sequelize.VIRTUAL,
        validate: {
          len: [6,50]
        }
      },
      date_of_birth:{
        type: Sequelize.DATE,
        allowNull: false
      },
      image:{
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      }
    },{
      sequelize,
    })
    
  this.addHook('beforeSave', async user => {
    if(user.password){
      user.password_hash = await bcryptjs.hash(user.password, 10)  
    }
  })
    return this
  }


  passwordIsValid(password){
    return bcryptjs.compare(password, this.password_hash)
  }

  static associate(models){
    this.hasMany(models.Post, {
      foreignKey: 'user_id',
      as: 'posts'
    })
    this.belongsTo(models.Comments,{
      foreignKey: 'user_id',
      as: 'comments'
    })
  }
}