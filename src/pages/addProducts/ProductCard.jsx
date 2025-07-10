import React from 'react';
import './AddProducts.css';

const ProductCard = ({ data }) => {
  return (
    <div className="product-preview-card">
      {data.image && typeof data.image !== "string" && (
        <img
          src={URL.createObjectURL(data.image)}
          alt="preview"
          className="preview-img"
        />
      )}
      {typeof data.image === "string" && (
        <img
          src={data.image}
          alt="preview"
          className="preview-img"
        />
      )}
      <h2>{data.title || "Product Title"}</h2>
      <p><strong>Description:</strong> {data.description || "Product Description"}</p>
      <p><strong>Category:</strong> {data.category || "Category"}</p>
      <p><strong>Price:</strong> ₹{data.price || "0.00"}</p>
      <p><strong>Status:</strong> {data.status || "Available"}</p>
      <button className="btn primary">Add to Cart</button>
      <button className="btn secondary">Wishlist</button>
    </div>
  );
};

export default ProductCard;
