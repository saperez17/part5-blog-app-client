
import { useState } from 'react'
import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap'
import blog from '../services/blog'

const BlogForm = ({handleBlogSubmit})=> {
    const [blog, setBlog] = useState({title:'', author:'', url:'', likes:''})

    const setBlogAttribute = (e, attributeName)=>{
        setBlog(preVal => (
            {
                ...preVal,
                [attributeName]:e.value
            }
            ))
    }
    

    return(
        <Form onSubmit={(e)=>{e.preventDefault(); handleBlogSubmit(blog)}}>
            <div className="d-flex flex-column justify-content-center">
                <div className="d-flex flex-row justify-content-center">
                    <FormGroup className="m-2" controlID="formBasicUsername">
                        <FormLabel>Title</FormLabel>
                        <FormControl
                        type="text"
                        placeholder="blog's title"
                        value={blog.title}
                        onChange={({target}) => setBlogAttribute(target, "title")}>
                        </FormControl>
                    </FormGroup>
                    <FormGroup className="m-2" controlID="">
                        <FormLabel>Author</FormLabel>
                        <FormControl
                        type="text"
                        placeholder="blog's author"
                        value={blog.author}
                        onChange={(({target}) => setBlogAttribute(target, "author"))}
                        ></FormControl>
                    </FormGroup>
                </div>

                <div className="d-flex flex-row justify-content-center">
                    <FormGroup className="m-2" controlID="formBasicUsername">
                        <FormLabel>Url</FormLabel>
                        <FormControl
                        type="text"
                        placeholder="url"
                        value={blog.titurlle}
                        onChange={({target}) => setBlogAttribute(target, "url")}>
                        </FormControl>
                    </FormGroup>
                    <FormGroup className="m-2" controlID="">
                        <FormLabel>Likes</FormLabel>
                        <FormControl
                        type="text"
                        placeholder="# of likes"
                        value={blog.likes}
                        onChange={(({target}) => setBlogAttribute(target, "likes"))}
                        ></FormControl>
                    </FormGroup>
                </div>
                <div className="d-flex flex-row justify-content-center">
                    <Button type="submit" variant="primary" style={{width:"30%"}} >Submit</Button>
                </div>
            </div>
        </Form>
    )
}

export default BlogForm