const Persons = ({ nameFilter, handleDelete }) => {
  return <div>
    {nameFilter.map((p) => {
      return (
        <p key={p.name}>{p.name} {p.number} <button onClick={() => handleDelete(p)}>delete</button></p>
        )}
    )}

  </div>
}

export default Persons