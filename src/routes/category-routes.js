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
const CATEGORY_CACHE_KEY="category:all"

router.get("/", 
    apiLimiter,
    cacheMiddleware(CATEGORY_CACHE_KEY), 
    getAllCategory
)

router.post("/", 
    writeLimiter,
    clearCache([CATEGORY_CACHE_KEY]), 
    createCategory
)

router.get("/:type", 
    apiLimiter,
    getCategoryByType) // type ["pemasukan","pengeluaran"]

router.delete("/:id", 
    writeLimiter,
    clearCache([CATEGORY_CACHE_KEY]),
    findAndDelete
)

router.put("/:id", 
    writeLimiter,
    clearCache([CATEGORY_CACHE_KEY]),
    findAndUpdate
)

export default router