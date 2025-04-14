import mongoose from "mongoose"

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB connected")
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/bg-removal`)
  } catch (error) {
    console.error("❌ MongoDB connection error:", error)
    throw error // let Vercel show the crash if needed
  }
}

export default connectDB
