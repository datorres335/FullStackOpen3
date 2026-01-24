require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.static('dist'))
app.use(express.json())
//app.use(requestLogger) // not sure what this is but is causing app to fail 1/23/26 6:02pm

const morgan = require('morgan')
const Person = require('./models/person')

morgan.token('body', req => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// let persons = [
//     { 
//       "id": "1",
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": "2",
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": "3",
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": "4",
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

//mongoose.set('strictQuery', false)
// mongoose.connect(process.env.MONGODB_URI, { family: 4 })

// const personSchema = new mongoose.Schema({
//   name: String,
//   number: String
// })
// personSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })
//const Person = mongoose.model('Person', personSchema)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  // const id = request.params.id
  // const person = persons.find(person => person.id === id)

  // if (person) {
  //   response.json(person)
  // } else {
  //   response.status(404).end()
  // }

  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log('Error in finding person: ', error)
      next(error)
    })
})

app.delete('/api/persons/:id', (request, response) => {
  // const id = request.params.id
  // persons = persons.filter(person => person.id !== id)

  // response.status(204).end()

  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      console.log(`${result} was deleted`)
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', async (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const personExists = await Person.findOne({ name: body.name })

  if (personExists) {
    if (personExists.number === body.number) {
      return response.status(400).json({
        error: 'name already exists in the phonebook'
      })
    } else {
      const updatedPerson = await Person.findByIdAndUpdate(
        personExists._id,
        { number: body.number },
        { new: true }
      )
      return response.json(updatedPerson)
    }
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) return response.status(404).end()

      person.name = name
      person.number = number

      return person.save().then(updatedPerson => response.json(updatedPerson))
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
  const numOfPeople = persons.length
  const now = new Date().toString()

  response.send(`<p>Phonebook has info for ${numOfPeople} people</p> <p>${now}</p>`)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT // process.env.PORT is necessary to deploy app on Render.com
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})