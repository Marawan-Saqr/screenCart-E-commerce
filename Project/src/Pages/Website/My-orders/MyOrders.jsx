import "./MyOrders.css";
import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useGetAllOrdersQuery } from "../../../Redux/queries/products.query";
import Swal from "sweetalert2";

const MyOrders = () => {
  const { data: orders } = useGetAllOrdersQuery();

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  return (
    <div className="my-orders">
      <Container className="my-5">
        {orders && orders.length > 0 ? (
          <Row>
            {orders.map((order, index) => (
              <Col key={index} sm={12} md={6} lg={4} className="mb-4">
                <Card className="shadow-sm">
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
                                  src={product.productImage}
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
                                    <strong>Price:</strong> ${product.price}
                                  </Card.Text>
                                  <Card.Text>
                                    <strong>Category:</strong>{" "}
                                    {product.category}
                                  </Card.Text>
                                  <Card.Text>
                                    <strong>Rating:</strong> {product.rate} ⭐
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
                        Total Price: ${order.totalPrice ? order.price.toFixed(2) : '0.00'}
                      </p>
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
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
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