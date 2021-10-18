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
import { createBlogPost } from 'reducers/blogPosts';

// import { fetchBlogPosts } from 'reducers/blogPosts';

const Blogs = ({ user }) => {
  const [blogs, setBlogs] = useState([]);
  const blogFormRef = useRef();
  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useDispatch();
  const notification = useSelector((state) => {
    return state.notification;
  });
  const blogPosts = useSelector(state => {
      return state.blogPost;
  })
  useEffect(() => {
    setUserInfo(user);
  }, [user]);
//   useEffect(() => {
//     try {
//       blogService.getAll().then((blogs) => {
//         setBlogs(blogs);
//         console.log(blogs);
//       });
//     } catch (exception) {
//       console.log(exception);
//     }
//   }, []);

  const addBlog = (blog) => {
    if (userInfo.token === null) {
      console.log("cannot add blog");
      return;
    }
    dispatch(createBlogPost({ blog, userInfo }))
    // blogService
    //   .create({ ...blog, user: { id: userInfo.userId } })
    //   .then((res) => {
    //     setBlogs((prevBlogs) => [...prevBlogs, res]);
    //     dispatch(
    //       setNotification({
    //         message: `A new blog ${res.title} has been added`,
    //         variant: "success",
    //       })
    //     );
    //     setTimeout(() => {
    //       dispatch(clearNotification());
    //     }, 5000);
    //     blogFormRef.current.toogleVisibility();
    //   });
  };

  const handleLikeBlog = (blogId) => {
    const blogToUpdate = blogPosts.filter((blog) => blog.id === blogId)[0];
    blogToUpdate.likes = blogToUpdate.likes + 1;
    blogService.update(blogToUpdate).then(() => {

      dispatch(
        setNotification({
          message: `A new blog ${blogToUpdate.title} successfully updated`,
          variant: "info",
        })
      );
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    });
  };
  const handleDeleteBlog = (blogId) => {
    const blogToDelete = blogPosts.filter((blog) => blog.id === blogId)[0];
    try {
      blogService
        .deleteBlog(blogToDelete.id)
        .then(() => {
          console.log("got into here");
          setBlogs(blogPosts.filter((blog) => blog.id !== blogId));
          dispatch(
            setNotification({
              message: `A new blog ${blogToDelete.title} successfully deleted`,
              variant: "info",
            })
          );
          setTimeout(() => {
            dispatch(clearNotification());
          }, 5000);
        })
        .catch(() => {
          dispatch(
            setNotification({
              message: `Only creators can delete blog posts`,
              variant: "dark",
            })
          );
          setTimeout(() => {
            dispatch(clearNotification());
          }, 5000);
        });
    } catch (exception) {
      dispatch(
        setNotification({
          message: `Ups, something went wrong`,
          variant: "danger",
        })
      );
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    }
  };

  const sortedBlogs = blogPosts.sort((blogA, blogB) => {
    if (blogA.likes - blogB.likes < 0) {
      return 1;
    }
    if (blogA.likes - blogB.likes > 0) {
      return -1;
    }
    return 0;
  });
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
          {sortedBlogs.map((blog, key) => (
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
    </div>
  );
};

export default Blogs;
