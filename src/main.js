import express from 'express'
import "dotenv/config"
import { connectDB } from './config/database.js'
import { apiLimiter } from './middlewares/rate-limit.middleware.js'
import { httpLogger } from './middlewares/logger.middleware.js' 
import categoryRouter from './routes/category-routes.js'
import transactionRouter from './routes/transaction-router.js'

const PORT = process.env.PORT
const app = express()

// middlewares
app.use(express.json()) // json
app.use(httpLogger) // logging
app.use(apiLimiter) // rate limiter

// routes
app.use("/api/category", categoryRouter)
app.use("/api/transaction", transactionRouter)

// handle error 404
app.use((req, res, next) => {
  res.status(404).send("404 URL Not Found")
})

connectDB()

app.listen(PORT, () => {
  console.log(`App running on port : ${PORT}`)
})