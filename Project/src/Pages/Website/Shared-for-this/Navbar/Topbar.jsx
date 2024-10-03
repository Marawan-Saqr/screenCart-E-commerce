import "./Topbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Topbar = () => {
  const [categories, setCategories] = useState([]);

  // Get all unique categories
  const getAllCategories = async () => {
    const response = await axios.get("http://localhost:3001/products");
    const products = response.data;

    // Extract unique categories
    const uniqueCategories = [...new Set(products.map(product => product.category))];

    setCategories(uniqueCategories); // Set unique categories to state
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Navbar expand="lg" className="topbar bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="navbarScroll" className="ms-auto" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll style={{textTransform: 'uppercase'}}>
            <Link className="nav-link" to={"home"} style={{fontWeight: 'bold'}}>Home</Link>
            <Link className="nav-link" to={"products-page"} style={{fontWeight: 'bold'}}>All Products</Link>
            {/* Map over the unique categories and display them */}
            {categories.map((category, index) => (
              <Link className="nav-link" style={{fontWeight: 'bold'}} key={index} to={`/website/get-by-category/${category}`}>{category}</Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Topbar;
