import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8167/api', 
});

export default api;