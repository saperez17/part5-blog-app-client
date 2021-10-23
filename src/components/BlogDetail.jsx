import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";

const BlogDetail = ({ blogInfo, likeBlogPost, commentBlog }) => {
  const [ comment, setComment ] = useState('');

  console.log('blogInfo', blogInfo);
  const commentBlogPostTrigger = (e) => {
    e.preventDefault();
    commentBlog (blogInfo.id, comment);
    setComment('');
  }
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h2>{blogInfo.title}</h2>
      <div>
        <p>
          <a href={`${blogInfo.url}`} target="_blank" rel="noreferrer">
            {blogInfo.url}
          </a>
        </p>
        <div className="d-flex justify-content-start align-items-center">
          <p className="p-0 m-0">{blogInfo.likes} likes</p>
          <Button
            style={{
              height: "1.5rem",
              width: "2.5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: ".5rem",
              padding: "1rem",
              marginRight: "1rem",
            }}
            onClick={() => likeBlogPost(blogInfo.id)}
          >
            like
          </Button>
        </div>
        <p>
          Added by <strong>{blogInfo.author}</strong>
        </p>
        <div>
          <h5>Comments</h5>
          <Form className="d-flex">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
              type="text"
              placeholder="New comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              />
              <Form.Text className="text-muted">
                Comments are anonymous
              </Form.Text>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => commentBlogPostTrigger(e)}
              style={{
                height: "fit-content",
                margin: "0 0 0 0.5rem",
              }}
            >
              Submit
            </Button>
          </Form>
          <ul>
            {blogInfo.comments &&
            blogInfo.comments.map((comment, idx) => <li key={idx}>{comment.content}</li>)
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
