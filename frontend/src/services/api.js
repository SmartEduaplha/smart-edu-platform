import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (userData) => api.post('/auth/login', userData),
};

// 👇 دي الإضافة الجديدة الخاصة بالمحتوى
export const contentService = {
  // إضافة درس جديد (للمعلم)
  addLesson: (lessonData) => api.post('/content/add', lessonData),
  
  // جلب الدروس (للطالب)
  getLessons: (stage) => api.get(`/content?stage=${stage}`),
};

export default api;