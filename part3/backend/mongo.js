const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as arguemnt')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://datorres335:${password}@cluster0.uiaciun.mongodb.net/phonebookAppTest?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(result => {
    console.log('new person added!');
    mongoose.connection.close()
  })
}

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person);
    })
    mongoose.connection.close()
  })
}