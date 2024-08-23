const PersonForm = ({newName, handleNewName, newNumber, handleNewNumber, addPerson}) => {

  
  return (
    <form>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
          <br/>
          number: <input value={newNumber} type="number" onChange={handleNewNumber}/>
        </div>
        <div>
          <button onClick={addPerson} type="submit">add</button>
        </div>
    </form>
  )
}

export default PersonForm