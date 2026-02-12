/* 
NOTE:
This is a temporary file made to populate the database with the mock data refereced from "index_OLD.js"
*/

require('dotenv').config()
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

const authors = [
  { name: 'Robert Martin', born: 1952 },
  { name: 'Martin Fowler', born: 1963 },
  { name: 'Fyodor Dostoevsky', born: 1821 },
  { name: 'Joshua Kerievsky' },
  { name: 'Sandi Metz' },
]

const books = [
  { title: 'Clean Code', published: 2008, author: 'Robert Martin', genres: ['refactoring'] },
  { title: 'Agile software development', published: 2002, author: 'Robert Martin', genres: ['agile', 'patterns', 'design'] },
  { title: 'Refactoring, edition 2', published: 2018, author: 'Martin Fowler', genres: ['refactoring'] },
  { title: 'Refactoring to patterns', published: 2008, author: 'Joshua Kerievsky', genres: ['refactoring', 'patterns'] },
  { title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby', published: 2012, author: 'Sandi Metz', genres: ['refactoring', 'design'] },
  { title: 'Crime and punishment', published: 1866, author: 'Fyodor Dostoevsky', genres: ['classic', 'crime'] },
  { title: 'Demons', published: 1872, author: 'Fyodor Dostoevsky', genres: ['classic', 'revolution'] },
]

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('connected to MongoDB')

  await Author.deleteMany({})
  await Book.deleteMany({})
  console.log('cleared existing data')

  const savedAuthors = await Author.insertMany(authors)
  console.log(`inserted ${savedAuthors.length} authors`)

  const authorMap = {}
  savedAuthors.forEach(a => { authorMap[a.name] = a._id })

  const booksWithRefs = books.map(b => ({
    title: b.title,
    published: b.published,
    author: authorMap[b.author],
    genres: b.genres,
  }))

  const savedBooks = await Book.insertMany(booksWithRefs)
  console.log(`inserted ${savedBooks.length} books`)

  await mongoose.connection.close()
  console.log('done')
}

seed().catch(e => { console.error(e); process.exit(1) })
