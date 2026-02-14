import { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client/react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { STORAGE_KEY } from './util'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY)) // only called once during initial render
  const client = useApolloClient()

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [errorMessage])

  const logout = () => {
    setToken(null)
    localStorage.removeItem(STORAGE_KEY)
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
        <button onClick={() => setPage('recommendations')}>recommend</button>
        {token && <button onClick={logout}>logout</button>}
      </div>

      {errorMessage && <Notification errorMessage={errorMessage} />}

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} setPage={setPage} setError={setErrorMessage}/>

      <Recommend show={page === 'recommendations'} />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
        setError={setErrorMessage}
      />
    </div>
  )
}

export default App
