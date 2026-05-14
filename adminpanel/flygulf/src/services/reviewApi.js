const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/flygulf/api';

export const fetchReviews = async (search = '', rating = null) => {
  let url = `${API_BASE_URL}/reviews`;
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (rating) params.append('rating', rating);
  if (params.toString()) url += '?' + params.toString();
  
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch reviews');
  const result = await response.json();
  return result.data || [];
};

export const createReview = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/reviews`, {
    method: 'POST',
    body: formData
  });
  if (!response.ok) throw new Error('Failed to create review');
  const result = await response.json();
  return result.data;
};

export const updateReview = async (id, formData) => {
  const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
    method: 'PUT',
    body: formData
  });
  if (!response.ok) throw new Error('Failed to update review');
  const result = await response.json();
  return result.data;
};

export const deleteReview = async (id) => {
  const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete review');
  const result = await response.json();
  return result.data;
};

export const getFileUrl = (reviewId, fileType) => {
  return `${API_BASE_URL}/reviews/${reviewId}/file/${fileType}`;
};

export const fetchCourses = async () => {
  const response = await fetch('http://localhost:8081/flygulf/api/flygulf/courses');
  if (!response.ok) throw new Error('Failed to fetch courses');
  const result = await response.json();
  return result.data?.map(c => c.courseName) || [];
};
