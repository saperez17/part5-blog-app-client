import React from 'react'
import './App.css'
import Login from './components/Login'
import Blogs from './components/Blogs'
import { Container, Row, Col } from 'react-bootstrap'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchBlogPosts } from 'reducers/blogPosts';
// import Tracklist from './components/TrackList'
// import CountConsumer from './components/CountConsumer'
// import { CountProvider } from './Context/CountContext'

function App() {
    const [user, setUser] = useState(null);
    const dispatch = useDispatch()
    dispatch(fetchBlogPosts())

    return (
        <Container fluid>
            <Row className="">
                <Col md={{ span: 6, offset:3 }}>
                    <span>{user ? `${user.username} logged in` : null} </span>
                    <Login setUserState={(userDetails) => setUser(userDetails)} user={user}/>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={10}>
                    {user && <Blogs user={user}/>}
                </Col>
            </Row>
            {/* <Row className="justify-content-center">
                <Col xs={6}>
                    <Tracklist/>
                </Col>
                <Col xs={6}>
                    <CountProvider>
                        <CountConsumer/>
                    </CountProvider>
                </Col>
            </Row> */}
        </Container>
    )
}

export default App
