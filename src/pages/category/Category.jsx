import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomePage from '../homePage/HomePage';
import './Category.css';
import { toast } from 'react-toastify';
import Swal from "sweetalert2";

const Category = () => {
    const [allCategories, setAllCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editedCategoryName, setEditedCategoryName] = useState('');
    const navigate = useNavigate();

    const extractUniqueCategoryNames = (data) => {
        const unique = [...new Set(data.map(item => item.category))];
        setCategories(unique);
    };

    const fetchCategories = async () => {
        try {
            const res = await fetch("http://localhost:5003/api/categories");
            const data = await res.json();
            setAllCategories(data);
            setFilteredCategories(data);
            extractUniqueCategoryNames(data);
        } catch (err) {
            console.error("Failed to fetch categories", err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (!selectedCategory) {
            setFilteredCategories(allCategories);
        } else {
            const filtered = allCategories.filter(item => item.category === selectedCategory);
            setFilteredCategories(filtered);
        }
    }, [selectedCategory, allCategories]);

    const handleEditClick = (category) => {
        setEditingId(category._id);
        setEditedCategoryName(category.category);
    };

    const handleEditSave = async (id) => {
        if (!editedCategoryName.trim()) {
            toast.error("Please enter a valid category name.");
            return;
        }

        try {
            const res = await fetch(`http://localhost:5003/api/categories/update/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ category: editedCategoryName.trim() }),
            });

            if (res.ok) {
                toast.success("Category updated successfully!");
                setEditingId(null);
                setEditedCategoryName('');
                fetchCategories();
            } else {
                toast.error("Failed to update category.");
            }
        } catch (err) {
            console.error("Error updating category:", err);
            toast.error("An error occurred while updating.");
        }
    };

    const handleAddCategory = async () => {
        if (!newCategory.trim()) {
            toast.error("Please enter a category name.");
            return;
        }
        console.log("New Category Payload:", { category: newCategory });

        try {
            const res = await fetch("http://localhost:5003/api/categories/addCategory", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ category: newCategory.trim() }),
            });

            const result = await res.json();

            if (res.ok) {
                await fetchCategories();
                setNewCategory("");
                toast.success("Category added successfully!");
            } else {
                toast.error(result.message || "Failed to add category");
            }
        } catch (err) {
            console.error("Failed to add category", err);
            toast.error("An error occurred while adding the category.");
        }
    };

    const handleSubcategorynavigate = () => {
        navigate("/SubCategory");
    };

    const handleSubSubcategorynavigate = () => {
        navigate("/SubSubCategory");
    };

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Delete this Category?',
                text: 'Category will be deleted from the list!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#007bff',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Delete',
            });

            if (result.isConfirmed) {
                const res = await fetch(`http://localhost:5003/api/categories/${id}`, {
                    method: 'DELETE',
                });

                if (res.ok) {
                    await fetchCategories();
                    toast.success("Category Deleted Successfully!");
                } else {
                    toast.error("Failed to delete Category");
                }
            }
        } catch (err) {
            toast.error("Failed to delete Category");
            console.error(err);
        }
    };

    return (
        <HomePage>
            <div className="category-section-container">
                <h3 className="category-section-header">Category Management</h3>

                <div className="category-filter-control">
                    <label htmlFor="category-select">Select Category:</label>
                    <select
                        name="category"
                        id="category-select"
                        className="category-dropdown"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">-- All Categories --</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="category-input-actions">
                    <input
                        type="text"
                        placeholder="Add new category"
                        className="category-new-input"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={handleAddCategory}
                        className="btn-primary"
                    >
                        Add Category
                    </button>
                    <button
                        type="button"
                        onClick={handleSubcategorynavigate}
                        className="btn-secondary"
                    >
                        Add SubCategory
                    </button>
                    <button
                        type="button"
                        onClick={handleSubSubcategorynavigate}
                        className="btn-tertiary"
                    >
                        Add SubSubCategory
                    </button>
                </div>

                <div className="category-product-list">
                    <table className="product-data-table">
                        <thead>
                            <tr>
                                <th>Sr No.</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCategories.map((category, index) => (
                                <tr key={category._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {editingId === category._id ? (
                                            <input
                                                type="text"
                                                value={editedCategoryName}
                                                onChange={(e) => setEditedCategoryName(e.target.value)}
                                            />
                                        ) : (
                                            category.category
                                        )}
                                    </td>
                                    <td className={`status-badge status-badge-${(category.status || "active").toLowerCase()}`}>
                                        {category.status || "Active"}
                                    </td>
                                    <td>
                                        {editingId === category._id ? (
                                            <button className="btn-action-save" onClick={() => handleEditSave(category._id)}>Save</button>
                                        ) : (
                                            <button className="btn-action-edit" onClick={() => handleEditClick(category)}>Edit</button>
                                        )}
                                        <button className="btn-action-delete" onClick={() => handleDelete(category._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            {filteredCategories.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="no-Category-message">No Category found for the selected filter.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </HomePage>
    );
};

export default Category;