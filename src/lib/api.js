import axios from "axios";

// Create axios instance with base URL from environment
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

// Add JWT token to all requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

// Auth endpoints
export const login = (data) => api.post("/api/auth/login", data);
export const register = (data) => api.post("/api/auth/register", data);

// Document endpoints
export const uploadDocument = (formData) =>
  api.post("/api/documents/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const getDocuments = () => api.get("/api/documents");
export const getDocumentById = (id) => api.get(`/api/documents/${id}`);
export const signDocument = (id, data) =>
  api.post(`/api/documents/${id}/sign`, data);
export const verifyDocument = (id, data) =>
  api.patch(`/api/documents/${id}/verify`, data);

// Assignment endpoints
export const createAssignment = (data) => api.post("/api/assignments", data);
export const getAssignments = () => api.get("/api/assignments");
export const getAssignmentById = (id) => api.get(`/api/assignments/${id}`);

// User endpoints
export const getUserProfile = () => api.get("/api/users/me");
export const updateUserProfile = (data) => api.patch("/api/users/me", data);
export const getUserDocuments = () => api.get("/api/users/me/documents");

export default api;
