import { useState, useEffect } from "react"
import weatherService from "../services/weather"

const WeatherInfo = ({country}) => {

    const [weather, setWeather] = useState({})

    const [lat, lng] = country.latlng

    useEffect(()=> {

        weatherService.getWeather(lat, lng)
        .then(w => { 
            const weatherObj = { temp: w.main.temp,
                wind: w.wind.speed,
                icon: w.weather[0].icon
            }
            setWeather(weatherObj)
        }
        )
        
    },[lat, lng])


    return(

        <div>
        <h2>Weather in {country.capital}</h2>
        <p>temperature {weather.temp} Celcius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="" />
        <p>wind {weather.wind} m/s</p>
        </div>

    )

}

export default WeatherInfo