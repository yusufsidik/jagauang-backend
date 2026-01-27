import Transaction  from "../../models/Transaction.js"
import getDateRange from "./getDateRange.js"
import { validate } from "../../validation/validate.js"
import { transactionValidation } from "../../validation/transaction-validation.js"

export const allTransactionsService = async (req) => {
  const page = Number(req.query?.page) || 1
  const limit = Number(req.query?.limit) || 10
  const start = (page - 1) * limit
  const end = page * limit

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

  const paginated = transactions.slice(start, end)

  return {
    success: true,
    meta: {
      page,
      limit,
      total: transactions.length,
      totalpages: Math.ceil(transactions.length / limit)
    },
    data: paginated
  }
} 

export const transactionByDateService = async (req) => {
  
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const startPagination = (page - 1) * limit
  const endPagination = page * limit

  const { startDate, endDate } = req.query
  const { start, end } = getDateRange(startDate, endDate)

  const transactionsByDate =  await Transaction.aggregate([
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

  const paginated = transactionsByDate.slice(startPagination, endPagination)

  return {
    success: true,
    meta: {
      page,
      limit,
      total: transactionsByDate.length,
      totalpages: Math.ceil(transactionsByDate.length / limit)
    },
    data: paginated
  }
}

export const createTransactionService = async (body) => {
  const validated = validate(transactionValidation, body)
  const newTransaction = new Transaction(validated)
  await newTransaction.save()
  return newTransaction
}

export const findAndUpdateService = async (req) => {
  const { id } = req.params
  const validated = validate(transactionValidation, req.body)
  await Transaction.findByIdAndUpdate(id, validated)
  return validated
}

export const deleteTransactionService = async (req) => {
  const { id } = req.params
  await Transaction.findByIdAndDelete(id)
}

