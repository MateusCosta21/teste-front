import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8166/api', 
});

export default api;