const reducerInitialState = {
  message: "",
  variant: "",
};

let timeoutID;
const notificationReducer = (state = reducerInitialState, action) => {
  switch (action.type) {
    case "SET": {
      return action.data;
    }
    case "CLEAR": {
      return {
        message: "",
        variant: "",
      };
    }
    default: {
      return state;
    }
  }
};

//action creators
export const setNotification = ({ message, variant }) => {
  return async (dispatch) => {
    if (timeoutID !== undefined) {
      clearTimeout(timeoutID);
    }
    timeoutID = setTimeout(() => {
      dispatch({ type: "CLEAR" });
    }, 5000);
    dispatch({
      type: "SET",
      data: { message, variant },
    });
  };
};
export const clearNotification = () => {
  if (timeoutID !== undefined) {
    clearTimeout(timeoutID);
  }
  return {
    type: "CLEAR",
  };
};

export default notificationReducer;
