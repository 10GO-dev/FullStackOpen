import axios from "axios";



const getWeather = (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_W_KEY}&units=metric`
    const req = axios.get(url)
    return req.then(res => res.data)
}


export default {getWeather}