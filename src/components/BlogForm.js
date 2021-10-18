
import React, { useState } from 'react'
import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap'

const BlogForm = ({ handleBlogSubmit }) => {
    const [blog, setBlog] = useState({ title:'', author:'', url:'' })

    const setBlogAttribute = (e, attributeName ) => {
        setBlog(preVal => (
            {
                ...preVal,
                [attributeName]:e.value
            }
        ));
    }

    return(
        <Form onSubmit={(e) => {e.preventDefault(); handleBlogSubmit(blog)}}>
            <div className="d-flex flex-column justify-content-center">
                <div className="d-flex flex-row justify-content-start">
                    <FormGroup className="m-2" >
                        <FormLabel>Title</FormLabel>
                        <FormControl
                            id="titlefield"
                            type="text"
                            placeholder="blog's title"
                            value={blog.title}
                            onChange={({ target }) => setBlogAttribute(target, 'title')}>
                        </FormControl>
                    </FormGroup>
                    <FormGroup className="m-2">
                        <FormLabel>Author</FormLabel>
                        <FormControl
                            id='autor'
                            type="text"
                            placeholder="blog's author"
                            value={blog.author}
                            onChange={({ target }) => setBlogAttribute(target, 'author')}>
                        </FormControl>
                    </FormGroup>
                </div>

                <div className="d-flex flex-row justify-content-start">
                    <FormGroup className="m-2" >
                        <FormLabel>Url</FormLabel>
                        <FormControl
                            id="urlfield"
                            type="text"
                            placeholder="url"
                            value={blog.titurlle}
                            onChange={({ target }) => setBlogAttribute(target, 'url')}>
                        </FormControl>
                    </FormGroup>
                </div>
                <div className="d-flex flex-row justify-content-start mb-2">
                    <Button type="submit" variant="primary" style={{ width:'30%' }} >Create</Button>
                </div>
            </div>
        </Form>
    )
}

export default BlogForm