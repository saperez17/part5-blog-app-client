import { createStore, combineReducers, applyMiddleware } from 'redux';
import notificationReducer from 'reducers/notification';
import blogPostReducer from 'reducers/blogPosts';
import userReducer from 'reducers/user';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const combinedReducers = combineReducers({
  notification: notificationReducer,
  blogPost: blogPostReducer,
  user: userReducer
});
const store = createStore(
    combinedReducers,
    composeWithDevTools(
        applyMiddleware(thunk)
    ));

export default store;
