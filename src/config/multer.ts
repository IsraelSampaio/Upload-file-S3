import multer from 'multer'
import path from 'path'
import crypto from 'crypto'
import multerS3 from 'multer-s3'
import awsSdk from 'aws-sdk'
import dotenv from 'dotenv'

dotenv.config()
const storage = process.env.STORAGE_TYPE
const bucket = process.env.BUCKET

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, res, cb):void => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
    },
    filename: (req, file, cb):void => {
      crypto.randomBytes(16, (err, hash):void => {
        if (err) cb(err)

        file.key = `${hash.toString('hex')}-${file.originalname}`

        cb(null, file.key)
      })
    }
  }),
  s3: multerS3({
    s3: new awsSdk.S3(),
    bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb):void => {
      crypto.randomBytes(16, (err, hash):void => {
        if (err) cb(err)

        const filename:string = `${hash.toString('hex')}-${file.originalname}`

        cb(null, filename)
      })
    }
  })
}

const config = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: storageTypes[storage],
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, cb):void => {
    const allowedMimes: string[] = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif']

    if (allowedMimes.includes(file.mimetype)) cb(null, true)
    else cb(new Error('Tipo de arquivo inválido'))
  }
}

export default config
