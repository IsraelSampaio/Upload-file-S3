import { Request, Response } from 'express'

import Post from '../models/Post'

interface RequestPost extends Request{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    file?:Record<string, any>
}

class PostController {
  public async store (req:RequestPost, res:Response):Promise<Response> {
    const { originalname: name, size, key, location: url = '' } = req.file

    const post = await Post.create({ name, size, key, url })

    return res.json({ post })
  }

  public async index (req:RequestPost, res:Response):Promise<Response> {
    const posts = await Post.find()

    return res.json({ posts })
  }

  public async delete (req:RequestPost, res:Response):Promise<Response> {
    const post = await Post.findById(req.params.id)

    await post.remove()

    return res.json({ status: true })
  }
}

export default new PostController()
