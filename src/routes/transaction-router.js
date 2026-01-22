import express from 'express'
import { cacheMiddleware } from '../middlewares/cache.middleware.js'
import { clearCache } from '../middlewares/clear-cache.middleware.js'
import { apiLimiter, writeLimiter } from '../middlewares/rate-limit.middleware.js'
import { clearCacheKeyTransactionDate } from '../utils/clearCacheKeyByDate.js'

import { 
    getAllTransaction, 
    createTransaction,
    findAndUpdate,
    deleteTransaction,
    getTransactionsByDate
} from '../controller/transaction-controller.js'

const router = express.Router()
const TRANSACTION_CACHE_KEY = 'transaction:all'

// get all transaction
router.get('/', 
    apiLimiter,
    cacheMiddleware(TRANSACTION_CACHE_KEY),
    getAllTransaction
)

// get data transaction by date
router.get('/date', 
    apiLimiter,
    getTransactionsByDate
)

// create transaction
router.post('/', 
    writeLimiter,
    clearCache([
        TRANSACTION_CACHE_KEY
    ]),
    (req, res, next) => {
        clearCacheKeyTransactionDate()
        next()
    },
    createTransaction
)

// update transaction
router.put('/:id', 
    writeLimiter,
    clearCache([
        TRANSACTION_CACHE_KEY
    ]),
    (req, res, next) => {
        clearCacheKeyTransactionDate()
        next()
    },
    findAndUpdate
)

// delete transaction
router.delete('/:id', 
    writeLimiter,
    clearCache([
        TRANSACTION_CACHE_KEY
    ]),
    (req, res, next) => {
        clearCacheKeyTransactionDate()
        next()
    },
    deleteTransaction
)

export default router