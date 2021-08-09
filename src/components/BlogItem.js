import React, { useState } from 'react'

import { Button } from 'react-bootstrap'

export const BlogItem = ({ blogInfo, likeBlogPost, deleteBlog }) => {
    const [showBlogContent, setShowBlogContent] = useState(true)

    const hideWhenVisible = { display: showBlogContent ? 'none' : '' }

    const toggleContent = () => {
        setShowBlogContent(!showBlogContent)
    }

    return(
        <div className="d-flex flex-row blogItemWrapper">
            <div className="d-flex flex-column  m-1">
                <div className="headerInfo">
                    <h3 className="blogTitle"> {blogInfo.title} </h3>
                    <p className="mb-0">{blogInfo.author } </p>
                </div>
                <div style={hideWhenVisible} className="bodyInfo">
                    <p className="mb-0">{blogInfo.url} </p>
                    <div className="d-flex flex-row">
                        <p className="mr-2 likesNumber"> {blogInfo.likes} </p>
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
                    className="viewBtn"
                    variant="secondary"
                    onClick={toggleContent}
                    style={{ height:'2rem' }}
                >{showBlogContent ? 'view' : 'hide'}</Button>
            </div>
        </div>
    )
}