import { useEffect, useState } from 'react'
import PersonFilter from './components/PersonFilter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons.js'
import { Notification } from './components/Notification.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [message, setMessage] = useState({ message: null, type: null})

  useEffect(() => {
    personService.getAll()
      .then(persons => {
        setPersons(persons)
      })
      .catch(error => console.log("Failed to load persons", error))
  }, [])

  const filteredNames = (searchValue !== '') ? persons.filter(person => person.name.toLowerCase().includes(searchValue.toLocaleLowerCase())) : persons
  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    const personExist = persons.find(p => p.name === newPerson.name)

    if (personExist !== undefined) {
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number, replace the old number with a new one?`))
        personService.updatePerson(personExist.id,
          { ...personExist, number: newNumber })
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson))
            setMessage({ message: `Changed ${updatedPerson.name} number`, type: 'success'})
            setTimeout(() => setMessage({ message: null, type: null}), 5000)
          }).catch( error => {
            setMessage({ message: `Information of ${personExist.name} has already been removed from server`, type: 'error'})
            setTimeout(() => setMessage({ message: null, type: null}), 5000)
            setPersons(persons.filter(p => p.id !== personExist.id))
          })
    }
    else {

      personService.create(newPerson)
        .then(addedPerson => {
          
          setPersons(persons.concat(addedPerson))
          setMessage({ message: `Added ${addedPerson.name}`, type: 'success'})
          setTimeout(() => setMessage({ message: null, type: null}), 5000)
        }
        ).catch(error => {
          alert("failed to add the new persons")
          console.log(error)
        })
    }
  }
  
  const handleDeletePerson = (person) => {

    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.deletePerson(person.id)
        .then(() =>
          setPersons(persons.filter(p => p.id !== person.id))
        )
    }
  }


  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchInput = (event) => {
    setSearchValue(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.message} type={message.type}/>
      <PersonFilter searchValue={searchValue} handleSearchInput={handleSearchInput} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons nameFilter={filteredNames} handleDelete={(person) => handleDeletePerson(person)} />
    </div>
  )
}

export default App


