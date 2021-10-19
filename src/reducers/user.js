import loginService from "services/login";
import { setNotification } from "reducers/notification";
import blogService from "services/blog";
import { getFromLocal, saveToLocal, removeFromLocal } from "utils/localStorage";

const reducerInitialState = getFromLocal("LoggedInUser") || null;

const userReducer = (state = reducerInitialState, action) => {
  switch (action.type) {
    case "LOGIN": {
      return action.data;
    }
    case "SIGNOUT": {
      return null;
    }
    default: {
      return state;
    }
  }
};

//action creators
export const logInUser = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const loginRequest = await loginService.login({ username, password });
      if (loginRequest.status === 200) {
        dispatch({
          type: "LOGIN",
          data: loginRequest.data,
        });
        dispatch(
          setNotification({
            message: `Hi, ${loginRequest.data.username}!`,
            variant: "success",
          })
        );
        saveToLocal("LoggedInUser", loginRequest.data);
        blogService.setToken(loginRequest.data.token);
      }
    } catch (e) {
      console.log(e);
    }
  };
};
export const signOutUser = () => {
  removeFromLocal("LoggedInUser");
  blogService.setToken('');
  return async (dispatch) => {
    dispatch(
      setNotification({
        message: `Goodbye!`,
        variant: "success",
      })
    );
    dispatch({
      type: "SIGNOUT",
    });
  };
};

export default userReducer;
