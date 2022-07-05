import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import './Header.css'
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
    return (

      <Navbar className="navbar" expand="sm">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="navbar-brand">Quotable</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="ms-auto">
              <LinkContainer to="/upload">
                <Nav.Link>Upload</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default Header;