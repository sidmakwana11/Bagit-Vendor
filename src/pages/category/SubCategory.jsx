// ==== FRONTEND: SubCategory.jsx ====
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomePage from '../homePage/HomePage';
import './Category.css';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const SubCategory = () => {
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [newSubCategory, setNewSubCategory] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('http://localhost:5003/api/categories');
                const data = await res.json();
                setCategories(data);
            } catch (err) {
                console.error("Error fetching categories", err);
            }
        };
        const fetchSubCategories = async () => {
            try {
                const res = await fetch('http://localhost:5003/api/subcategories');
                const data = await res.json();
                setSubCategories(data);
            } catch (err) {
                console.error("Error fetching subcategories", err);
            }
        };

        fetchCategories();
        fetchSubCategories();
    }, []);

    const handleAddSubCategory = async () => {
        if (!selectedCategory) {
            toast.error("Please select a parent category first.");
            return;
        }

        if (!newSubCategory.trim()) {
            toast.error("Please enter a valid subcategory name.");
            return;
        }

        try {
            const res = await fetch("http://localhost:5003/api/subcategories/addSubCategory", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subCategory: newSubCategory, category: selectedCategory })
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("SubCategory added successfully!");
                setSubCategories(prev => [...prev, data.newSubCategory]);
                setNewSubCategory('');
            } else {
                toast.error(data.error || "Failed to add subcategory.");
            }
        } catch (err) {
            toast.error("Error while adding subcategory.");
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Delete this SubCategory?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, Delete',
                confirmButtonColor: '#007bff',
                cancelButtonColor: '#d33',
            });

            if (result.isConfirmed) {
                const res = await fetch(`http://localhost:5003/api/subcategories/${id}`, {
                    method: 'DELETE',
                });

                if (res.ok) {
                    setSubCategories(prev => prev.filter(sc => sc._id !== id));
                    toast.success("SubCategory deleted successfully!");
                } else {
                    toast.error("Failed to delete subcategory.");
                }
            }
        } catch (err) {
            toast.error("Failed to delete subcategory.");
            console.error(err);
        }
    };

    return (
        <HomePage>
            <div className="category-section-container">
                <h3 className="category-section-header">SubCategory Management</h3>

                <div className="category-filter-control">
                    <label htmlFor="category-select">Parent Category:</label>
                    <select
                        id="category-select"
                        className="category-dropdown"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">-- Select Category --</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat.category}>{cat.category}</option>
                        ))}
                    </select>
                </div>

                <div className="category-input-actions">
                    <input
                        type="text"
                        placeholder="Add new subcategory"
                        className="category-new-input"
                        value={newSubCategory}
                        onChange={(e) => setNewSubCategory(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={handleAddSubCategory}
                        className="btn-primary"
                        disabled={!selectedCategory}
                    >
                        Add SubCategory
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/SubSubCategory")}
                        className="btn-tertiary"
                    >
                        Add SubSubCategory
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="btn-secondary"
                    >
                        Cancel
                    </button>
                </div>

                <div className="category-product-list">
                    <table className="product-data-table">
                        <thead>
                            <tr>
                                <th>Sr No.</th>
                                <th>SubCategory</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subCategories.map((sc, index) => (
                                <tr key={sc._id}>
                                    <td>{index + 1}</td>
                                    <td>{sc.subCategory}</td>
                                    <td>{sc.category}</td>
                                    <td className={`status-badge status-badge-${(sc.status || '').toLowerCase()}`}>{sc.status}</td>
                                    <td>
                                        {/* You can add edit logic here */}
                                        <button className="btn-action-delete" onClick={() => handleDelete(sc._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            {subCategories.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="no-products-message">
                                        No subcategories found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </HomePage>
    );
};

export default SubCategory;
