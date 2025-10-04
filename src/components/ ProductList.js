import React, { useEffect, useState } from "react";
import productService from "../services/productService";
import "./ProductList.css";

function ProductList({ onEdit, refresh }) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // "all", "lowStock", "outOfStock"
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [refresh]);

  const fetchProducts = () => {
    setLoading(true);
    productService.getAllProducts()
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      productService.deleteProduct(id)
        .then(() => fetchProducts())
        .catch(err => console.error(err));
    }
  };

  // Filter products based on search term and active tab
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()));

    if (activeTab === "lowStock") {
      return matchesSearch && p.quantity < 10 && p.quantity > 0;
    } else if (activeTab === "outOfStock") {
      return matchesSearch && p.quantity === 0;
    }
    return matchesSearch;
  });

  // Calculate statistics
  const totalProducts = products.length;
  const lowStockCount = products.filter(p => p.quantity < 10 && p.quantity > 0).length;
  const outOfStockCount = products.filter(p => p.quantity === 0).length;
  const inStockCount = totalProducts - lowStockCount - outOfStockCount;

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { status: "Out of Stock", class: "out-of-stock" };
    if (quantity < 5) return { status: "Low Stock", class: "low-stock" };
    if (quantity < 10) return { status: "Medium Stock", class: "medium-stock" };
    return { status: "In Stock", class: "in-stock" };
  };

  if (loading) {
    return (
      <div className="product-list-loading">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      {/* Header Section */}
      <div className="product-list-header">
        <div className="header-content">
          <h2>📦 Product Inventory</h2>
          <p>Manage your product catalog and inventory levels</p>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="quick-actions">
        <div className="action-buttons">
          <button
            className={`action-btn ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            📋 All Products ({totalProducts})
          </button>
          <button
            className={`action-btn ${activeTab === "lowStock" ? "active" : ""}`}
            onClick={() => setActiveTab("lowStock")}
          >
            ⚠️ Low Stock ({lowStockCount})
          </button>
          <button
            className={`action-btn ${activeTab === "outOfStock" ? "active" : ""}`}
            onClick={() => setActiveTab("outOfStock")}
          >
            ❌ Out of Stock ({outOfStockCount})
          </button>
        </div>
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search products by name or description..."
            className="search-input"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="products-table-container">
        <div className="table-header">
          <div className="table-info">
            Showing {filteredProducts.length} of {totalProducts} products
            {searchTerm && <span className="search-term"> for "{searchTerm}"</span>}
          </div>
          <button className="refresh-btn" onClick={fetchProducts}>
            🔄 Refresh
          </button>
        </div>

        <div className="table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Description</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => {
                  const stockStatus = getStockStatus(product.quantity);
                  return (
                    <tr key={product.id} className={`product-row ${stockStatus.class}`}>
                      <td>
                        <div className="product-info">
                          <div className="product-name">{product.name}</div>
                          <div className="product-id">ID: {product.id}</div>
                        </div>
                      </td>
                      <td>
                        <div className="product-description">
                          {product.description || "No description"}
                        </div>
                      </td>
                      <td>
                        <div className="product-price">₹{parseFloat(product.price).toFixed(2)}</div>
                      </td>
                      <td>
                        <div className="stock-quantity">
                          <span className="quantity-number">{product.quantity}</span>
                          <div className="stock-bar">
                            <div
                              className={`stock-fill ${stockStatus.class}`}
                              style={{ width: `${Math.min((product.quantity / 50) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="category-tag">
                          {product.category?.name || "Uncategorized"}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${stockStatus.class}`}>
                          {stockStatus.status}
                        </span>
                      </td>
                      <td>
                        <div className="table-action-buttons">
                          <button
                            className="edit-btn"
                            onClick={() => onEdit(product)}
                            title="Edit Product"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(product.id)}
                            title="Delete Product"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="no-products">
                    <div className="empty-state">
                      <div className="empty-icon">📦</div>
                      <h3>No products found</h3>
                      <p>
                        {searchTerm
                          ? `No products match "${searchTerm}"`
                          : activeTab !== "all"
                            ? `No ${activeTab === "lowStock" ? "low stock" : "out of stock"} products`
                            : "No products available"
                        }
                      </p>
                      {searchTerm || activeTab !== "all" ? (
                        <button
                          className="clear-search-btn"
                          onClick={() => {
                            setSearchTerm("");
                            setActiveTab("all");
                          }}
                        >
                          Show All Products
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="stat-item">
          <div className="stat-value">{totalProducts}</div>
          <div className="stat-label">Total Products</div>
        </div>
        <div className="stat-item">
          <div className="stat-value warning">{lowStockCount}</div>
          <div className="stat-label">Low Stock</div>
        </div>
        <div className="stat-item">
          <div className="stat-value danger">{outOfStockCount}</div>
          <div className="stat-label">Out of Stock</div>
        </div>
        <div className="stat-item">
          <div className="stat-value success">{inStockCount}</div>
          <div className="stat-label">In Stock</div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;