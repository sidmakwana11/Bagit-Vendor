import React, { useState, useEffect } from 'react';
import HomePage from '../homePage/HomePage';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import './team.css';

const Team = () => {
  const [allAdmins, setAllAdmins] = useState([]);
  const navigate = useNavigate();

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://bagit-admin-service.onrender.com/api/admin/related`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (res.ok) {
        setAllAdmins(data.admins);
      } else {
        toast.error(data.message || "Failed to fetch team");
      }
    } catch (error) {
      toast.error("Error fetching team");
      console.error("Fetch team error:", error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleAddStaff = () => {
    navigate("/AddStaff");
  };

 

const handleDelete = async (adminId) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this staff deletion!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e74c3c',
    cancelButtonColor: '#aaa',
    confirmButtonText: 'Yes, delete it!'
  });

  if (result.isConfirmed) {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://bagit-admin-service.onrender.com/api/admin/${adminId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        Swal.fire('Deleted!', 'Staff has been removed.', 'success');
        fetchAdmins(); // Refresh list
      } else {
        toast.error(data.message || "Failed to delete staff");
      }
    } catch (err) {
      toast.error("Error deleting staff");
      console.error("Delete error:", err);
    }
  }
};

  return (
    <HomePage>
      <div className="admin-container">
        <h3 className="Admin-header">Team</h3>
        <div className="admins">
          <div className="admins-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allAdmins.map((admin) => (
                  <tr key={admin._id}>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    <td>
                      <button className="delete-btn" onClick={() => handleDelete(admin._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <button className="btn secondary" onClick={handleAddStaff}>Add Staff</button>
      </div>
    </HomePage>
  );
};

export default Team;
