import express from 'express'
import { cacheMiddleware } from '../middlewares/cache.middleware.js'
import { clearCache } from '../middlewares/clear-cache.middleware.js'
import { 
    getAllTransaction, 
    createTransaction,
    findAndUpdate,
    deleteTransaction
} from '../controller/transaction-controller.js'

const router = express.Router()
const TRANSACTION_CACHE_KEY = 'transaction:all'

router.get('/', 
    cacheMiddleware(TRANSACTION_CACHE_KEY),
    getAllTransaction
)

router.post('/', 
    clearCache([TRANSACTION_CACHE_KEY]),
    createTransaction
)

router.put('/:id', 
    clearCache([TRANSACTION_CACHE_KEY]), 
    findAndUpdate
)

router.delete('/:id', 
    clearCache([TRANSACTION_CACHE_KEY]), 
    deleteTransaction
)

export default router