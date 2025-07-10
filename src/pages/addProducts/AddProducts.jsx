import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import './AddProducts.css';
import HomePage from '../homePage/HomePage';
import ProductCard from './ProductCard';
import CategoryDropdown from '../../components/categoryDropdown/CategoryDropdown';
import { jwtDecode } from 'jwt-decode';

const AddProducts = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    category: '',
    subCategory: '',
    subSubCategory: '',
    price: '',
    quantity: '',
    image: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, name, value, type, files } = e.target;

    if (type === 'file') {
      const file = files[0];
      if (file) {
        setProduct(prev => ({
          ...prev,
          image: file 
        }));
      }
    }
     else {
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
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login again.");
        return;
      }
  
      const decoded = jwtDecode(token);
      const userId = decoded?.id;
  
      if (!userId) {
        toast.error("Invalid token. Please login again.");
        return;
      }
  
      const formData = new FormData();
      formData.append("name", product.title);
      formData.append("description", product.description);
      formData.append("category", product.category);
      formData.append("subCategory", product.subCategory);
      formData.append("subSubCategory", product.subSubCategory);
      formData.append("price", product.price);
      formData.append("quantity", product.quantity);
      formData.append("userId", userId);
      formData.append("image", product.image); 
  
      const res = await fetch("http://localhost:5001/api/products/addproduct", {
        method: "POST",
        body: formData, 
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        toast.error(data.message || "Can't add product");
      } else {
        toast.success("Product added successfully");
        navigate("/Products");
      }
    } catch (err) {
      toast.error("Something went wrong, Couldn't add product.");
      console.error(err);
    }
  };
   

  return (
    <HomePage>
      <div className="products-main-container">
        <div className="products-cards">
          <div className="products-header">
            <h3>Add Products</h3>
          </div>

          <label htmlFor="title">Add Title</label>
          <input type="text" id="title" placeholder="Product title" onChange={handleChange} />

          <label htmlFor="description">Enter Description</label>
          <input type="text" id="description" placeholder="Enter Description" onChange={handleChange} />

          <label>Select Category</label>
          <CategoryDropdown onSelect={(selected) => {
            setProduct(prev => ({
              ...prev,
              category: `${selected.subSubCategory}`
            }));
          }} />

          <label htmlFor="price">Enter Price</label>
          <input type="number" id="price" placeholder="Enter Price" onChange={handleChange} />

          <div className="quantity-image-row">
            <div className="quantity-group">
              <label htmlFor="quantity">Enter Quantity  </label>
              <input type="number" id="quantity" placeholder="Enter quantity" onChange={handleChange} />
            </div>

            <div className="upload-group">
              <label htmlFor="image">Upload Image  </label>
              <input type="file" id="image" accept="image/*" onChange={handleChange} />
            </div>
          </div>

          <button className="btn secondary" onClick={handleSubmit}>Add Product</button>
        </div>

        <div className="product-preview">
          <ProductCard data={product} />
        </div>
      </div>
    </HomePage>
  );
};

export default AddProducts;
