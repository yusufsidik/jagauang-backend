import express from 'express'
import "dotenv/config"
import { connectDB } from './config/database.js'
import categoryRouter from './routes/category-routes.js'

const PORT = process.env.PORT
const app = express()

// middleware
app.use(express.json())

// routes
app.use("/api/category", categoryRouter)

connectDB()



app.listen(PORT, () => {
    console.log(`App running on port : ${PORT}`)
})