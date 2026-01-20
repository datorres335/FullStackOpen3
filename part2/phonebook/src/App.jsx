import { useState } from 'react'

const Filter = ({filter, handleFilterChange}) => {
  return (
    <>
      filter shown with <input value={filter} onChange={handleFilterChange}/>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [filter, setFilter] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newObject = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(newObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const newFilter = event.target.value
    setFilter(newFilter)

    if (newFilter !== '') {
      setFilteredPersons(persons.filter(person => person.name.toLowerCase() === newFilter.toLowerCase()))
    } else {
      setFilteredPersons(persons)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <form onSubmit={onSubmit}>
        <h2>Add a new</h2>
        <div>name: <input value={newName} onChange={handleNewNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNewNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {filteredPersons.map(person => {
        return <div key={person.id}>{person.name} {person.number}<br /></div>
      })}
    </div>
  )
}

export default App