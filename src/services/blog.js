import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async ({ title, author, url, likes }) => {
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

const update = async(blog) => {
    const resourceAddress = `${baseUrl}/${blog.id}`
    const config = {
        headers: {
            Authorization: token
        }
    }
    const bodyParameters = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        userId: blog.user.id
    }
    const response = await axios.put(resourceAddress,bodyParameters, config)
    return response.data
}

const deleteBlog = async(blogId) => {
    const resourceAddress = `${baseUrl}/${blogId}`
    // const config = {
    //     headers: {
    //         Authorization: token
    //     }
    // }
    const response = await axios.delete(resourceAddress, { headers:
        {
            'Content-Type': 'application/json',
            Authorization: token
        }
    })
    console.log(response)
    return response
}

export default {
    getAll,
    create,
    update,
    deleteBlog,
    setToken
}
