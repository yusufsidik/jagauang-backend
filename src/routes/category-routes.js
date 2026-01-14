import express from 'express'
import { getAllCategory, createCategory } from '../controller/category-controller.js'

const router = express.Router()

router.get("/", getAllCategory)
router.post("/", createCategory)

export default router