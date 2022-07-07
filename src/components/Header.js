import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import './Header.css'
import { LinkContainer } from "react-router-bootstrap";
import { logOut, useAuth } from "../firebase";

const Header = () => {

    const currentUser = useAuth();

    const handleLogOut = async () => {
      try {
        await logOut();
      } catch {
        alert("Error has occured signing out!");
      }
    }

    return (

      <Navbar className="navbar" expand="sm">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="navbar-brand">Quotable</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="ms-auto">
              {(currentUser)
                ?
                <>
                  <LinkContainer to="/">
                    <Nav.Link>Home</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/upload">
                    <Nav.Link>Upload</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/">
                    <Nav.Link onClick={handleLogOut}>Sign out</Nav.Link>
                  </LinkContainer>
                </>
                :
                <>
                  <LinkContainer to="/">
                    <Nav.Link>Home</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>Register</Nav.Link>
                  </LinkContainer>
                </>
              } 
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default Header;