import React, { useEffect, useContext } from 'react';
import { CartContext } from '../../../Contexts/cartContext';
import { Container, Row, Col, Card } from 'react-bootstrap';
import components from '../../../../../Shared/Styled-components/StyledComponents';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <Container className="my-5">
      {cart.length > 0 ? (
        <Row>
          {cart.map((product, index) => (
            <Col key={index} sm={12} md={6} lg={4} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Link to={`/website/get-by-category/${product.category}`}>{product.category}</Link>
                  <Card.Text>
                    {product.details}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-success fw-bold"><strong>Price: ${product.price}</strong></span>
                    <span className="text-success fw-bold"><strong>Qty: {product.qty}</strong></span>
                    <span className="badge bg-warning text-dark">Rating: {product.rate}</span>
                  </div>
                  <components.MainButton className="mt-3" onClick={() => removeFromCart(product.id)}>Remove</components.MainButton>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className='cart-empty'>
          <h3 style={{textTransform: 'uppercase', color: 'gray'}}>Your Cart Is Empty!!!</h3>
        </div>
      )}
    </Container>
  );
};

export default Cart;
