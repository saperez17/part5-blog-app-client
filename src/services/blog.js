import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const setToken = (newToken)=>{
    token = `Bearer ${newToken}`
}

const getAll = async ()=>{
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async ({title, author, url, likes})=>{
    console.log('token', token)
    const config = {
        headers: {
            Authorization: token
        }
    }
    const bodyParameters = {
        title,
        author,
        url,
        likes
    }
    const response = await axios.post(baseUrl,bodyParameters, config)
    return response.data
}

const update = async()=>{
    
}

const deleteBlog = ()=>{

}

export default {
    getAll,
    create,
    update,
    deleteBlog,
    setToken
}
