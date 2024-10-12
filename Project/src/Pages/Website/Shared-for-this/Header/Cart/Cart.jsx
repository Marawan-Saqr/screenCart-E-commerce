import './Cart.css';
import React, { useEffect, useContext, useState } from 'react';
import { CartContext } from '../../../Contexts/cartContext';
import { Container, Row, Col, Card } from 'react-bootstrap';
import components from '../../../../../Shared/Styled-components/StyledComponents';
import { Link } from 'react-router-dom';

// Functional Component
const Cart = () => {

  // Component States
  const { cart, removeFromCart } = useContext(CartContext);
  const [subtotal, setSubTotal] = useState(0);
  const shippingCost = 5; // Shipping cost

  // UseEffect
  useEffect(() => {
    setSubTotal(() => cart.reduce((a, b) => a + (b.qty * b.price), 0));
  }, [cart]);

  return (
    <Container className="my-5">
      {cart.length > 0 ? (
        <Row className="align-items-start">
          {/* Product Cards */}
          <Col lg={8}>
            <Row>
              {cart.map((product, index) => (
                <Col key={index} sm={12} md={6} lg={6} className="mb-4">
                  <Card className="shadow-sm">
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Link to={`/website/get-by-category/${product.category}`}>{product.category}</Link>
                      <Card.Text>{product.details}</Card.Text>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-success fw-bold">
                          <strong>Price: ${product.price}</strong>
                        </span>
                        <span className="text-success fw-bold">
                          <strong>Qty: {product.qty}</strong>
                        </span>
                        <span className="badge bg-warning text-dark">
                          Rating: {product.rate}
                        </span>
                      </div>
                      <components.MainButton
                        className="mt-3"
                        onClick={() => removeFromCart(product.id)}
                      >
                        Remove
                      </components.MainButton>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>

          {/* Checkout Section */}
          <Col lg={4}>
            <div className="checkout">
              <h3 style={{textTransform: 'uppercase'}}><strong>Checkout</strong></h3>
              <p><strong>Total Items: {cart.length}</strong></p>
              <p><strong>Total Price: {subtotal.toFixed(2)}$</strong></p>
              <p><strong>Shipping: {shippingCost}$</strong></p>
              <p><strong>Grand Total: {(subtotal + shippingCost).toFixed(2)}$</strong></p>
              <components.MainButton style={{width: '100%'}}>Checkout</components.MainButton>
            </div>
          </Col>
        </Row>
      ) : (
        <div className="cart-empty">
          <h3 style={{ textTransform: 'uppercase', color: 'gray' }}>Your Cart Is Empty!!!</h3>
        </div>
      )}
    </Container>
  );
};

export default Cart;
