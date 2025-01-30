import { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addProductAsync } from "../services/actions/product.Action";
import generateUniqueId from "generate-unique-id";

function AddProduct({ showModal, handleCloseModal }) {
  const dispatch = useDispatch();
  const [productInput, setProductInput] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    imageUrl: "", // Add imageUrl state
  });

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setProductInput({
      ...productInput,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let id = generateUniqueId({
      length: 3,
      useLetters: false,
    });
    dispatch(addProductAsync({ ...productInput, id }));
    handleCloseModal(); // Close modal after submitting
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Existing input fields */}
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
                onChange={handleChanged}
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
                onChange={handleChanged}
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
                onChange={handleChanged}
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
                onChange={handleChanged}
              />
            </Col>
          </Form.Group>

          {/* New Image URL input */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              Product Image URL
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                placeholder="Enter Image URL"
                name="imageUrl"
                value={productInput.imageUrl}
                onChange={handleChanged}
              />
            </Col>
          </Form.Group>

          {/* Display the image if imageUrl is provided */}
          {productInput.imageUrl && (
            <div className="mb-3 text-center">
              <img
                src={productInput.imageUrl}
                alt="Product"
                style={{ maxWidth: "100%", height: "auto", borderRadius: "5px" }}
              />
            </div>
          )}

          <Form.Group as={Row} className="mb-3">
            <Col sm="12" className="d-flex justify-content-end">
              <Button type="submit" variant="success">
                Add Product
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddProduct;
