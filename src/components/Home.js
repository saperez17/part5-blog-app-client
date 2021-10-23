import React, { useEffect } from 'react'
import Login from 'components/Login'
import Blogs from 'components/Blogs'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogPosts } from 'reducers/blogPosts';
import 'App.css'

const Home = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBlogPosts())
    }, [dispatch])

    return (
        <Container fluid>
            <Row className="">
                <Col md={{ span: 6, offset:3 }}>
                    <Login setUserState={(userDetails) => console.log(userDetails)} user={user}/>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={10}>
                    {user && <Blogs user={user}/>}
                </Col>
            </Row>
        </Container>
    )
}

export default Home
