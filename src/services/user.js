import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response
}
const getById = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response
}

export default {
    getAll,
    getById
}