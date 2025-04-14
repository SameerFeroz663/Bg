import express from 'express'
import serverless from 'serverless-http'
import connectDB from '../configs/mongodb.js'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

let isConnected = false

app.use(async (req, res, next) => {
  if (!isConnected) {
    try {
      await connectDB()
      isConnected = true
    } catch (err) {
      console.error("DB connection failed:", err)
      return res.status(500).json({ error: "Database connection failed" })
    }
  }
  next()
})

app.get('/', (req, res) => {
  res.status(200).json({ message: "API is working 🎉" })
})

// Always export a serverless-wrapped app
export default serverless(app)
