
import React, { useEffect, useState, useRef } from 'react'
import blogService from '../services/blog'
import BlogForm from './BlogForm'
import Notification from './Notification'
import Togglable from './Togglable'
import { Button } from 'react-bootstrap'

const BlogItem = ({ blogInfo, likeBlogPost, deleteBlog }) => {
    const [showBlogContent, setShowBlogContent] = useState(true)

    const hideWhenVisible = { display: showBlogContent ? 'none' : '' }

    const toggleContent = () => {
        setShowBlogContent(!showBlogContent)
    }

    return(
        <div className="d-flex flex-row">
            <div className="d-flex flex-column  m-1">
                <h3> {blogInfo.title} </h3>
                <div style={hideWhenVisible}>
                    <p className="mb-0">{blogInfo.url} </p>
                    <div className="d-flex flex-row">
                        <p className="mr-2"> {blogInfo.likes} </p>
                        <Button
                            style={{
                                height:'1.5rem',
                                width:'2.5rem',
                                display: 'flex',
                                justifyContent:'center',
                                alignItems:'center',
                                marginLeft:'.5rem'
                            }}
                            onClick={() => likeBlogPost(blogInfo.id)}
                        >like</Button>
                    </div>
                    <p className="mb-0">{blogInfo.author } </p>
                    <Button
                        variant="danger"
                        onClick={() => deleteBlog(blogInfo.id)}
                        style={{
                            height:'2rem',
                            width:'3.5rem',
                            display: 'flex',
                            justifyContent:'center',
                            alignItems:'center',
                        }}
                    >delete</Button>
                </div>
            </div>

            <div className="d-flex justify-content-center align-items-center">
                <Button
                    variant="secondary"
                    onClick={toggleContent}
                    style={{ height:'2rem' }}
                >{showBlogContent ? 'view' : 'hide'}</Button>
            </div>
        </div>
    )
}

const Blogs = () => {
    const [blogs, setBlogs] = useState([])
    const [feedbackMesssage, setFeedbackMessage] = useState(null)
    const blogFormRef = useRef()
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
        blogService.create(blog)
            .then(res => {
                setBlogs(prevBlogs => [...prevBlogs, blog])
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