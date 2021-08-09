
import React, { useEffect, useState, useRef } from 'react'
import blogService from '../services/blog'
import BlogForm from './BlogForm'
import Notification from './Notification'
import Togglable from './Togglable'
import { BlogItem } from './BlogItem'

const Blogs = ({ user }) => {
    const [blogs, setBlogs] = useState([])
    const [feedbackMesssage, setFeedbackMessage] = useState(null)
    const blogFormRef = useRef()
    const [userInfo, setUserInfo] = useState(null)
    useEffect(() => {
        setUserInfo(user)
    },[user])
    useEffect(() => {
        try{
            blogService.getAll().then(
                blogs => {
                    setBlogs(blogs)
                    console.log(blogs)
                }
            )
        }catch(exception){
            console.log(exception)
        }
    }, [])

    const addBlog = (blog) => {
        if (userInfo.token === null){
            console.log('cannot add blog')
            return
        }
        blogService.create({ ...blog, user: { id:userInfo.userId } })
            .then(res => {
                setBlogs(prevBlogs => [...prevBlogs, res])
                setFeedbackMessage({ message:`A new blog ${res.title} has been added`, variant:'success' })
                setTimeout(() => {
                    setFeedbackMessage(null)
                },5000)
                blogFormRef.current.toogleVisibility()
            })
    }

    const handleLikeBlog = (blogId) => {
        const blogToUpdate = blogs.filter(blog => blog.id === blogId)[0]
        blogToUpdate.likes = blogToUpdate.likes + 1
        blogService.update(blogToUpdate)
            .then(() => {
                setFeedbackMessage({ message:`Blog post ${blogToUpdate.title} successfully updated`, variant:'info' })
                setTimeout(() => {
                    setFeedbackMessage(null)
                },5000)
            })
    }
    const handleDeleteBlog = (blogId) => {
        const blogToDelete = blogs.filter(blog => blog.id === blogId)[0]
        try{
            blogService.deleteBlog(blogToDelete.id)
                .then(() => {
                    console.log('got into here')
                    setBlogs(blogs.filter(blog => blog.id!==blogId))
                    setFeedbackMessage({ message:`Blog post ${blogToDelete.title} successfully deleted`, variant:'info' })
                    setTimeout(() => {
                        setFeedbackMessage(null)
                    },5000)
                })
                .catch(() => {
                    setFeedbackMessage({ message:'Only creators can delete blog posts', variant:'dark' })
                    setTimeout(() => {
                        setFeedbackMessage(null)
                    },5000)
                })
        }catch(exception){
            setFeedbackMessage({ message:'Ups, something went wrong', variant:'danger' })
            setTimeout(() => {
                setFeedbackMessage(null)
            },5000)
        }
    }

    const sortedBlogs = blogs.sort((blogA, blogB) => {
        if (blogA.likes - blogB.likes < 0){
            return 1
        }
        if (blogA.likes - blogB.likes > 0){
            return -1
        }
        return 0
    })
    return(
        <div>
            <Notification
                message={feedbackMesssage?feedbackMesssage.message:null}
                variant={feedbackMesssage?feedbackMesssage.variant:null}/>
            {/* {user!==null && <BlogForm handleBlogSubmit={addBlog}/>} */}
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                <BlogForm handleBlogSubmit={addBlog}/>
            </Togglable>
            {sortedBlogs.map((blog, key) =>
                <BlogItem
                    key={key}
                    blogInfo={blog}
                    likeBlogPost={handleLikeBlog}
                    deleteBlog={handleDeleteBlog}
                />)
            }
        </div>
    )
}

export default Blogs