import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomePage from '../homePage/HomePage';
import "./Category.css";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const SubSubCategory = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [newSubSubCategory, setNewSubSubCategory] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 15;

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchSubSubCategories(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (selectedCategory) {
      fetchSubCategoriesByCategory(selectedCategory);
    } else {
      setSubCategories([]);
      setSelectedSubCategory("");
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    const res = await fetch("http://localhost:5003/api/categories");
    const data = await res.json();
    setCategories(data.map((c) => c.category));
  };

  const fetchSubCategoriesByCategory = async (category) => {
    const res = await fetch(`http://localhost:5003/api/subcategories/byCategory/${category}`);
    const data = await res.json();
    setSubCategories(data.map((s) => s.subCategory));
  };

  const fetchSubSubCategories = async (page = 1) => {
    const res = await fetch(`http://localhost:5003/api/subsubcategories?page=${page}&limit=${ITEMS_PER_PAGE}`);
    const result = await res.json();

    setSubSubCategories(result.data);
    setCurrentPage(result.currentPage);
    setTotalPages(result.totalPages);
  };

  const handleAdd = async () => {
    try {
      const res = await fetch("http://localhost:5003/api/subsubcategories/addSubSubCategory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subSubCategory: newSubSubCategory,
          category: selectedCategory,
          subCategory: selectedSubCategory
        }),
      });

      if (res.ok) {
        toast.success("SubSubCategory added!");
        setNewSubSubCategory("");
        fetchSubSubCategories(currentPage); // reload current page
      } else {
        toast.error("Failed to add SubSubCategory");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Delete this SubSubCategory?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (result.isConfirmed) {
      await fetch(`http://localhost:5003/api/subsubcategories/${id}`, {
        method: "DELETE",
      });
      toast.success("Deleted");
      fetchSubSubCategories(currentPage); // reload current page
    }
  };

  const handleGoBack = () => navigate(-1);

  return (
    <HomePage>
      <div className="category-section-container">
        <h3 className="category-section-header">Sub-SubCategory Management</h3>

        <div className="category-filter-control">
          <label>Category:</label>
          <select
            className="category-dropdown"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <label>SubCategory:</label>
          <select
            className="category-dropdown"
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
            disabled={!selectedCategory}
          >
            <option value="">-- Select SubCategory --</option>
            {subCategories.map((sub, i) => (
              <option key={i} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        <div className="category-input-actions">
          <input
            type="text"
            className="category-new-input"
            placeholder="Enter SubSubCategory"
            value={newSubSubCategory}
            onChange={(e) => setNewSubSubCategory(e.target.value)}
          />
          <button
            className="btn-primary"
            onClick={handleAdd}
            disabled={!selectedCategory || !selectedSubCategory}
          >
            Add SubSubCategory
          </button>
          <button className="btn-secondary" onClick={handleGoBack}>
            Cancel
          </button>
        </div>

        <div className="category-product-list">
          <table className="product-data-table">
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>SubSubCategory</th>
                <th>SubCategory</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subSubCategories.length === 0 ? (
                <tr>
                  <td colSpan="6" className="no-products-message">
                    No entries found
                  </td>
                </tr>
              ) : (
                subSubCategories.map((item, i) => (
                  <tr key={item._id}>
                    <td>{(currentPage - 1) * ITEMS_PER_PAGE + i + 1}</td>
                    <td>{item.subSubCategory}</td>
                    <td>{item.subCategory}</td>
                    <td>{item.category}</td>
                    <td className={`status-badge status-badge-${item.status.toLowerCase()}`}>
                      {item.status}
                    </td>
                    <td>
                      <button className="btn-action-delete" onClick={() => handleDelete(item._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="pagination-controls">
            <button
              className="btn-secondary"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span style={{ margin: "0 10px" }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn-secondary"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </HomePage>
  );
};

export default SubSubCategory;
