import React from 'react';
import '../profile/Profile.css';

const ProfileCard = ({ data }) => {
  return (
    <div className="profile-card">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM0nI6o9l7fyionBcUIlUC15MjBMqIOIcmTQ&s" alt="Profile" />
      <h2>{data.name || "Your Name"}</h2>
      <p><strong>Mobile:</strong> {data.number || "0000000000"}</p>
      <p><strong>Email:</strong> {data.email || "your@email.com"}</p>
      <p><strong>Address:</strong> {data.address || "Your Address"}</p>
      <p><strong>City:</strong> {data.city || "City"}</p>
      <p><strong>State:</strong> {data.state || "State"}</p>
      <p><strong>PinCode:</strong> {data.pincode || "000000"}</p>
    </div>
  );
};

export default ProfileCard;
