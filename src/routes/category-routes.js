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

const router = express.Router()
const CATEGORY_CACHE_KEY="category:all"

router.get("/", 
    cacheMiddleware(CATEGORY_CACHE_KEY), 
    getAllCategory
)

router.post("/", 
    clearCache([CATEGORY_CACHE_KEY]), 
    createCategory
)

router.get("/:type", getCategoryByType) // type ["pemasukan","pengeluaran"]

router.delete("/:id", 
    clearCache([CATEGORY_CACHE_KEY]),
    findAndDelete
)

router.put("/:id", 
    clearCache([CATEGORY_CACHE_KEY]),
    findAndUpdate
)

export default router