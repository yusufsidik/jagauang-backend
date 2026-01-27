import express from 'express'
import { 
    getAllCategory, 
    createCategory, 
    getCategoryByType,
    findAndDelete,
    findAndUpdate
} from '../controller/category-controller.js'
import { cacheMiddleware } from '../middlewares/cache.middleware.js'
import { clearCache } from '../middlewares/clear-cache.middleware.js'
import { apiLimiter, writeLimiter } from '../middlewares/rate-limit.middleware.js'

const router = express.Router()

router.get("/", 
    apiLimiter,
    cacheMiddleware(req => {
        return `category:page=${req.query.page || 1}:limit=${req.query.limit || 10}`
    }),
    getAllCategory
)

router.post("/", 
    writeLimiter,
    clearCache("category:"), 
    createCategory
)

router.get("/:type", 
    apiLimiter,
    getCategoryByType) // type ["pemasukan","pengeluaran"]

router.delete("/:id", 
    writeLimiter,
    clearCache("category:"),
    findAndDelete
)

router.put("/:id", 
    writeLimiter,
    clearCache("category:"),
    findAndUpdate
)

export default router