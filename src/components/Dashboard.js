import React, { useEffect, useState } from "react";
import categoryService from "../services/categoryService";
import productService from "../services/productService";
import { FaBox, FaTags, FaDollarSign } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function Dashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalStockValue, setTotalStockValue] = useState(0);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const prodRes = await productService.getAllProducts();
      const catRes = await categoryService.getAllCategories();

      setTotalProducts(prodRes.data.length);
      setTotalCategories(catRes.data.length);

      const stockValue = prodRes.data.reduce(
        (acc, p) => acc + p.price * p.quantity,
        0
      );
      setTotalStockValue(stockValue);

      // Prepare data for chart (Products per Category)
      const grouped = {};
      prodRes.data.forEach((p) => {
        const catName = p.category?.name || "Uncategorized";
        grouped[catName] = (grouped[catName] || 0) + 1;
      });
      const chartData = Object.keys(grouped).map((name) => ({
        category: name,
        count: grouped[name],
      }));
      setCategoryData(chartData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-4">
      <div className="row">
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3 shadow">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5 className="card-title">Total Products</h5>
                <p className="card-text fs-3">{totalProducts}</p>
              </div>
              <FaBox size={40} />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-success mb-3 shadow">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5 className="card-title">Total Categories</h5>
                <p className="card-text fs-3">{totalCategories}</p>
              </div>
              <FaTags size={40} />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-warning mb-3 shadow">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5 className="card-title">Stock Value ($)</h5>
                <p className="card-text fs-3">{totalStockValue}</p>
              </div>
              <FaDollarSign size={40} />
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="card mt-4 shadow">
        <div className="card-body">
          <h5 className="card-title">Products per Category</h5>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#007bff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
