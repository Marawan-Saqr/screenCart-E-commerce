import "./Topbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useGetAllProductsQuery } from '../../../../Redux/queries/website.query';

const Topbar = () => {
  const { data: products, isLoading, error } = useGetAllProductsQuery(); // Fetch products using the Redux query
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (products) {
      // Extract unique categories only if products data is available
      const uniqueCategories = [...new Set(products.map(product => product.category))];
      setCategories(uniqueCategories); // Set unique categories to state
    }
  }, [products]); // Re-run effect when products data changes

  if (isLoading) return <div>Loading...</div>; // Handle loading state
  if (error) return <div>Error fetching categories.</div>; // Handle error state

  return (
    <Navbar expand="lg" className="topbar bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="navbarScroll" className="ms-auto" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll style={{ textTransform: 'uppercase' }}>
            <Link className="nav-link" to={"home"} style={{ fontWeight: 'bold' }}>Home</Link>
            <Link className="nav-link" to={"products-page"} style={{ fontWeight: 'bold' }}>All Products</Link>
            {/* Map over the unique categories and display them */}
            {categories.map((category, index) => (
              <Link className="nav-link" style={{ fontWeight: 'bold' }} key={index} to={`/website/get-by-category/${category}`}>
                {category}
              </Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Topbar;