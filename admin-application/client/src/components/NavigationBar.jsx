import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useAuth } from "../context/AuthContext";

const NavigationBar = () => {

    const{logout} = useAuth();

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand>Knjizara Admin</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <LinkContainer to="/books">
              <Nav.Link>Popis knjiga</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/loans">
              <Nav.Link>Posudbe</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/purchases">
              <Nav.Link>Kupovine</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/bookstore-info">
              <Nav.Link>Informacije o knjizari</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/workers">
              <Nav.Link>Zaposlenici</Nav.Link>
            </LinkContainer>
            <Nav.Link onClick={logout}>Od logiraj se</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
