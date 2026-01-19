import Category from "../models/Category.js"
import { validate } from "../validation/validate.js"
import { categoryValidation } from "../validation/category-validation.js"

export const getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find()
        return res.status(200).json({
            data: categories,
            message: "Success get data categories",
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed get data categories"
        })
    }
}

export const getCategoryByType = async (req, res) => {
    try {
        
        const { type } = req.params

        if(!["pemasukan","pengeluaran"].includes(type)){
            res.status(500).json({
                message: "Wrong type btw"
            })
        }

        const categoryByType = await Category.find({type: type}).exec()
        return res.status(200).json({
            data: categoryByType,
            message: "Success get category " + type
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed get data category " + type
        })
    }
}

// receive name, type:enum["pemasukan","pengeluaran"]
export const createCategory = async (req, res) => {
    try {

        const validated = validate(categoryValidation, req.body)

        const newCategory = new Category(validated)    

        await newCategory.save()

        return res.status(201).json({
            data: newCategory ,
            message: "Success create category"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed create category, " + error?.message?.replace("\"","").replace("\"","")
        })
    }
}

export const findAndUpdate = async (req, res) => {
    
    try {
        const { id } = req.params
        const validated = validate(categoryValidation, req.body)

        const category = await Category.findByIdAndUpdate(id, validated)

        return res.status(200).json({
            data: category,
            message: "Success update category"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed update category, " + error?.message?.replace("\"","").replace("\"","")
        })
    }
}

export const findAndDelete = async (req, res) => {
    try {
        const { id } = req.params
        await Category.findByIdAndDelete(id)
        return res.status(200).json({
            message: "Success delete category"
        })
    } catch (error) {
        return re.status(500).json({
            message: "Failed delete category" + error?.message?.replace("\"","").replace("\"","")
        })
    }
}