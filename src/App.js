import React from 'react'
import './App.css'
import Login from './components/Login'
import Blogs from './components/Blogs'
import { Container, Row, Col } from 'react-bootstrap'
import { useState } from 'react'

function App() {
    const [user, setUser] = useState(null)

    return (
        <Container>
            <Row className="justify-content-end align-items-end">
                <Col xs={6}>
                    <span>{user ? `${user.username} logged in` : null} </span>
                    <Login setUserState={(userDetails) => setUser(userDetails)} user={user}/>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={10}>
                    <Blogs user={user}/>
                </Col>
            </Row>
        </Container>
    )
}

export default App
