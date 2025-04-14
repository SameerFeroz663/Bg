/*import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'


// App Config
const PORT = process.env.PORT || 4000
const app = express()
await connectDB()

// Initialize Middlewares
app.use(express.json())
app.use(cors())

// API route
app.get('/',(req,res)=> res.send("API Working"))

app.listen(PORT, ()=> console.log("Server Running on port "+PORT))*/
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
import serverless from 'serverless-http'

// App Config
const app = express()

// Middleware
app.use(express.json())
app.use(cors())

// Routes
app.get('/', (req, res) => res.send("API Working"))

// Connect to DB
;(async () => {
    try{
    await connectDB()
  } catch (err) {
    console.error("Failed to connect DB", err)
  }
  })()
  

// Export handler for Vercel
export const handler = serverless(app)

// Optional local dev
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 4000
    app.listen(PORT, () => {
      console.log("Local server running on port", PORT)
    })
  }
  
