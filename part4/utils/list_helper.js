const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  const sum = (total, blog) => total + blog.likes

  return blogs.reduce(sum, 0)
}

module.exports = {
  dummy,
  totalLikes
}