import React, { useEffect, useState } from "react";
import categoryService from "../services/categoryService";

function CategoryList({ onEdit }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    categoryService.getAllCategories()
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      categoryService.deleteCategory(id)
        .then(() => fetchCategories())
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="mt-4">
      <h3>Category List</h3>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th style={{width:"150px"}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.name}</td>
              <td>{cat.description}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit(cat)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(cat.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {categories.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">No categories found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryList;
