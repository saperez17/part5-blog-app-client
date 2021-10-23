import React, { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  FormLabel,
  FormGroup,
  Button,
} from "react-bootstrap";
import blogService from "../services/blog";
import { useDispatch } from "react-redux";
import { logInUser } from "reducers/user";

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup className="mb-3" controlID="formBasicUsername">
        <FormLabel>Username</FormLabel>
        <FormControl
          className="usernameInput"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={({ target }) => handleUsernameChange(target.value)}
        ></FormControl>
      </FormGroup>
      <FormGroup className="mb-3" controlID="formBasicUsername">
        <FormLabel>Password</FormLabel>
        <FormControl
          id="userPassword"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={({ target }) => handlePasswordChange(target.value)}
        ></FormControl>
      </FormGroup>
      <Button type="submit">login</Button>
    </Form>
  );
};

const Login = ({ setUserState, user }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("LoggedInUser");
    if (loggedInUser) {
      const parsedLoggedUser = JSON.parse(loggedInUser);
      setUserState(parsedLoggedUser);
      blogService.setToken(parsedLoggedUser.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(logInUser({ username, password }));
  };

  return (
    <div>
      {user === null && (
        <div>
          <h1>Log in to application</h1>
          <LoginForm
            handleSubmit={handleLogin}
            handleUsernameChange={(username) => setUsername(username)}
            handlePasswordChange={(password) => setPassword(password)}
            username={username}
            password={password}
          />
        </div>
      ) }
    </div>
  );
};

export default Login;
