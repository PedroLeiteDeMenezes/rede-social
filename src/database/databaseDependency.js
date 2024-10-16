import Sequelize from 'sequelize'
import databaseConfig from '../config/database'
import User from '../models/user'
import Post from '../models/post'
import Like from '../models/like'
import Comments from '../models/comments'

const models = [User, Post, Like, Comments]

const connection = new Sequelize(databaseConfig)

models.forEach((model) => model.init(connection))