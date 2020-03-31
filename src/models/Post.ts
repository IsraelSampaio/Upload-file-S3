import { Schema, model, Document } from 'mongoose'
import aws from 'aws-sdk'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

const s3 = new aws.S3()

interface PostInterface extends Document{
    name?:string,
    size?:number,
    key?:string,
    url?:string
}

const PostSchema = new Schema({
  name: String,
  size: Number,
  key: String,
  url: String
}, {
  timestamps: true
})

PostSchema.pre<PostInterface>('save', function ():void{
  if (!this.url) this.url = `${process.env.APP_URL}/files/${this.key}`
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
PostSchema.pre<PostInterface>('remove', function ():Promise<any> {
  if (process.env.STORAGE_TYPE === 's3') {
    return s3.deleteObject({
      Bucket: process.env.BUCKET,
      Key: this.key
    }).promise()
  } else {
    return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key))
  }
})

export default model<PostInterface>('Post', PostSchema)
