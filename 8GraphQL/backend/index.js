require('dotenv').config()

const startServer = require('./server')
const connectToDatabase = require('./db')

const main = async () => {
  await connectToDatabase()
  startServer()
}

main()