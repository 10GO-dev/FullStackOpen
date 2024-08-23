
const PersonFilter = ({searchValue, handleSearchInput}) => {
    return(
        <>
        filter shown with <input value={searchValue} onChange={handleSearchInput} type="text" />
        </>
    )
}

export default PersonFilter