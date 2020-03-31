import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import bodyParse from 'body-parser'
import path from 'path'
import dotenv from 'dotenv'

import routes from './routes'

class App {
    public express: express.Application

    public constructor () {
      this.express = express()

      dotenv.config()
      this.middleware()
      this.database()
      this.routes()
    }

    private middleware (): void{
      this.express.use(express.json())
      this.express.use(bodyParse.urlencoded({ extended: true }))
      this.express.use(morgan('dev'))
      this.express.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))
    }

    private database ():void{
      mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true
      })
    }

    private routes ():void{
      this.express.use(routes)
    }
}

export default new App().express
