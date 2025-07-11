import React, { useState, useEffect } from 'react';
import HomePage from '../homePage/HomePage';
import ProfileCard from '../profileCard/profilecard';
import '../profile/Profile.css';
import { toast } from 'react-toastify';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    image: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = localStorage.getItem('email'); 
        const res = await fetch(`https://bagit-admin-service.onrender.com/api/admin/profile?email=${email}`);
        const data = await res.json();
        setFormData({
          name: data.name,
          number: data.mobile,
          email: data.email,
          address: data.address,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
          image: data.image
        });
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Handle form field changes
  const handleChange = (e) => {
    const { id, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      if (file) {
        setFormData((prev) => ({
          ...prev,
          image: URL.createObjectURL(file), // for preview
          imageFile: file, // actual file to send
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value
      }));
    }
  };

  // ✅ Update profile on submit
  const handleUpdate = async () => {

    const requiredFields = ['name', 'email', 'number', 'address', 'city', 'state', 'pincode'];
    for (let field of requiredFields) {
      if (!formData[field]) {
        return alert(`Please fill in the ${field} field.`);
      }
    }

    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('email', formData.email);
      form.append('mobile', formData.number);
      form.append('address', formData.address);
      form.append('city', formData.city);
      form.append('state', formData.state);
      form.append('pincode', formData.pincode);
      if (formData.imageFile) {
        form.append('image', formData.imageFile);
      }

      const res = await fetch(`https://bagit-admin-service.onrender.com/api/admin/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.number,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        })
      });

      const result = await res.json();
      if (res.ok) {
        toast.success("'Profile updated successfully!");
      } else {
        toast.alert(`Update failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  return (
    <HomePage>
      <div className="profile-main-container">
        <div className="profile-form">
          <h3 className="profile-header">My Profile</h3>

          <label htmlFor='name'>Name</label>
          <input type='text' id='name' value={formData.name} onChange={handleChange} required />

          <label htmlFor='number'>Mobile Number</label>
          <input type='tel' id='number' value={formData.number} onChange={handleChange} required maxLength={10} pattern='[0-9]{10}' />

          <label htmlFor='email'>Email</label>
          <input type='text' id='email' value={formData.email} onChange={handleChange} required />

          <label htmlFor='address'>Address</label>
          <input type='text' id='address' value={formData.address} onChange={handleChange} required />

          <label htmlFor='city'>City</label>
          <input type='text' id='city' value={formData.city} onChange={handleChange} required />

          <label htmlFor='state'>State</label>
          <input type='text' id='state' value={formData.state} onChange={handleChange} required />

          <label htmlFor='pincode'>PinCode</label>
          <input type='number' id='pincode' value={formData.pincode} onChange={handleChange} required />

          <div className="upload-group">
            <label htmlFor="image">Upload Image</label>
            <input type="file" id="image" accept="image/*" onChange={handleChange} />
          </div>

          <button className="btn secondary" onClick={handleUpdate}>Update</button>
        </div>

        <div className="profile-preview">
          <ProfileCard data={formData} />
        </div>
      </div>
    </HomePage>
  );
};

export default Profile;
