import React from "react";
import { Button } from "react-bootstrap";

const BlogDetail = ({ blogInfo, likeBlogPost }) => {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <h2>{blogInfo.title}</h2>
      <div>
        <p>
          <a href={`${blogInfo.url}`} target='_blank' rel='noreferrer'>{blogInfo.url}</a>
        </p>
        <div className='d-flex justify-content-start align-items-center'>
          <p className='p-0 m-0'>{blogInfo.likes} likes</p>
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
        <p>Added by <strong>{blogInfo.author}</strong></p>
      </div>
    </div>
  );
};

export default BlogDetail;