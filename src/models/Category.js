import mongoose from "mongoose";

const enumTypeCategory = ['pengeluaran','pemasukan']
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: enumTypeCategory
    }
})


const Category = mongoose.model('Category', categorySchema)

export default Category