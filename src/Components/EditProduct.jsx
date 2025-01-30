import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { singleProductAsync, updateProductAsync } from "../services/actions/product.Action";
import { useNavigate, useParams } from "react-router";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, isUpdated } = useSelector(state => state.productReducer);
  const [productInput, setProductInput] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    description: "",
  });

  const handelChanged = (e) => {
    const { name, value } = e.target;
    setProductInput({
      ...productInput,
      [name]: value,
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProductAsync(productInput));
  };

  useEffect(() => {
    dispatch(singleProductAsync(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (product) setProductInput(product);
  }, [product]);

  useEffect(() => {
    if (isUpdated) {
      navigate("/");
    }
  }, [isUpdated, navigate]);

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-lg">
            <Card.Body>
              <h3 className="text-center mb-4">Edit Product</h3>
              <Form onSubmit={handelSubmit}>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="3">
                    Product Name
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      name="name"
                      value={productInput.name}
                      onChange={handelChanged}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="3">
                    Product Category
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      placeholder="Enter Category"
                      name="category"
                      value={productInput.category}
                      onChange={handelChanged}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="3">
                    Product Price
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="number"
                      placeholder="Enter Price"
                      name="price"
                      value={productInput.price}
                      onChange={handelChanged}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="3">
                    Product Description
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      placeholder="Enter Description"
                      name="description"
                      value={productInput.description}
                      onChange={handelChanged}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Col sm={{ span: 9, offset: 3 }}>
                    <Button variant="primary" type="submit" className="w-100">
                      Update Product
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProduct;
