import express from 'express'
import serverless from 'serverless-http'
import connectDB from '../configs/mongodb.js'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is working' })
})

let isConnected = false

// Connect to DB once per cold start
app.use(async (req, res, next) => {
  if (!isConnected) {
    try {
      await connectDB()
      isConnected = true
    } catch (err) {
      return res.status(500).json({ error: "DB connection failed" })
    }
  }
  next()
})

export default serverless(app)
