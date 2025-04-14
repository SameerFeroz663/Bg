import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
import serverless from 'serverless-http'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.send("API Working"))

// Only connect once
await connectDB()

// Export as default for Vercel
export default serverless(app)
