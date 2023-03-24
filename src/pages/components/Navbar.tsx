import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/images/logo.png";

function NavBar() {
  return (
    <Navbar bg="danger" expand="sm" variant="dark">
      <Navbar.Brand href="/">
        <img
          src={logo}
          width="100"
          height="52"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/tipos" className="text-white">
            Tipos
          </Nav.Link>
          <Nav.Link href="/eficacias" className="text-white">
            Eficacias
          </Nav.Link>
          <NavDropdown title="Ataques" id="basic-nav-dropdown">
            <NavDropdown.Item href="/ataquespokemon">
              Mejores ataques
            </NavDropdown.Item>
            <NavDropdown.Item href="/listaataques">
              Lista de ataques
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav className="ml-auto">
          <Nav.Link href="/login" className="text-white">
            Iniciar sesión
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}


export default NavBar;