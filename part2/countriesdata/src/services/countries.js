import axios from "axios";

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
    const req = axios.get(baseURL)
    return req.then( res => res.data)
}

export default { getAll }