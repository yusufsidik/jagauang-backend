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
import getDateRange from '../services/transaction/getDateRange.js'

const router = express.Router()

// get all transaction
router.get('/', 
    apiLimiter,
    cacheMiddleware(req => {
        return `transaction:page=${req.query.page || 1}:limit=${req.query.limit || 10}`
    }),
    getAllTransaction
)

// get data transaction by date
router.get('/date', 
    apiLimiter,
    cacheMiddleware(req => {
        const {start, end} = getDateRange(req.query.startDate, req.query.endDate)
        return `transaction-date:start=${start.toISOString()}:end=${end.toISOString()}:page=${req.query.page || 1}:limit=${req.query.limit || 10}`
    }),
    getTransactionsByDate
)

// create transaction
router.post('/', 
    writeLimiter,
    clearCache("transaction:"),
    clearCache("transaction-date:"),
    createTransaction
)

// update transaction
router.put('/:id', 
    writeLimiter,
    clearCache("transaction:"),
    clearCache("transaction-date:"),
    findAndUpdate
)

// delete transaction
router.delete('/:id', 
    writeLimiter,
    clearCache("transaction:"),
    clearCache("transaction-date:"),
    deleteTransaction
)

export default router