const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const connectToDatabase = async () => {
  const MONGODB_URI = process.env.MONGODB_URI
  console.log('connecting to', MONGODB_URI)
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('connected to MongoDB')
  } catch (error) {
    console.log('error connection to MongoDB:', error.message)
    process.exit(1) 
  }
}

module.exports = connectToDatabase