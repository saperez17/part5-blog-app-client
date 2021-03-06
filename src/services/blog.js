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
    return response
}

const update = async(blog) => {
    console.log('blog', blog)
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
    let response = await axios.put(resourceAddress,bodyParameters, config)
    return response
}
const comment = async(blogId, comment) => {
    const resourceAddress = `${baseUrl}/${blogId}/comments`
    const bodyParameters = {
        comment: comment
    }
    let response = await axios.post(resourceAddress,bodyParameters)
    return response
}

const deleteBlog = async(blogId) => {
    const resourceAddress = `${baseUrl}/${blogId}`
    let response = await axios.delete(resourceAddress, { headers:
        {
            Authorization: token
        }
    })
    return response
}

export default {
    getAll,
    create,
    update,
    deleteBlog,
    setToken,
    comment
}
