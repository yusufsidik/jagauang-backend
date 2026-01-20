import Transaction  from "../models/Transaction.js"
import { validate } from "../validation/validate.js"
import { transactionValidation } from '../validation/transaction-validation.js'
import getDateRange from "../services/getDateRange.js"

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

export const getTransactionsByDate = async (req, res) => {
  try {

    const { startDate, endDate } = req.query
    const { start, end } = getDateRange(startDate, endDate)
    console.log(start, end)
    const transactionsByDate = await Transaction.aggregate([
      {
        $match: {
          date: {
            $gte: start,
            $lte: end
          }
        }
      },

      // Join category
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

      // category array → object
      { $unwind: '$category' },

      // Format date (group per hari)
      {
        $addFields: {
          formattedDate: {
            $dateToString: {
              format: '%d-%m-%Y',
              date: '$date'
            }
          }
        }
      },

      // Group by tanggal
      {
        $group: {
          _id: '$formattedDate',
          transactions: {
            $push: {
              name: '$category.name',
              type: '$category.type',
              sub_total: '$sub_total',
              information: '$information'
            }
          }
        }
      },

      // Rapikan output
      {
        $project: {
          _id: 0,
          date: '$_id',
          transactions: 1
        }
      },

      // Urutkan tanggal (terbaru dulu)
      { $sort: { date: 1 } }
    ])  

    return res.status(200).json({
      data: transactionsByDate,
      message: "Success get data transaction by date"
    })
  } catch (error) {
    return res.status(500).json({
      message: "Failed get data transaction by date" + error
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

