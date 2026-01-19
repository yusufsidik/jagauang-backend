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
          _id: 1,
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
      message: "Failed get transactions" + error?.message?.replace("\"","").replace("\"","")
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
    return res.status(500).json({
      message: "Failed create transaction " + error?.message?.replace("\"","").replace("\"","")
    })
  }
}

export const findAndUpdate = async (req, res) => {
  try {
    const { id } = req.params
    const validated = validate(transactionValidation, req.body)
    await Transaction.findByIdAndUpdate(id, validated)

    return res.status(201).json({
      data: validated,
      message: "Success update transaction"
    })
  } catch (error) {
    return res.status(500).json({
      message: "Failed update transaction " + error?.message?.replace("\"","").replace("\"","")
    })
  }
}

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params
    await Transaction.findByIdAndDelete(id)
    
    return res.status(200).json({
      message: "Success delete transaction"
    })
  } catch (error) {
    return res.status(500).json({
      message: "Failed delete transaction " + error?.message?.replace("\"","").replace("\"","")
    })
  }
}

