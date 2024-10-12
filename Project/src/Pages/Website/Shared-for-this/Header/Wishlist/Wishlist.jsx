import './Wishlist.css';
import React, { useEffect, useContext, useState } from 'react';
import { WishlistContext } from '../../../../../Hooks/wishlistContext';
import { Container, Row, Col, Card } from 'react-bootstrap';
import components from '../../../../../Shared/Styled-components/StyledComponents';
import { Link } from 'react-router-dom';

// Functional Component
const Wishlist = () => {

  // Component States
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  return (
    <Container className="my-5">
      {wishlist.length > 0 ? (
        <Row className="align-items-start">
          {/* Product Cards */}
          <Col lg={12}>
            <Row>
              {wishlist.map((product, index) => (
                <Col key={index} sm={12} md={6} lg={4} className="mb-4">
                  <Card className="shadow-sm">
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Link to={`/website/get-by-category/${product.category}`}>{product.category}</Link>
                      <Card.Text>{product.details}</Card.Text>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-success fw-bold">
                          <strong>Price: ${product.price}</strong>
                        </span>
                        <span className="badge bg-warning text-dark">
                          Rating: {product.rate}
                        </span>
                      </div>
                      <components.MainButton
                        className="mt-3"
                        onClick={() => removeFromWishlist(product.id)}
                      >
                        Remove
                      </components.MainButton>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      ) : (
        <div className="wishlist-empty">
          <h3 style={{ textTransform: 'uppercase', color: 'gray' }}>Your Wishlist Is Empty!!!</h3>
        </div>
      )}
    </Container>
  );
};

export default Wishlist;