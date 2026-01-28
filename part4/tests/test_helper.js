const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: "No Title Test 1",
    author: "No Author Test 1",
    url: "No URL",
    likes: 0
  },
  {
    title: "No Title Test 2",
    author: "No Author Test 2",
    url: "No URL",
    likes: 1
  },
  {
    title: "No Title Test 3",
    author: "No Author Test 3",
    url: "No URL",
    likes: 2
  },
]

const nonExistingId = async () => {
  const blog = new NodeIterator({
    title: "WILL REMOVE",
    author: "WILL REMOVE",
    url: "WILL REMOVE",
    likes: 0
  })

  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
}