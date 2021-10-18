import blogService from 'services/blog';
import { setNotification } from 'reducers/notification';

const blogPostsInitialState = []

const blogPostReducer = (state = blogPostsInitialState, action) => {
    switch(action.type){
        case 'CREATE': {
            return [...state, action.data]
        }
        case 'DELETE': {
            return action.data
        }
        case 'FETCH_ALL': {
            return action.data
        }
        default: {
            return state
        }
    }
}

//Action Creators
// export const CreateBlogPost = ()
export const fetchBlogPosts = () => {
    return async (dispatch) => {
        const allBlogPosts = await blogService.getAll();
        console.log('allposts', allBlogPosts);
        dispatch({
            type: 'FETCH_ALL',
            data: allBlogPosts
        })
    }
}

export const createBlogPost = ({ blog, userInfo }) => {
    return async (dispatch) => {
        try {
            const res = await blogService.create({ ...blog, user: { id: userInfo.userId } })
            if (res.status === 201){
                dispatch({
                    type: 'CREATE',
                    data: res.data
                })
                dispatch(setNotification({
                    message: `A new blog ${res.data.title} has been added`,
                    variant: 'success'
                }))
            }
        }catch(e){
            console.log(e);
        }
    }
}


export default blogPostReducer;