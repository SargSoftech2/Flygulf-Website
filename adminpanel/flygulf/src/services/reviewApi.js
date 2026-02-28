const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';

export const fetchReviews = async (search = '', rating = null) => {
  let url = `${API_BASE_URL}/reviews`;
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (rating) params.append('rating', rating);
  if (params.toString()) url += '?' + params.toString();
  
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch reviews');
  return await response.json();
};

export const createReview = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/reviews`, {
    method: 'POST',
    body: formData
  });
  if (!response.ok) throw new Error('Failed to create review');
  return await response.json();
};

export const updateReview = async (id, formData) => {
  const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
    method: 'PUT',
    body: formData
  });
  if (!response.ok) throw new Error('Failed to update review');
  return await response.json();
};

export const deleteReview = async (id) => {
  const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete review');
  return await response.json();
};

export const getFileUrl = (reviewId, fileType) => {
  return `${API_BASE_URL}/reviews/${reviewId}/file/${fileType}`;
};

export const fetchCourses = async () => {
  const response = await fetch(`${API_BASE_URL}/flygulf/courses`);
  if (!response.ok) throw new Error('Failed to fetch courses');
  const data = await response.json();
  return data.data?.map(c => c.courseName) || [];
};
