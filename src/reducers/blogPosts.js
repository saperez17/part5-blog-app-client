import blogService from "services/blog";
import { setNotification } from "reducers/notification";

const blogPostsInitialState = [];

const blogPostReducer = (state = blogPostsInitialState, action) => {
  switch (action.type) {
    case "CREATE": {
      return [...state, action.data];
    }
    case "DELETE": {
        const filteredBlogPosts = state.filter(blogPost => blogPost.id !== action.data)
      return filteredBlogPosts;
    }
    case "UPDATE": {
      return state.map((blogPost) =>
        blogPost.id !== action.data.id ? blogPost : action.data
      );
    }
    case "FETCH_ALL": {
      return action.data;
    }
    default: {
      return state;
    }
  }
};

//Action Creators
// export const CreateBlogPost = ()
export const fetchBlogPosts = () => {
  return async (dispatch) => {
    const allBlogPosts = await blogService.getAll();
    console.log("allposts", allBlogPosts);
    dispatch({
      type: "FETCH_ALL",
      data: allBlogPosts,
    });
  };
};

export const createBlogPost = ({ blog, userInfo }) => {
  return async (dispatch) => {
    try {
      const res = await blogService.create({
        ...blog,
        user: { id: userInfo.userId },
      });
      if (res.status === 201) {
        dispatch({
          type: "CREATE",
          data: res.data,
        });
        dispatch(
          setNotification({
            message: `A new blog ${res.data.title} has been added`,
            variant: "success",
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const likeBlogPost = (blogToUpdate) => {
  return async (dispatch) => {
    try {
      const res = await blogService.update(blogToUpdate);
      if (res.status === 200) {
        console.log("res", res.data);
        dispatch({
          type: "UPDATE",
          data: res.data,
        });
        dispatch(
          setNotification({
            message: `A new blog ${blogToUpdate.title} successfully updated`,
            variant: "info",
          })
        );
      } else {
        dispatch(
          setNotification({
            message: `Ops, something went wrong`,
            variant: "danger",
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  };
};
export const commentBlogPost = (blogToComment, comment) => {
  return async (dispatch) => {
    try {
      const res = await blogService.comment(blogToComment.id, comment);
      if (res.status === 200) {
        console.log('res', res.data);
        dispatch({
          type: 'UPDATE',
          data: res.data,
        });
        dispatch(
          setNotification({
            message: `${blogToComment.title} was commented`,
            variant: 'info',
          })
        );
      } else {
        dispatch(
          setNotification({
            message: `Ops, something went wrong`,
            variant: "danger",
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteBlogPost = (blogToDelete) => {
  return async (dispatch) => {
    try {
        const res = await blogService.deleteBlog(blogToDelete.id);
      if (res.status === 201) {
        dispatch({
            type: 'DELETE',
            data: blogToDelete.id
        })
        dispatch(
            setNotification({
              message: `${blogToDelete.title} was deleted`,
              variant: "info",
            })
          );
      } else {
        dispatch(
          setNotification({
            message: `Only creators can delete blog posts`,
            variant: "dark",
          })
        );
      }
    } catch (e) {
      dispatch(
        setNotification({
          message: `Ops, something went wrong`,
          variant: "danger",
        })
      );
    }
  };
};

export default blogPostReducer;
