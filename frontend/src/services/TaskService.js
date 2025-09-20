import axios from 'axios';

// Create an Axios instance with a base URL
const API = axios.create({
  baseURL: 'http://localhost:5000/api/tasks'
});

// Get all tasks
export const getTasks = () => API.get('/');

// Create new task
export const createTask = (task) => API.post('/', task);

// Update task
export const updateTask = (id, updates) => API.put(`/${id}`, updates);

// Delete task
export const deleteTask = (id) => API.delete(`/${id}`);
