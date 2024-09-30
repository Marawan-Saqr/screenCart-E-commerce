import "./Topbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from 'react-router-dom';

const Topbar = () => {
  return (
    <Navbar expand="lg" className="topbar bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="navbarScroll" className="ms-auto" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Link className="nav-link" to={"home"}>Home</Link>
            <Link className="nav-link" to={"products-page"}>All Products</Link>
            <Nav.Link>Laptops</Nav.Link>
            <Nav.Link>Computers</Nav.Link>
            <Nav.Link>Smartphones</Nav.Link>
            <Nav.Link>Cameras</Nav.Link>
            <Nav.Link>Accessories</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Topbar;