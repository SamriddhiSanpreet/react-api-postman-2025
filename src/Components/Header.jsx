import { Container, Navbar, Nav } from "react-bootstrap";
import { useState } from "react";
import AddProduct from "./AddProduct";

function Header() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      {/* Header Navbar */}
      {/* <Container> */}
        <Navbar className="bg-dark text-white p-3 mt-2 mx-3" expand="lg">
          <Container>
            <Navbar.Brand href="/" className="text-light fs-4">
              Product
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              {/* Styled Add Product Button */}
              <Nav.Link
                onClick={handleShowModal}
                className="text-light add-product-btn rounded-circle d-flex justify-content-center align-items-center"
              >
                <span style={{fontSize:'20px'}}>Add</span>
              </Nav.Link>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      {/* </Container> */}

      {/* Trigger AddProduct Component Modal */}
      <AddProduct showModal={showModal} handleCloseModal={handleCloseModal} />
    </>
  );
}

export default Header;
