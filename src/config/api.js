import axios from 'axios';

// Buat instance Axios
const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/v1`, // Ganti dengan base URL backend Anda
});

export default api;
  