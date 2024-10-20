// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Match your backend port
});

export const createArticle = (articleData) => api.post('/articles', articleData);
export const getArticles = () => api.get('/articles');
export const getArticleById = (id) => api.get(`/articles/${id}`);

export default api;