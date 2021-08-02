
import { useEffect, useState } from 'react'
import blogService from '../services/blog'
import BlogForm from './BlogForm';
import Notification from './Notification';


const Blog = ({blogInfo})=>{
    return(
        <div>
            <h3> {blogInfo.title} </h3>
            <p className="mb-0"> author: {blogInfo.author } </p>
            <p className="mb-0"> url: {blogInfo.url} </p>
            <p className="mb-0"> likes: {blogInfo.likes} </p>
        </div>
    )
}

const Blogs = ({user})=>{
    const [blogs, setBlogs] = useState([])
    const [feedbackMesssage, setFeedbackMessage] = useState(null)
    useEffect(() => {
        try{
            blogService.getAll().then(
                blogs => {
                    setBlogs(blogs)
                    console.log(blogs)
                }
            )
        }catch(exception){
            console.log(exception);
        }
    }, [])

    const addBlog = (blog)=>{
        blogService.create(blog)
        .then(res => {
            setBlogs(prevBlogs => [...prevBlogs, blog])
            setFeedbackMessage({message:`A new blog ${res.title} has been added`, variant:'success'})
            setTimeout(()=>{
                setFeedbackMessage(null)
            },5000)
        })
    }
    return(
        <div>
            <Notification
            message={feedbackMesssage?feedbackMesssage.message:null}
            variant={feedbackMesssage?feedbackMesssage.variant:null}/>
            {user!==null && <BlogForm handleBlogSubmit={addBlog}/>}
            {blogs.map((blog, key)=><Blog key={key} blogInfo={blog} />)}
        </div>
    )
}

export default Blogs