import "./MyOrders.css";
import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useGetAllOrdersQuery } from "../../../Redux/queries/website.query";
import Swal from "sweetalert2";

const MyOrders = () => {
  const { data: orders } = useGetAllOrdersQuery();

  const shippingCost = 5;

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  return (
    <div className="my-orders">
      <Container className="my-4">
        {orders && orders.length > 0 ? (
          <Row>
            {orders.map((order, index) => {
              const totalPrice = order.products.reduce(
                (acc, product) => acc + product.price * product.qty,
                0
              );
              const grandTotal = totalPrice + shippingCost;

              return (
                <Col key={index} sm={12} md={6} lg={12} className="mb-4">
                  <Card className="shadow-sm card-shadow">
                    <Card.Body>
                      <Card.Title>
                        <strong>Order #{order.id}</strong>
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        <strong>Date:</strong>{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </Card.Subtitle>
                      <div>
                        {order.products.map((product, idx) => (
                          <div key={idx} className="mb-3">
                            <Card>
                              <Row>
                                <Col md={4}>
                                  <Card.Img
                                    variant="top"
                                    src={
                                      "http://localhost:3001/images/" +
                                      product.productImage
                                    }
                                    className="img-fluid"
                                    alt={product.name}
                                    style={{ width: "100%", height: "auto" }}
                                  />
                                </Col>
                                <Col md={8}>
                                  <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>
                                      <strong>Details:</strong> {product.details}
                                    </Card.Text>
                                    <Card.Text>
                                      <strong>Price:</strong> $
                                      {product.price.toFixed(2)}
                                    </Card.Text>
                                    <Card.Text>
                                      <strong>Category:</strong>{" "}
                                      {product.category}
                                    </Card.Text>
                                    <Card.Text>
                                      <strong>Rating:</strong> {product.rate} ⭐
                                    </Card.Text>
                                    <Card.Text>
                                      <strong>Quantity:</strong>{" "}
                                      {product.qty}
                                    </Card.Text>
                                  </Card.Body>
                                </Col>
                              </Row>
                            </Card>
                          </div>
                        ))}
                      </div>

                      <div className="d-flex justify-content-between">
                        <p className="fw-bold">
                          Total Price: ${totalPrice.toFixed(2)}
                        </p>
                      </div>

                      <div className="d-flex justify-content-between">
                        <p className="fw-bold">
                          Shipping: ${shippingCost.toFixed(2)}
                        </p>
                      </div>

                      <div className="d-flex justify-content-between">
                        <p className="fw-bold">
                          Grand Total: ${grandTotal.toFixed(2)}
                        </p>
                      </div>

                      <Button
                        variant="info"
                        onClick={() =>
                          Swal.fire({
                            title: "Order Details",
                            text: `Order ID: ${order.id}`,
                            icon: "info",
                          })
                        }
                      >
                        View Details
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        ) : (
          <div className="text-center">
            <h3 style={{ color: "gray" }}>You have no orders yet!</h3>
          </div>
        )}
      </Container>
    </div>
  );
};

export default MyOrders;
