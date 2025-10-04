import React, { useState } from "react";
import CategoryForm from "../components/CategoryForm";
import CategoryList from "../components/CategoryList";
import "../components/CategoriesPage.css";

function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [activeTab, setActiveTab] = useState("all"); // "all", "active", "archived"

  const handleEdit = (category) => {
    setSelectedCategory(category);
    const formSection = document.getElementById('form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSave = () => {
    setSelectedCategory(null);
    setRefresh(!refresh);
  };

  const handleCancel = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="categories-page">
      {/* Header Section */}
      <div className="categories-header">
        <div className="header-content">
          <h1>📁 Category Management</h1>
          <p>{selectedCategory ? 'Edit Category' : 'Add new categories and manage existing ones'}</p>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="quick-actions">
        <div className="action-buttons">
          <button
            className={`action-btn ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            📂 All Categories
          </button>
          <button
            className={`action-btn ${activeTab === "active" ? "active" : ""}`}
            onClick={() => setActiveTab("active")}
          >
            ✅ Active
          </button>
          <button
            className={`action-btn ${activeTab === "archived" ? "active" : ""}`}
            onClick={() => setActiveTab("archived")}
          >
            📦 Archived
          </button>
        </div>
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search categories..."
            className="search-input"
          />
        </div>
      </div>

      <div className="categories-content">
        {/* Form Section */}
        <div className={`form-section ${selectedCategory ? 'editing' : ''}`} id="form-section">
          <div className="form-container">
            <div className="section-header">
              <span className="section-icon">
                {selectedCategory ? '✏️' : '➕'}
              </span>
              <h2>{selectedCategory ? 'Edit Category' : 'Add New Category'}</h2>
              {selectedCategory && (
                <button className="cancel-btn" onClick={handleCancel}>
                  ✕ Cancel
                </button>
              )}
            </div>
            <CategoryForm
              selectedCategory={selectedCategory}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>

          {/* Quick Tips Section */}
          <div className="tips-section">
            <h3>💡 Quick Tips</h3>
            <ul>
              <li>Use descriptive category names</li>
              <li>Keep categories organized hierarchically</li>
              <li>Archive unused categories instead of deleting</li>
              <li>Use consistent naming conventions</li>
            </ul>
          </div>
        </div>

        {/* List Section */}
        <div className={`list-section ${selectedCategory ? 'editing' : ''}`}>
          <div className="list-container">
            <div className="section-header">
              <div className="header-left">
                <span className="section-icon">📋</span>
                <h2>
                  {activeTab === "all" && "All Categories"}
                  {activeTab === "active" && "Active Categories"}
                  {activeTab === "archived" && "Archived Categories"}
                </h2>
              </div>
              <div className="header-controls">
                <span className="status-badge">
                  {refresh ? '🔄 Latest' : '📊 Loaded'}
                </span>
                <button className="refresh-btn" onClick={() => setRefresh(!refresh)}>
                  🔄 Refresh
                </button>
              </div>
            </div>

            {/* Filter Status */}
            <div className="filter-status">
              Showing: <span className="filter-tag">{activeTab}</span> categories
            </div>

            <CategoryList key={refresh} onEdit={handleEdit} />
          </div>
        </div>
      </div>

      {/* Empty State Guidance (appears when no categories) */}
      <div className="empty-guidance">
        <div className="guidance-content">
          <h3>🚀 Get Started with Categories</h3>
          <p>Categories help you organize your inventory efficiently. Here's how to begin:</p>
          <div className="guidance-steps">
            <div className="step">
              <span className="step-number">1</span>
              <p>Create your main product categories</p>
            </div>
            <div className="step">
              <span className="step-number">2</span>
              <p>Add subcategories for better organization</p>
            </div>
            <div className="step">
              <span className="step-number">3</span>
              <p>Assign products to relevant categories</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;