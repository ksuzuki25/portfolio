import { get, post } from '@/api/list'
import * as express from 'express'
const router = express.Router()

router.get('/', get)
router.post('/', post)

export const listRouter = router
