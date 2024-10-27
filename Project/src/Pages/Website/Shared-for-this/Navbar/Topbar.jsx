import "./Topbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom"; // Use NavLink
import { useState, useEffect } from "react";
import { useGetAllProductsQuery } from "../../../../Redux/queries/website.query";

const Topbar = () => {
  // Component States
  const { data: products, isLoading, error } = useGetAllProductsQuery();
  const [categories, setCategories] = useState([]);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // UseEffect to fetch categories
  useEffect(() => {
    if (products) {
      const uniqueCategories = [
        ...new Set(products.map((product) => product.category)),
      ];
      setCategories(uniqueCategories);
    }
  }, [products]);

  // UseEffect for dark mode
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching categories.</div>;

  const handleDarkModeToggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <Navbar expand="lg" className="topbar bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="navbarScroll" className="ms-auto" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            navbarScroll
            style={{ textTransform: "uppercase" }}
          >
            <NavLink
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              to="home"
              style={{ fontWeight: "bold" }}
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              to="products-page"
              style={{ fontWeight: "bold" }}
            >
              All Products
            </NavLink>
            {categories.map((category, index) => (
              <NavLink
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                style={{ fontWeight: "bold" }}
                key={index}
                to={`/website/get-by-category/${category}`}
              >
                {category}
              </NavLink>
            ))}
            <NavLink
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              style={{ fontWeight: "bold" }}
              to="/dashboard"
            >
              Dashboard
            </NavLink>
            <button
              className="nav-link dark-mode-toggle"
              onClick={handleDarkModeToggle}
            >
              <i className={`fa-solid ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Topbar;
