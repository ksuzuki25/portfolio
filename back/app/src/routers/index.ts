import * as express from 'express'
import { listRouter } from './list'
const router = express.Router()

router.use('/list', listRouter)

export default router
