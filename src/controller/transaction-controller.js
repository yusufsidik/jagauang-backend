import { 
  allTransactionsService,
  transactionByDateService,
  createTransactionService,
  findAndUpdateService,
  deleteTransactionService
} from "../services/transaction/transaction-service.js"

export const getAllTransaction = async (req, res) => {
  try {
    const result = await allTransactionsService()
    return res.status(200).json({
      data: result,
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
    const result = await transactionByDateService(req.query)
    return res.status(200).json({
      data: result,
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
    const newTransaction = await createTransactionService(req.body)
    
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
    const updateTransaction = await findAndUpdateService(req)
    return res.status(201).json({
      data: updateTransaction,
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
    await deleteTransactionService(req)
    return res.status(200).json({
      message: "Success delete transaction"
    })
  } catch (error) {
    return res.status(500).json({
      message: "Failed delete transaction " + error?.message?.replace("\"","").replace("\"","")
    })
  }
}

