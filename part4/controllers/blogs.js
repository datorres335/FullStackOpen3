const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1 })

    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) response.json(blog)
    else response.status(404).end()
  } catch (error) {
    next(error)
  }
})

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   }
//   return null
// }

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  try {
    // const decodedToken = jwt.verify(request.token, process.env.SECRET)
    // if (!decodedToken.id) {
    //   return response.status(401).json({ error: "token invalid!" })
    // }

    // const user = await User.findById(decodedToken.id)

    // if (!user) {
    //   return response.status(400).json({ error: 'userId missing or not valid! '})
    // }
    const user = request.user
    const blog = new Blog(request.body)

    if (!blog.title || !blog.url) {
      return response.status(400).send({ error: 'title or url missing' })
    }

    blog.user = user._id
    user.blogs = user.blogs.concat(blog._id)
    await user.save()

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  try {
    // await Blog.findByIdAndDelete(request.params.id)
    // response.status(204).end()

    // const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    // if (!decodedToken.id) {
    //   return response.status(401).json({ error: "token invalid!" })
    // }

    // const user = await User.findById(decodedToken.id)

    // if (!user) {
    //   return response.status(400).json({ error: 'userId missing or not valid! '})
    // }

    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }

    if (blog.user.toString() !== user.id.toString()) {
      return response.status(401).json({ error: 'only the creator can delete this blog' })
    }

    await blog.deleteOne()
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const { title, author, url, likes } = request.body

    const blog = await Blog.findById(request.params.id)
    
    if (!blog) {
      return response.status(404).end()
    }

    blog.title = title
    blog.author = author
    blog.url = url
    blog.likes = likes

    const updatedBlog = await blog.save()

    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter