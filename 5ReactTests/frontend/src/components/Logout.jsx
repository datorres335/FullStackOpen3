const Logout = ( {name, setUser, storage, notify } ) => {
  const handleLogout = () => {
    setUser(null)
    storage.removeUser()
    notify(`Bye, ${name}!`)
  }

  return (
    <div>
      {name} logged in {' '}
      <button onClick={handleLogout}>
        logout
      </button>
    </div>
  )
}

export default Logout