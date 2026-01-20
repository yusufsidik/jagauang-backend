import express from 'express'
import { cacheMiddleware } from '../middlewares/cache.middleware.js'
import { clearCache } from '../middlewares/clear-cache.middleware.js'
import { apiLimiter, writeLimiter } from '../middlewares/rate-limit.middleware.js'

import { 
    getAllTransaction, 
    createTransaction,
    findAndUpdate,
    deleteTransaction,
    getTransactionsByDate
} from '../controller/transaction-controller.js'

const router = express.Router()
const TRANSACTION_CACHE_KEY = 'transaction:all'
const TRANSACTION_BY_DATE_CACHE_KEY = 'transaction:date'

// get all transaction
router.get('/', 
    apiLimiter,
    cacheMiddleware(TRANSACTION_CACHE_KEY),
    getAllTransaction
)

// get data transaction by date
router.get('/date', 
    apiLimiter,
    // cacheMiddleware(TRANSACTION_BY_DATE_CACHE_KEY),
    getTransactionsByDate
)

// create transaction
router.post('/', 
    writeLimiter,
    clearCache([
        TRANSACTION_CACHE_KEY, 
        TRANSACTION_BY_DATE_CACHE_KEY
    ]),
    createTransaction
)

// update transaction
router.put('/:id', 
    writeLimiter,
    clearCache([
        TRANSACTION_CACHE_KEY, 
        TRANSACTION_BY_DATE_CACHE_KEY
    ]),
    findAndUpdate
)

// delete transaction
router.delete('/:id', 
    writeLimiter,
    clearCache([
        TRANSACTION_CACHE_KEY, 
        TRANSACTION_BY_DATE_CACHE_KEY
    ]),
    deleteTransaction
)

export default router