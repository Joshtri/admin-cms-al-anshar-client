import axios from 'axios';

// Buat instance Axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1', // Ganti dengan base URL backend Anda
});

export default api;
