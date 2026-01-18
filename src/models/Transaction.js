import mongoose, { Schema } from "mongoose"; 

const transactionSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    index: true
  },
  sub_total: {
    type: Number,
    required: true
  },
  information: {
    type: String,
    required: false
  }
})

const Transaction = mongoose.model('Transaction', transactionSchema)

export default Transaction

