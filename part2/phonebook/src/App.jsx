import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({filter, handleFilterChange}) => {
  return (
    <>
      filter shown with <input value={filter} onChange={handleFilterChange}/>
    </>
  )
}

const PersonForm = ({onSubmit, newName, handleNewNameChange, newNumber, handleNewNumberChange}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>name: <input value={newName} onChange={handleNewNameChange}/></div>
      <div>number: <input value={newNumber} onChange={handleNewNumberChange}/></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({filter, persons, filteredPersons}) => {
  return (
    <>
      {filter === '' ? persons.map(person => {
        return <div key={person.id}>{person.name} {person.number}<br /></div>
      }) : filteredPersons.map(person => {
        return <div key={person.id}>{person.name} {person.number}<br /></div>
      })}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('useEffect initializing...');
    axios.get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled');
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons');
  

  const onSubmit = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
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

      <h2>Add a new</h2>

      <PersonForm onSubmit={onSubmit} newName={newName} handleNewNameChange={handleNewNameChange} newNumber={newNumber} handleNewNumberChange={handleNewNumberChange}/>

      <h2>Numbers</h2>

      <Persons filter={filter} persons={persons} filteredPersons={filteredPersons} />
    </div>
  )
}

export default App