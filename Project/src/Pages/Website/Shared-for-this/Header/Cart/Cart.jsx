import './Cart.css';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import components from '../../../../../Shared/Styled-components/StyledComponents';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { emptyCart, removeFromCart } from '../../../../../Redux/slices/cart.slice';
import useAuth from '../../../../../Hooks/Auth';
import Swal from 'sweetalert2';
import axios from 'axios';

const Cart = () => {

  // Component States
  const dispatch = useDispatch();
  const { redirect, isLoggedIn } = useAuth();
  const cart = useSelector(state => state.cart.cartItems);
  const user = useSelector(state => state.loginWebsite.userData);
  const [subtotal, setSubTotal] = useState(0);
  const shippingCost = 5;


  // Calculate total quantity of items (including duplicates)
  const totalItems = cart.reduce((acc, product) => acc + product.qty, 0);

  // useEffect
  useEffect(() => {
    setSubTotal(() => cart.reduce((a, b) => a + (b.qty * b.price), 0));
  }, [cart, shippingCost]);

  const checkout = () => {
    if (!isLoggedIn) {
      redirect();
      return;
    }
  
    Swal.fire({
      title: "Are you sure?",
      text: "You Will Order These Product.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.post("http://localhost:3001/orders", {
          userId: user.id,
          userName: user.name,
          products: cart,
          createdAt: Date.now()
        }).then(() => {
          Swal.fire({
            title: "Confirmed!",
            text: "Your Order has been Booked.",
            icon: "success"
          });
          dispatch(emptyCart());
        });
      }
    });
  };
  

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
                        onClick={() => dispatch(removeFromCart(product.id))}
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
              <p><strong>Total Items: {totalItems}</strong></p>  {/* Updated to show total quantity */}
              <p><strong>Total Price: {subtotal.toFixed(2)}$</strong></p>
              <p><strong>Shipping: {shippingCost}$</strong></p>
              <p><strong>Grand Total: {(subtotal + shippingCost).toFixed(2)}$</strong></p>
              <components.MainButton onClick={checkout} style={{width: '100%'}}>Checkout</components.MainButton>
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