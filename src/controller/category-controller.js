import { 
    allCategoryService,
    getCategoryByTypeService,
    createCategoyService,
    findAndUpdateService,
    findAndDeleteService
} from "../services/category/category-service.js"
import logger from "../utils/logger.js"

export const getAllCategory = async (req, res) => {
    try {
        const {success, meta, data} = await allCategoryService(req)
        return res.status(200).json({
            success,
            meta,
            data,
            message: "Success get data categories",
        })
    } catch (error) {
        logger.error(error, "getAllCategory failed")
        return res.status(500).json({
            message: "Failed get data categories"
        })
    }
}

export const getCategoryByType = async (req, res) => {
    try {
        const { type } = req.params
        const categoryByType = await getCategoryByTypeService(type, res)
        return res.status(200).json({
            data: categoryByType,
            message: `Success get category ${type}`
        })
    } catch (error) {
        logger.error(error, "getCategoryByType failed")
        return res.status(500).json({
            message: `Failed get data category ${type}, ${error?.message?.replace("\"","").replace("\"","")}`
        })
    }
}

export const createCategory = async (req, res) => {
    try {
        const newCategory = await createCategoyService(req)
        return res.status(201).json({
            data: newCategory ,
            message: "Success create category"
        })
    } catch (error) {
        logger.error(error, "createCategory failed")
        return res.status(500).json({
            message: "Failed create category, " + error?.message?.replace("\"","").replace("\"","")
        })
    }
}

export const findAndUpdate = async (req, res) => {
    try {
        const category = await findAndUpdateService(req)
        return res.status(200).json({
            data: category,
            message: "Success update category"
        })
    } catch (error) {
        logger.error(error, "findAndUpdate failed")
        return res.status(500).json({
            message: "Failed update category, " + error?.message?.replace("\"","").replace("\"","")
        })
    }
}

export const findAndDelete = async (req, res) => {
    try {
        await findAndDeleteService(req)
        return res.status(200).json({
            message: "Success delete category"
        })
    } catch (error) {
        logger.error(error, "findAndDelete failed")
        return re.status(500).json({
            message: "Failed delete category" + error?.message?.replace("\"","").replace("\"","")
        })
    }
}