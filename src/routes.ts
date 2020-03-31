import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'

import PostController from './controllers/PostController'

const routes = Router()

routes.get('/posts', PostController.index)
routes.post('/posts', multer(multerConfig).single('file'), PostController.store)
routes.delete('/posts/:id', PostController.delete)

export default routes
