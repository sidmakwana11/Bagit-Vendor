import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import './AddProducts.css';
import HomePage from '../homePage/HomePage';
import ProductCard from './ProductCard';
import CategoryDropdown from '../../components/categoryDropdown/CategoryDropdown';

const UpdateProducts = () => {
  const location = useLocation();
  const productToEdit = location.state?.product;

  const [product, setProduct] = useState({
    title: productToEdit?.name || '',
    description: productToEdit?.description || '',
    category: productToEdit?.category || '',
    price: productToEdit?.price || '',
    quantity: productToEdit?.quantity || '',
    image: productToEdit?.image || '', // can be URL or File
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, name, value, type, files } = e.target;

    if (type === 'file') {
      const file = files[0];
      if (file) {
        setProduct(prev => ({
          ...prev,
          image: file // store File object
        }));
      }
    } else {
      const key = id || name;
      setProduct(prev => ({
        ...prev,
        [key]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", product.title);
      formData.append("description", product.description);
      formData.append("category", product.category);
      formData.append("price", product.price);
      formData.append("quantity", product.quantity);

      if (product.image instanceof File) {
        formData.append("image", product.image);
      }

      const res = await fetch(`https://bagit-product-service.onrender.com/api/products/update/${productToEdit._id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Can't Update product");
      } else {
        toast.success("Product Updated successfully");
        navigate("/Products");
      }
    } catch (err) {
      toast.error("Something went wrong, Couldn't Update product.");
      console.error(err);
    }
  };

  const handleCancel = () => {
    navigate("/Products");
  };

  return (
    <HomePage>
      <div className="products-main-container">
        <div className="products-cards">
          <div className="products-header">
            <h3>Update Product</h3>
          </div>

          <label htmlFor="title">Add Title</label>
          <input
            type="text"
            id="title"
            placeholder="Product title"
            value={product.title}
            onChange={handleChange}
          />

          <label htmlFor="description">Enter Description</label>
          <input
            type="text"
            id="description"
            placeholder="Enter Description"
            value={product.description}
            onChange={handleChange}
          />

          <label>Select Category</label>
          <CategoryDropdown
            onSelect={(selected) => {
              setProduct(prev => ({
                ...prev,
                category: selected.subSubCategory || selected.subCategory || selected.category
              }));
            }}
            defaultValues={{
              category: product.category
            }}
          />

          <label htmlFor="price">Enter Price</label>
          <input
            type="number"
            id="price"
            placeholder="Enter Price"
            value={product.price}
            onChange={handleChange}
          />

          <label htmlFor="quantity">Enter Quantity</label>
          <input
            type="number"
            id="quantity"
            placeholder="Enter quantity"
            value={product.quantity}
            onChange={handleChange}
          />

          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleChange}
          />

          {product.image && (
            <img
              src={product.image instanceof File ? URL.createObjectURL(product.image) : product.image}
              alt="Preview"
              style={{ width: "100px", marginTop: "10px" }}
            />
          )}

          <button className="btn secondary" onClick={handleSubmit}>
            Update Product
          </button>
          <button className="btn secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>

        <div className="product-preview">
          <ProductCard data={product} />
        </div>
      </div>
    </HomePage>
  );
};

export default UpdateProducts;
