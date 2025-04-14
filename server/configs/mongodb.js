import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log("MongoDB connected")
  } catch (err) {
    console.error("MongoDB connection error:", err)
    throw err
  }
}

if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables")
  }

export default connectDB
