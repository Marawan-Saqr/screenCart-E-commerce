import { useEffect, useContext } from 'react';
import { CartContext } from '../../../Contexts/cartContext';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Cart = () => {
  const { cart } = useContext(CartContext);

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
                  <Card.Subtitle className="mb-2 text-muted">{product.category}</Card.Subtitle>
                  <Card.Text>
                    {product.details}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-success fw-bold">${product.price}</span>
                    <span className="badge bg-warning text-dark">Rating: {product.rate}</span>
                  </div>
                  <Button variant="danger" className="mt-3">Remove</Button>
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