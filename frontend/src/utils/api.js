const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiCall = async (endpoint, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = localStorage.getItem('token');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'An error occurred');
  }

  return data;
};

export const authAPI = {
  signup: (name, email, password) =>
    apiCall('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),
  login: (email, password) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
};

export const courseAPI = {
  getAllCourses: () => apiCall('/courses'),
  getCourseById: (id) => apiCall(`/courses/${id}`),
};

export const subscriptionAPI = {
  subscribe: (courseId, promoCode) =>
    apiCall('/subscriptions/subscribe', {
      method: 'POST',
      body: JSON.stringify({ courseId, promoCode }),
    }),
  getUserCourses: () => apiCall('/subscriptions/my-courses'),
};
