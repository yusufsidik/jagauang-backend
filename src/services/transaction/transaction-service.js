import Transaction  from "../../models/Transaction.js"
import getDateRange from "./getDateRange.js"
import { validate } from "../../validation/validate.js"
import { transactionValidation } from "../../validation/transaction-validation.js"
import { validateDateRange } from "./validateDateRange.js"
import { getMonthRange } from "./getMonthRange.js"

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
          { $project: { name: 1, type: 1, _id: 1 } }
          ],
          as: 'category'
        }
      },
      { $unwind: '$category' },
      {
        $project: {
          _id: 1,
          // name: '$category.name',
          // type: '$category.type',
          'category._id' : 1,
          'category.name' : 1,
          'category.type' : 1,
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

  validateDateRange(start, end)

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
            _id: '$_id',
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
    data: paginated,
    message: transactionsByDate.length == 0 ? "No Transactions on this date" : "Success get data transactions by date"
  }
}

export const transactionByMonthService = async (req, res) => {

  const { month, year } = req.query

  // validasi input bulan
  if(!month) {
    return res.status(400).json({
      message: 'month is required (1-12)'
    })
  }
  if(Number(month) > 12){
    return res.status(400).json({
      message: 'Wrong input month'
    })
  }

  const { start, end } = getMonthRange(month, year)

  const data = await Transaction.aggregate([
    {
      $match: {
        date: { $gte: start, $lte: end }
      },
    },

    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        pipeline: [
          { $project: { name: 1, type: 1, _id: 1 } }
        ],
        as: 'category'
      }
    },

    {
      $unwind: '$category'
    },

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

    {
      $group: {
        _id: '$formattedDate',
        transactions: {
          $push: {
            _id: '$category._id',
            name: '$category.name',
            type: '$category.type',
            sub_total: '$sub_total',  
            information: '$information'
          }
        }
      }
    },

    {
      $project: {
        _id: 0,
        date: '$_id',
        transactions: 1
      }
    },

    {
      $sort: { date: 1 }
    }

  ])

  return {
    success: true,
    data,
    message: data.length == 0 ? "No Transactions for this month" : "Success get data transactions by month"
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

