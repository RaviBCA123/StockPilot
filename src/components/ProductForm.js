import React, { useState, useEffect } from "react";
import productService from "../services/productService";
import categoryService from "../services/categoryService";

function ProductForm({ selectedProduct, onSave }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  // Load categories for dropdown
  useEffect(() => {
    categoryService.getAllCategories()
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  // Pre-fill form when editing
  useEffect(() => {
    if (selectedProduct) {
      setName(selectedProduct.name);
      setDescription(selectedProduct.description);
      setPrice(selectedProduct.price);
      setQuantity(selectedProduct.quantity);
      setCategoryId(selectedProduct.category?.id || "");
    } else {
      setName(""); setDescription(""); setPrice(""); setQuantity(""); setCategoryId("");
    }
  }, [selectedProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      name,
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      category: { id: parseInt(categoryId) }
    };

    if (selectedProduct) {
      productService.updateProduct(selectedProduct.id, productData)
        .then(() => onSave())
        .catch(err => console.error(err));
    } else {
      productService.createProduct(productData)
        .then(() => onSave())
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="card shadow-sm p-4" style={{ width: "600px" }}>
        <h3 className="mb-3">{selectedProduct ? "Edit Product" : "Add Product"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description:</label>
            <input
              type="text"
              className="form-control"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Price ($):</label>
            <input
              type="number"
              className="form-control"
              value={price}
              onChange={e => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Quantity:</label>
            <input
              type="number"
              className="form-control"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category:</label>
            <select
              className="form-select"
              value={categoryId}
              onChange={e => setCategoryId(e.target.value)}
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            {selectedProduct ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
