import Category from "../../models/Category.js"
import { validate } from "../../validation/validate.js"
import { categoryValidation } from "../../validation/category-validation.js"

export const allCategoryService = async (req) => {
    const page = Number(req.query?.page) || 1
    const limit = Number(req.query?.limit) || 10
    const start = (page - 1) * limit
    const end = page * limit

    const categories = await Category.find()

    const paginated = categories.slice(start, end)

    return {
        success: true,
        meta: {
            page,
            limit,
            total: categories.length,
            totalpages: Math.ceil(categories.length / limit)
        },
        data: paginated
    }
}

export const getCategoryByTypeService = async (type, res) => {
    if(!["pemasukan","pengeluaran"].includes(type)){
        return res.status(500).json({
            message: "Wrong URL"
        })
    }
    return await Category.find({type: type}).exec()
    // return category
}

export const createCategoyService = async (req) => {
    const validated = validate(categoryValidation, req.body)
    const newCategory = new Category(validated)    
    await newCategory.save()
    return newCategory
}

export const findAndUpdateService = async (req) => {
    const { id } = req.params
    const validated = validate(categoryValidation, req.body)
    await Category.findByIdAndUpdate(id, validated)
    return validated
}

export const findAndDeleteService = async (req) => {
    const { id } = req.params
    await Category.findByIdAndDelete(id)
}