import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './Register.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: '',
    email: "",
    address: '',
    city: '',
    state: '',
    pincode: '',
    image: '',
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, type, files } = e.target;

    if (type === 'file') {
      const file = files[0];
      if (file) {
        setFormData(prev => ({
          ...prev,
          image: URL.createObjectURL(file)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [id]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("https://bagit-admin-service.onrender.com/api/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          mobile: formData.number,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          image: formData.image, 
        }),
      });
    
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Registration failed");
      } else {
        toast.success("Welcome to the Admin Panel!");
        localStorage.setItem("admin", JSON.stringify(data.admin));
        localStorage.setItem('email', JSON.stringify(data.email));
        navigate("/MailConfirmation");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  const handleNavigate = () => {
    window.location.href = 'http://localhost:3001/';
  };

  return (
    <div className="admin-register-container">
      <form className="admin-register-form" onSubmit={handleSubmit}>
        <h2>Vendor Registration</h2>
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your username"
              required
              value={formData.name}
              onChange={handleChange}
            /> 
          </div>
          <div className="input-group">
            <label htmlFor="number">Mobile Number</label>
            <input
              type="tel"
              id="number"
              name="mobile"
              placeholder="Enter your Mobile no."
              onChange={handleChange}
              maxLength={10}
              pattern="[0-9]{10}"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Enter your Address"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              placeholder="Enter city"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              placeholder="Enter State"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="pincode">PinCode</label>
            <input
              type="number"
              id="pincode"
              placeholder="Enter PinCode"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>



        <button type="submit" className="register-btn">Register</button>

        <h4 className="login-navigate">Already a member?<Link to={'/'}> Login</Link></h4>

        <button className='User-tab' onClick={handleNavigate}>Back to Shopping</button>
      </form>
    </div>
  );
};

export default RegisterForm;
