import Transaction  from "../models/Transaction.js"
import { validate } from "../validation/validate.js"
import { transactionValidation } from '../validation/transaction-validation.js'

export const getAllTransaction = async (req, res) => {
  try {
    const transactions = await Transaction.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          pipeline: [
            { $project: { name: 1, type: 1, _id: 0 } }
          ],
          as: 'category'
        }
      },
      { $unwind: '$category' },
      {
        $project: {
          _id: 0,
          name: '$category.name',
          type: '$category.type',
          sub_total: 1,
          information: 1,
          date: 1
        }
      }
    ])

    return res.status(200).json({
      data: transactions,
      message: "Success get transactions"
    }) 
  } catch (error) {
    return res.status(500).json({
      message: "Failed get transactions"
    })
  }
}

export const createTransaction = async (req, res) => {
  try {
    const validated = validate(transactionValidation, req.body)

    const newTransaction = new Transaction(validated)

    await newTransaction.save()

    return res.status(201).json({
      data: newTransaction,
      message: "Success create transaction"
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Failed create transaction"
    })
  }
}

