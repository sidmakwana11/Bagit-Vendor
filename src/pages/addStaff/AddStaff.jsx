import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './AddStaff.css';

const AddStaff = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    image: null,
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
          image: file // save the actual File object, not URL
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
      const adminStr = localStorage.getItem("admin");
      const admin = adminStr ? JSON.parse(adminStr) : null;
      const token = localStorage.getItem("token");
  
      if (!admin && !token) {
        toast.error("User not authenticated");
        return;
      }
  
      const res = await fetch("http://localhost:5000/api/admin/staff/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
          createdBy: admin.id, 
        }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        toast.error(data.message || "Adding staff failed");
      } else {
        toast.success("Staff added successfully!");
        navigate("/Team");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error("Add Staff error:", err);
    }
  };
  

  const handleNavigate = () => {
    navigate("/Team");
  };

  return (
    <div className="addadmin-container">
      <form className="addadmin-form" onSubmit={handleSubmit}>
        <h2>Staff Registration</h2>
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter username"
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
              placeholder="Enter Mobile no."
              maxLength={10}
              pattern="[0-9]{10}"
              required
              value={formData.number}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
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
              placeholder="Enter Address"
              required
              value={formData.address}
              onChange={handleChange}
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
              required
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              placeholder="Enter State"
              required
              value={formData.state}
              onChange={handleChange}
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
              required
              value={formData.pincode}
              onChange={handleChange}
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
              placeholder="Enter password"
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
              placeholder="Confirm password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="AddAdmin-btn">Add Staff</button>
        <button type="button" className="Cancel" onClick={handleNavigate}>Cancel</button>
      </form>
    </div>
  );
};

export default AddStaff;
