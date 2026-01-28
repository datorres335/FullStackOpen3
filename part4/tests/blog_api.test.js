const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there are initially some blogs saved', () => {
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

  test.only('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const ids = blogsAtEnd.map(n => n.id)

    assert(!ids.includes(blogToDelete.id))
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  })

  test('a blog without likes defaults to zero', async () => {
    const newBlog = {
      title: "Blog without likes",
      author: "blog author",
      url: "URL",
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = blogsAtEnd.find(blog => blog.title === 'Blog without likes')

    assert.strictEqual(addedBlog.likes, 0)
  })

  test('all fields will be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const editedBlog = {
      title: 'Updated Title',
      author: 'Updated Author',
      url: 'Updated url',
      likes: blogToUpdate.likes + 1
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(editedBlog)
      .expect(200)
    
    const updatedBlog = await Blog.findById(blogToUpdate.id)

    assert.strictEqual(updatedBlog.title, editedBlog.title)
    assert.strictEqual(updatedBlog.author, editedBlog.author)
    assert.strictEqual(updatedBlog.url, editedBlog.url)
    assert.strictEqual(updatedBlog.likes, editedBlog.likes)
  })
})

after(async () => {
  await mongoose.connection.close()
})