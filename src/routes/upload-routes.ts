import express from 'express'
import uploadImage from '../controllers/upload/upload-image'

const router = express.Router()

router.post('/api/upload', uploadImage)

export {router as uploadRoutes}