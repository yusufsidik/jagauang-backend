import Category from "../../models/Category.js"
import { validate } from "../../validation/validate.js"
import { categoryValidation } from "../../validation/category-validation.js"

export const allCategoryService = async () => {
    return await Category.find()
}

export const getCategoryByTypeService = async (type, res) => {
    if(!["pemasukan","pengeluaran"].includes(type)){
        return res.status(500).json({
            message: "Wrong type btw"
        })
    }
    const category = await Category.find({type: type}).exec()
    return category
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