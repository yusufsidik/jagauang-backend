import { Category } from "../models/Category.js"

const categories = [
    {
        id: 1,
        title: "Makan siang",
        jenis: "keluar"
    },
    {
        id: 2,
        title: "Gaji",
        jenis: "masuk"
    }
]



export const getAllCategory = async (req, res) => {
    try {

        // const categories = new Category()

        // await categories.

        res.status(200).json({
            data: categories,
            message: "Success get data categories"
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed get data categories"
        })
    }
}

export const createCategory = async (req, res) => {
    try {
        const newCategory = new Category(req.body)    
        await newCategory.save()

        res.status(201).json({
            data: newCategory ,
            message: "Succes create category"
        })
    } catch (error) {
        res.status(500).json({
            message: "Faile create category"
        })
    }
}