import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductAsync, getAllProductsAsync } from "../services/actions/product.Action";
import { useNavigate } from "react-router";

function Home() {
  const { products, isLoading } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };
  const handleDelete = (id) => {
    dispatch(deleteProductAsync(id));
  };

  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, [dispatch]);

  return (
    <div
      className="container my-5">
      <div className="row">
        {isLoading ? (
          <h2 className="text-center text-info py-5">Loading...</h2>
        ) : products.length === 0 ? (
          <h4 className="text-center py-5">No Products Found</h4>
        ) : (
          products.map((product) => (
            <div className="col-md-3 mb-4" key={product.id}>
              <div
                className="card shadow-lg border-0 rounded"
                style={{
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="card-img-top"
                  style={{
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "15px 15px 0 0",
                  }}
                />
                <div className="card-body p-3">
                  <h5 className="card-title" style={{ fontSize: "1.1rem" }}>
                    {product.name}
                  </h5>
                  <p className="card-text" style={{ fontSize: "0.9rem" }}>
                    {product.description}
                  </p>
                  <p className="card-text">
                    <strong>Category:</strong> {product.category}
                  </p>
                  <p className="card-text">
                    <strong>Price:</strong> ${product.price}
                  </p>
                  <div className="d-flex justify-content-between mt-2">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEdit(product.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
