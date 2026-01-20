import { useState, useEffect } from 'react'
import personService from './services/persons'

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

const DeleteButton = ({ handleDelete }) => {
  return (
    <button onClick={handleDelete}>delete</button>
  )
}

const Persons = ({filter, persons, filteredPersons, setPersons}) => {
  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(person.id).catch(error => alert('unable to delete person:', error))
      setPersons(persons.filter(a => a.id !== person.id))
    }
  }
  
  return (
    <>
      {filter === '' ? persons.map(person => {
        return <div key={person.id}>
          {person.name} {' '}
          {person.number} {' '}
          <DeleteButton handleDelete={() => handleDelete(person)}
          /><br />
        </div>
      }) : filteredPersons.map(person => {
        return <div key={person.id}>
          {person.name} {person.number}<br />
        </div>
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
    // console.log('useEffect initializing...');
    // axios.get('http://localhost:3001/persons')
    //   .then(response => {
    //     console.log('promise fulfilled');
    //     setPersons(response.data)
    //   })
    personService.getAll()
      .then(response => {
        setPersons(response)
      })
      .catch(error => {
        console.log('getting all persons failed: ', error)
        alert('getting all persons failed')
      })
  }, [])
  console.log('rendered', persons.length, 'persons');
  

  const onSubmit = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName && person.number === newNumber)) {
      alert(`${newName} is already added to phonebook`)
    } else if (persons.some(person => person.name === newName && person.number !== newNumber)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const oldObject = persons.find(person => person.name === newName)
        const updatedObject = {...oldObject, number: newNumber}

        personService.update(updatedObject.id, updatedObject)
        .then(() => {
            //console.log(response)
            setPersons(persons.map(p => p.id === updatedObject.id ? updatedObject : p))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            alert('updating person phone number failed')
            console.log('updating person phone number failed: ', error)
          })
      }
    } else {
      // const newObject = {
      //   name: newName,
      //   number: newNumber//,
      //   //id: persons.length + 1 // LET THE JSON SERVER AUTO GENERATE THE ID
      // }
      const newObject = {
        name: newName,
        number: newNumber
      }

      // axios.post('http://localhost:3001/persons', newObject)
        // .then(response => {
        //   console.log(response)
        //   setPersons(persons.concat(response.data))
        // setNewName('')
        // setNewNumber('')
        // })
      personService.create(newObject)
       .then(response => {
          console.log(response)
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          alert('creating new person failed')
          console.log('creating new person failed: ', error)
        })
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

      <Persons filter={filter} persons={persons} filteredPersons={filteredPersons} setPersons={setPersons}/>
    </div>
  )
}

export default App