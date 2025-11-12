import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

export const getDomains = () => API.get('domains/');
export const getQuestions = (domainId) => API.get(`questions/?domain=${domainId}`);
export const saveAnswers = (data) => API.post('answers/', data, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
