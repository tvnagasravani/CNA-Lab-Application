import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

export const loginUser = async (rvceId, password) => {
  const response = await api.post("/api/login", { rvceId, password });
  return response.data;
};

export const healthCheck = async () => {
  const response = await api.get("/api/health");
  return response.data;
};

export default api;
