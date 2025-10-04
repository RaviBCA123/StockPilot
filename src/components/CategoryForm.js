import React, { useState, useEffect } from "react";
import categoryService from "../services/categoryService";

function CategoryForm({ selectedCategory, onSave }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Pre-fill form when editing
  useEffect(() => {
    if (selectedCategory) {
      setName(selectedCategory.name);
      setDescription(selectedCategory.description);
    } else {
      setName("");
      setDescription("");
    }
  }, [selectedCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const categoryData = { name, description };

    if (selectedCategory) {
      categoryService.updateCategory(selectedCategory.id, categoryData)
        .then(() => onSave())
        .catch(err => console.error(err));
    } else {
      categoryService.createCategory(categoryData)
        .then(() => onSave())
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="card p-3 mt-4">
      <h3>{selectedCategory ? "Edit Category" : "Add Category"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required />
        </div>

        <div className="mb-3">
          <label className="form-label">Description:</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)} />
        </div>

        <button type="submit" className="btn btn-primary">
          {selectedCategory ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}

export default CategoryForm;
