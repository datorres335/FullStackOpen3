const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  const sum = (total, blog) => total + blog.likes

  return blogs.reduce(sum, 0)
}

const favoriteBlog = blogs => {
  return blogs.reduce((favorite, blog) => (favorite.likes > blog.likes ? favorite : blog), {})
}

const mostBlogs = blogs => {
  if (!blogs.length) return null

  const blogsPerAuthor = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1
    return acc
  }, {})

  let maxAuthor = Object.keys(blogsPerAuthor)[0]

  for (const author in blogsPerAuthor) {
    if (blogsPerAuthor[author] > blogsPerAuthor[maxAuthor]) {
      maxAuthor = author
    }
  }

  return {
    author: maxAuthor,
    blogs: blogsPerAuthor[maxAuthor]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}