import express from 'express'
import "dotenv/config"
import { connectDB } from './config/database.js'
import categoryRouter from './routes/category-routes.js'
import transactionRouter from './routes/transaction-router.js'
import { apiLimiter } from './middlewares/rate-limit.middleware.js'

const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(apiLimiter)

// routes
app.use("/api/category", categoryRouter)
app.use("/api/transaction", transactionRouter)

// handle 404 not found
app.use((req, res, next) => {
  res.status(404).send("404 Sorry Wrong URL")
})

connectDB()



app.listen(PORT, () => {
    console.log(`App running on port : ${PORT}`)
})