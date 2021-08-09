import React, { useState, useEffect } from 'react'
import { Form , FormControl, FormLabel, FormGroup, Button } from 'react-bootstrap'
import Notification from './Notification'
import loginService from '../services/login'
import blogService  from '../services/blog'



const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => {
    return(
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
    )
}

const Login = ({ setUserState, user }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // const [user, setUser] = useState(null)
    const [feedbackMesssage, setFeedbackMessage] = useState(null)

    useEffect(() => {
        const loggedInUser = window.localStorage.getItem('LoggedInUser')
        if (loggedInUser){
            const parsedLoggedUser = JSON.parse(loggedInUser)
            setUserState(parsedLoggedUser)
            blogService.setToken(parsedLoggedUser.token)
        }
    },[])

    const handleLogin = async e => {
        e.preventDefault()
        try{
            const loginRequest = await loginService.login(
                { username, password }
            )
            setUserState(loginRequest)
            window.localStorage.setItem('LoggedInUser', JSON.stringify(loginRequest))
            blogService.setToken(loginRequest.token)
            setUsername('')
            setPassword('')
            setFeedbackMessage({ message:`Hi, ${loginRequest.username}!`, variant:'success' })
            setTimeout(() => {
                setFeedbackMessage(null)
            },5000)
        }catch(exception){
            setFeedbackMessage({ message:'Wrong Credetendials', variant:'danger' })
            setTimeout(() => {
                setFeedbackMessage(null)
            },5000)
        }
    }

    const handleLogOut =() => {
        window.localStorage.removeItem('LoggedInUser')
        setUserState(null)
        blogService.setToken('')
        setFeedbackMessage({ message:'See you soon!', variant:'warning' })
        setTimeout(() => {
            setFeedbackMessage(null)
        },5000)
    }

    return (
        <div>
            <Notification
                message={feedbackMesssage?feedbackMesssage.message:null}
                variant={feedbackMesssage?feedbackMesssage.variant:null}/>
            {user === null ?
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
                :
                <div>
                    <Button
                        variant="primary"
                        onClick={handleLogOut}
                    >log out
                    </Button>
                </div>}
        </div>
    )
}

export default  Login