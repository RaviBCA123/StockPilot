import React, { useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ ProductList";
import Dashboard from "../components/Dashboard";
function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleSave = () => {
    setSelectedProduct(null);
    setRefresh(!refresh); // refresh product list
  };

  return (
     <div className="container mt-4">
          <Dashboard />
          <ProductForm selectedProduct={selectedProduct} onSave={handleSave} />
          <ProductList key={refresh} onEdit={handleEdit} refresh={refresh} />
        </div>
  );
}

export default ProductsPage;
