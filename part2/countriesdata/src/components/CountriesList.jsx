import { useEffect, useState } from "react"
import CountryDetails from "./CountryDetails"
import  WeatherInfo  from "./Weather"

const CountriesList = ({ countries }) => {
    const [showDetails, setShowDetails] = useState([])

    useEffect(() => {
        const countryDetailObj = countries.map((c, i) => ({
            id: i,
            name: c.name.common,
            isShown: false
        }))
        setShowDetails(countryDetailObj)
    }, [countries])

    const handleShowDetail = (index) => {
        const updatedShowState = showDetails.map((detail, i) =>
            i === index ? { ...detail, isShown: !detail.isShown } : detail
        )
        setShowDetails(updatedShowState)
    }

    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }
    if (countries.length === 1) {
        return (
        <>
        <CountryDetails country={countries[0]} />
        <WeatherInfo country={countries[0]}/>
        </>
        )
    }

    return (
        <div>
            <ul>
                {countries.map((country, i) => (
                    <li key={country.name.common}>
                        {country.name.common}
                        <button onClick={() => handleShowDetail(i)}>
                            {showDetails[i]?.isShown ? "hide" : "show"}
                        </button>
                        {showDetails[i]?.isShown ? (
                            <CountryDetails country={countries[i]} />
                        ): ''}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CountriesList