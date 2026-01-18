import express from 'express'
import { cacheMiddleware } from '../middlewares/cache.middleware.js'
import { clearCache } from '../middlewares/clear-cache.middleware.js'
import { getAllTransaction, createTransaction } from '../controller/transaction-controller.js'

const router = express.Router()
const TRANSACTION_CACHE_KEY = 'transaction:all'

router.get('/', cacheMiddleware(TRANSACTION_CACHE_KEY) ,getAllTransaction)
router.post('/', clearCache([TRANSACTION_CACHE_KEY]),  createTransaction)

export default router