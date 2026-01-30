import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import storage from './services/storage'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const user = storage.loadUser()
    if (user) {
      setUser(user)
    }
  }, [])

  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  const handleLogin = async credentials => {
    try {
      const user = await loginService.login(credentials)
      setUser(user)
      storage.saveUser(user)
      notify(`Welcome back, ${user.name}`)
    } catch (error) {
      notify(`Wrong credentials!: ${error}`, 'error')
    }
  }

  if (!user) {
    return (
      <div>
        <h2>Blogs</h2>
        <Login doLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App