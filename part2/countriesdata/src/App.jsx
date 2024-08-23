import { useEffect, useState } from 'react'
import countriesService from './services/countries'
import CountriesList from './components/CountriesList'

function App() {
  const [searchCountry, setSearchCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredContries] = useState([])

  useEffect(() => {
    countriesService.getAll()
      .then(countriesList => {
        const formattedCountries = countriesList.map(c => ({
          name: c.name,
          capital: c.capital,
          area: c.area,
          languages: c.languages,
          flag: c.flags.svg,
          latlng: c.latlng
        }));
        setCountries(formattedCountries);
      });
  }, []);
  

  useEffect(() => {
    if (searchCountry !== '') {
      const exactMatch = countries.filter(c => c.name.common.toLowerCase() === searchCountry.toLowerCase());
      if (exactMatch.length > 0) {
        setFilteredContries(exactMatch);
      } else {
        const partialMatches = countries.filter(c => c.name.common.toLowerCase().includes(searchCountry.toLowerCase()));
        setFilteredContries(partialMatches);
      }
    } else {
      setFilteredContries([]);
    }
  }, [searchCountry, countries]);

  const handleSearchInput = (event) => {
    setSearchCountry(event.target.value)
  }

  return (
    <>
      find countries <input type='text' onChange={handleSearchInput} value={searchCountry}/>
      <CountriesList countries={filteredCountries}/>
    </>
  )
}

export default App
