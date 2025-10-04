import api from "./api";

const getAllCategories = () => api.get("/categories");
const getCategoryById = (id) => api.get(`/categories/${id}`);
const createCategory = (category) => api.post("/categories", category);
const updateCategory = (id, category) => api.put(`/categories/${id}`, category);
const deleteCategory = (id) => api.delete(`/categories/${id}`);

export default {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
