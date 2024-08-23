
const CountryDetails = ({country}) => {
    


    return(
        <div>
            <h2>{country.name.common}</h2>

            <p>{country.capital}</p>
            <p>area {country.area}</p>

            <h3>Languages</h3>
            <ul>
            {Object.values(country.languages).map( lang => <li key={lang}>{lang}</li>)}
            </ul>
            <img   src={country.flag} alt={`flag of ${country.name}`} style={{width: '100px', height: 'auto'}} />

        </div>
        )
}

export default CountryDetails