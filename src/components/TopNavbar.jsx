import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { signOutUser } from 'reducers/user';

const TopNavbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(signOutUser());
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Bloggy</Navbar.Brand>
          <Nav
          className="d-flex justify-content-start w-100"
          style={{
            position:'relative'
          }}
          >
            <div className="d-flex flex-row align-items-center justify-content-center">
              <Nav.Link href="/blogs">blogs</Nav.Link>
              <Nav.Link href="/users">users</Nav.Link>
            </div>
            <div
            className="d-flex justify-content-end align-items-center"
            style={{
              position:'absolute',
              right: '0rem'
            }}
            >
              {user ? (
                <>
                  <p style={{ color: "#acacac", margin: "0" }}>
                    Logged in as {user.username}
                  </p>
                  <Button
                  variant='outline-light'
                  onClick={handleLogOut}
                  style={{
                    padding: '0.2rem 0.4rem',
                    marginLeft: '0.5rem'
                  }}
                  >logout</Button>
                </>
              ) : null}
            </div>
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default TopNavbar;
