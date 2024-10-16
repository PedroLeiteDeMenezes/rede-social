import express from 'express'
import dotenv from 'dotenv'

import UserRoute from './src/routes/userRoute'
import TokenRoute from './src/routes/tokenRoute'
import PostRoute from './src/routes/postRoute'
import LikeRoute from './src/routes/likeRoute'
import ComentRoute from './src/routes/commentRoute'
dotenv.config();

import './src/database/databaseDependency'

class App {
  constructor(){
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.app.use(express.urlencoded({ extended:true }));
    this.app.use(express.json())
  }

  routes(){
    this.app.use('/user', UserRoute)
    this.app.use('/tokens', TokenRoute)
    this.app.use('/like', LikeRoute)
    this.app.use('/post', PostRoute)
    this.app.use('/comment', ComentRoute)
  }
}

export default new App().app