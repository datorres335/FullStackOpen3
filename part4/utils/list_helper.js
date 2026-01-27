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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}