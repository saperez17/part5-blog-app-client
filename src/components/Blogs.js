/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import blogService from "../services/blog";
import BlogForm from "./BlogForm";
import Notification from "./Notification";
import Togglable from "./Togglable";
import { BlogItem } from "./BlogItem";
import { Table } from "react-bootstrap";
import { setNotification, clearNotification } from "reducers/notification";
import { fetchBlogPosts } from "reducers/blogPosts";
import { useParams } from "react-router";
import {
  createBlogPost,
  likeBlogPost,
  deleteBlogPost,
  commentBlogPost
} from "reducers/blogPosts";
import BlogDetail from "components/BlogDetail";

// import { fetchBlogPosts } from 'reducers/blogPosts';

const Blogs = ({ user }) => {
  const [blogs, setBlogs] = useState([]);
  const [blogToRender, setBlogToRender] = useState([]);
  const blogFormRef = useRef();
  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();

  const notification = useSelector((state) => {
    return state.notification;
  });
  const blogPosts = useSelector((state) => {
    return state.blogPost;
  });
  useEffect(() => {
    setUserInfo(user);
  }, [user]);

  useEffect(() => {
    dispatch(fetchBlogPosts());
  }, []);

  const addBlog = (blog) => {
    if (userInfo.token === null) {
      return;
    }
    dispatch(createBlogPost({ blog, userInfo }));
  };

  const handleLikeBlog = (blogId) => {
    const blogToUpdate = blogPosts.filter((blog) => blog.id === blogId)[0];
    blogToUpdate.likes = blogToUpdate.likes + 1;
    dispatch(likeBlogPost(blogToUpdate));
  };
  const handleDeleteBlog = (blogId) => {
    const blogToDelete = blogPosts.filter((blog) => blog.id === blogId)[0];
    dispatch(deleteBlogPost(blogToDelete));
  };
  const handleCommentBlog = (blogId, comment) => {
    const blogToComment = blogPosts.filter((blog) => blog.id === blogId)[0];
    dispatch(commentBlogPost(blogToComment, comment))
  }

  const blogArrayToRender = () => {
    if (!params.blogId) {
      return [...blogPosts].sort((blogA, blogB) => {
        if (blogA.likes - blogB.likes < 0) {
          return 1;
        }
        if (blogA.likes - blogB.likes > 0) {
          return -1;
        }
        return 0;
      });
    } else {
      return [...blogPosts].filter((blog) => blog.id === params.blogId);
    }
  };

  const blogArray = blogArrayToRender();

  return (
    <div>
      {notification.message !== "" && (
        <Notification
          message={notification.message}
          variant={notification.variant}
        />
      )}
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm handleBlogSubmit={addBlog} />
      </Togglable>

      {blogArray.length > 1 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Blog title</th>
              <th>Author</th>
              <th>URL</th>
              <th>Likes</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {blogArray.map((blog, key) => (
              <BlogItem
                key={key}
                idx={key}
                blogInfo={blog}
                likeBlogPost={handleLikeBlog}
                deleteBlog={handleDeleteBlog}
              />
            ))}
          </tbody>
        </Table>
      ) : (
        blogArray.map((blog, key) => (
          <BlogDetail
          key={key}
          blogInfo={blog}
          likeBlogPost={handleLikeBlog}
          commentBlog={handleCommentBlog}
          />
        ))
      )}
    </div>
  );
};

export default Blogs;
