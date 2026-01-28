const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

// const initialBlogs = [
//   {
//     title: "No Title Test 1",
//     author: "No Author Test 1",
//     url: "No URL",
//     likes: 0
//   },
//   {
//     title: "No Title Test 2",
//     author: "No Author Test 2",
//     url: "No URL",
//     likes: 1
//   },
//   {
//     title: "No Title Test 3",
//     author: "No Author Test 3",
//     url: "No URL",
//     likes: 2
//   },
// ]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map(e => e.title)
  assert.strictEqual(contents.includes('No Title Test 1'), true)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "Blog from test file",
    author: "author Test",
    url: "none",
    likes: 999
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
  assert(contents.includes("Blog from test file"))
})

test('blog without title or author is not added', async () => {
  const newBlog = {
    title: "SHOULD FAIL",
    url: "FAIL",
    likes: 999
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  // const response = await helper.blogsInDb()
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.deepStrictEqual(resultBlog.body, blogToView)
})

after(async () => {
  await mongoose.connection.close()
})