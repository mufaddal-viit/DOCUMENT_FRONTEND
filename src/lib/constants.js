// API base URL from environment
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// API endpoints
export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
  },
  USER: {
    PROFILE: "/api/users/me",
    DOCUMENTS: "/api/users/me/documents",
  },
  DOCUMENTS: {
    UPLOAD: "/api/documents/upload",
    LIST: "/api/documents",
    GET: (id) => `/api/documents/${id}`,
    SIGN: (id) => `/api/documents/${id}/sign`,
    VERIFY: (id) => `/api/documents/${id}/verify`,
  },
  ASSIGNMENTS: {
    CREATE: "/api/assignments",
    LIST: "/api/assignments",
    GET: (id) => `/api/assignments/${id}`,
  },
};

// Role constants
export const ROLES = {
  UPLOADER: "UPLOADER",
  SIGNER: "SIGNER",
};
