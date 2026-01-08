import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const api = axios.create({
  baseURL: API_URL,
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const getIjazahList = async (params = {}) => {
  try {
    const response = await api.get("/list.php", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching ijazah list:", error);
    throw error;
  }
};

export const deleteIjazah = async (id, delete_reason) => {
  try {
    const response = await api.post("/delete.php", { id, delete_reason });
    return response.data;
  } catch (error) {
    console.error("Error deleting ijazah:", error);
    throw error;
  }
};

export const verifyIjazah = async (id) => {
  try {
    const response = await api.post("/verify-ijazah.php", { id });
    return response.data;
  } catch (error) {
    console.error("Error verifying ijazah:", error);
    throw error;
  }
};

export const updateIjazah = async (data) => {
  try {
    const response = await api.post("/update.php", data);
    return response.data;
  } catch (error) {
    console.error("Error updating ijazah:", error);
    throw error;
  }
};

export const uploadIjazah = async (formData) => {
  try {
    const response = await api.post("/upload.php", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading ijazah:", error);
    throw error;
  }
};

export default {
  get: (url) => api.get(url),
  post: (url, data) => api.post(url, data),
  getIjazah: getIjazahList,
  deleteIjazah,
  uploadIjazah,
};
