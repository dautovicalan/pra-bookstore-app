import React, { useContext } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useAuth } from "../context/AuthContextCustomer";
import { useLanguage } from "../context/LanguageContext";
import selectLanguage from "../functions/selectLanguage";

const language = {
  english: {
    books: "All books",
    profile: "Profile",
    yourBooks: "Your books",
    logout: "Logout",
    logoText: "BookStore"
  },
  croatian: {
    books: "Popis knjiga",
    profile: "Profil",
    yourBooks: "Vase knjige",
    logout: "Od logiraj se",
    logoText: "Knjizara"
  }
}

const NavigationBar = () => {
  const navigate = useNavigate();

  const { currentUser, logout } = useAuth();

  const {languageId} = useLanguage();
  let currentLanguage = selectLanguage(languageId, language);


  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand>{currentLanguage.logoText}</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <LinkContainer to="/books">
              <Nav.Link>{currentLanguage.books}</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              {currentUser === null || currentUser === undefined ? (
                <Nav.Link>Login</Nav.Link>
              ) : (
                <React.Fragment></React.Fragment>
              )}
            </LinkContainer>
            <LinkContainer to="/registration">
              {currentUser === null || currentUser === undefined ? (
                <Nav.Link>Registration</Nav.Link>
              ) : (
                <React.Fragment></React.Fragment>
              )}
            </LinkContainer>
            <LinkContainer to="/profile">
              {currentUser !== undefined && currentUser !== null ? (
                <Nav.Link>{currentLanguage.profile}</Nav.Link>
              ) : (
                <React.Fragment></React.Fragment>
              )}
            </LinkContainer>
            {currentUser && (
              <Nav.Link>Hello {currentUser.displayName}</Nav.Link>
            )}
            {currentUser && (
              <LinkContainer to="/your-books">
                <Nav.Link>{currentLanguage.yourBooks}</Nav.Link>
              </LinkContainer>
            )}
            {currentUser && <Nav.Link onClick={handleLogout}>{currentLanguage.logout}</Nav.Link>}
          </Nav>          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
