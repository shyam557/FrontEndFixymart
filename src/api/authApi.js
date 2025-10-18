import axios from 'axios';
const API_URL = 'http://localhost:3001/api/v1/auth';

export const registerApi = (data) => axios.post(`${API_URL}/register`, data);
export const loginApi = (data) => axios.post(`${API_URL}/login`, data);
