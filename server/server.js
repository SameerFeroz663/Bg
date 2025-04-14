import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
import serverless from 'serverless-http'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.send("API Working"))

try {
  await connectDB()
} catch (err) {
  console.error("DB connection failed. Exiting.")
  process.exit(1)
}

export default serverless(app)
