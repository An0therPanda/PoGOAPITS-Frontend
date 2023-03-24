import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../assets/images/logo.png";

function NavBarAdmin() {
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
          <NavDropdown title="Pokémon" id="basic-nav-dropdown">
            <NavDropdown.Item href="/admin/listapokemones">
              Lista de Pokémones
            </NavDropdown.Item>
            <NavDropdown.Item href="/admin/agregarpokemon">
              Agregar Pokémon
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Ataques">
            <NavDropdown.Item href="/admin/ataques">
              Lista de ataques
            </NavDropdown.Item>
            <NavDropdown.Item href="/admin/agregarataquecargado">
              Agregar ataque cargado
            </NavDropdown.Item>
            <NavDropdown.Item href="/admin/agregarataquerapido">
              Agregar ataque rápido
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav className="ml-auto">
          <Nav.Link href="/logout" className="text-white">
            Cerrar sesión
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}


export default NavBarAdmin;