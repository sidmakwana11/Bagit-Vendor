import React from 'react';
import { useNavigate } from 'react-router-dom';

const Email = () => {
  const navigate = useNavigate();

  const handleBackToShopping = () => {
    navigate(-1); // Replace with your actual route
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card border-0 shadow-lg p-4 p-md-5 text-center" style={{ maxWidth: '600px', width: '100%' }}>
        <div className="mb-4">
          <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '3rem' }}></i>
        </div>
        <h2 className="fw-bold text-success">Registration Successful</h2>
        <p className="text-secondary mt-3 mb-4">
          Thank you for registering! A confirmation email will be sent to your registered address within 2 business days.
        </p>
        <button className="btn btn-outline-primary btn-lg px-4" onClick={handleBackToShopping}>
          Back to Shopping
        </button>
      </div>
    </div>
  );
};

export default Email;
